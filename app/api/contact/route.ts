import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "../../../lib/db";
import { consumeRateLimit } from "../../../lib/rate-limit";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  replyTo: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(160).regex(/^[^\r\n]+$/),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
  verificationId: z.string().regex(/^[a-f0-9]{64}$/).optional(),
  code: z.string().regex(/^\d{4}$/).optional(),
});

function digest(value: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32 || secret.startsWith("replace-with")) throw new Error("Contact verification secret is not configured.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

function payloadDigest(data: z.infer<typeof contactSchema>, email: string) {
  return digest(JSON.stringify({ name: data.name, replyTo: email, subject: data.subject, message: data.message }));
}

function equalHex(a: string, b: string) {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

async function readInput(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) return { error: NextResponse.json({ error: "Message trop volumineux." }, { status: 413 }) };
  try {
    const reader = request.body?.getReader();
    if (!reader) return { error: NextResponse.json({ error: "Requête invalide." }, { status: 400 }) };
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12_000) {
        await reader.cancel();
        return { error: NextResponse.json({ error: "Message trop volumineux." }, { status: 413 }) };
      }
      chunks.push(value);
    }
    const body = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { input: JSON.parse(new TextDecoder().decode(body)) as unknown };
  } catch {
    return { error: NextResponse.json({ error: "Requête invalide." }, { status: 400 }) };
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Requête non autorisée." }, { status: 403 });
  }

  const body = await readInput(request);
  if (body.error) return body.error;
  const parsed = contactSchema.safeParse(body.input);
  if (!parsed.success) return NextResponse.json({ error: "Vérifie les champs du formulaire." }, { status: 400 });

  const data = parsed.data;
  const email = data.replyTo.toLowerCase();
  if (!data.verificationId && data.website) return NextResponse.json({ success: true });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("Contact email configuration is incomplete.");
    return NextResponse.json({ error: "L’envoi est momentanément indisponible. Réessaie plus tard." }, { status: 503 });
  }
  const resend = new Resend(apiKey);

  if (!data.verificationId) {
    let ipAllowed = false;
    let emailAllowed = false;
    try {
      const ip = request.headers.get("x-real-ip")?.trim() || "unknown";
      [ipAllowed, emailAllowed] = await Promise.all([
        consumeRateLimit("contact-form", ip, 3, 10 * 60).then(result => result.allowed),
        consumeRateLimit("contact-verification-email", email, 3, 60 * 60).then(result => result.allowed),
      ]);
    } catch {
      return NextResponse.json({ error: "La vérification est momentanément indisponible. Réessaie plus tard." }, { status: 503 });
    }
    if (!ipAllowed || !emailAllowed) {
      return NextResponse.json({ error: "Trop de demandes. Réessaie dans quelques minutes." }, { status: 429 });
    }

    try {
      const token = randomBytes(32).toString("hex");
      const code = randomInt(0, 10_000).toString().padStart(4, "0");
      const id = createHash("sha256").update(token).digest("hex");
      await prisma.contactVerification.deleteMany({ where: { expiresAt: { lt: new Date() } } });
      await prisma.contactVerification.create({
        data: {
          id,
          email,
          codeHash: digest(`${id}:${email}:${code}`),
          payloadHash: payloadDigest(data, email),
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });

      const { error } = await resend.emails.send({
        from,
        to: [email],
        subject: "Confirmez votre adresse e-mail — M.Charla.R.",
        text: `Votre code de confirmation est : ${code}\n\nIl expire dans 10 minutes. Si vous n’avez pas rempli le formulaire de contact, ignorez ce message.`,
      });
      if (error) {
        await prisma.contactVerification.deleteMany({ where: { id } });
        console.error("Resend failed to deliver a verification code:", error.message);
        return NextResponse.json({ error: "Le code n’a pas pu être envoyé. Vérifie l’adresse puis réessaie." }, { status: 502 });
      }
      return NextResponse.json({ verificationRequired: true, verificationId: token });
    } catch {
      return NextResponse.json({ error: "La vérification est momentanément indisponible. Réessaie plus tard." }, { status: 503 });
    }
  }

  if (!data.code) return NextResponse.json({ error: "Saisis le code reçu par e-mail." }, { status: 400 });

  try {
    const id = createHash("sha256").update(data.verificationId).digest("hex");
    const challenge = await prisma.contactVerification.findUnique({ where: { id } });
    if (!challenge || challenge.usedAt || challenge.expiresAt <= new Date() || challenge.attempts >= 5) {
      return NextResponse.json({ error: "Ce code a expiré ou n’est plus valide. Relance une vérification." }, { status: 400 });
    }

    const samePayload = challenge.email === email && equalHex(challenge.payloadHash, payloadDigest(data, email));
    const sameCode = equalHex(challenge.codeHash, digest(`${id}:${email}:${data.code}`));
    if (!samePayload || !sameCode) {
      await prisma.contactVerification.updateMany({ where: { id, usedAt: null, attempts: { lt: 5 } }, data: { attempts: { increment: 1 } } });
      return NextResponse.json({ error: samePayload ? "Code incorrect. Vérifie-le et réessaie." : "Le formulaire a changé. Relance la vérification de l’adresse." }, { status: 400 });
    }

    const consumed = await prisma.contactVerification.updateMany({
      where: { id, usedAt: null, attempts: { lt: 5 }, expiresAt: { gt: new Date() } },
      data: { usedAt: new Date() },
    });
    if (!consumed.count) return NextResponse.json({ error: "Ce code a expiré ou a déjà été utilisé." }, { status: 400 });

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio — ${data.subject}`,
      text: `Nouveau message depuis le portfolio\n\nNom : ${data.name}\nE-mail vérifié : ${email}\nSujet : ${data.subject}\n\n${data.message}`,
    });
    if (error) {
      console.error("Resend failed to deliver a verified contact message:", error.message);
      return NextResponse.json({ error: "L’adresse est vérifiée, mais l’envoi du message a échoué. Recommence le formulaire." }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "La vérification est momentanément indisponible. Réessaie plus tard." }, { status: 503 });
  }
}
