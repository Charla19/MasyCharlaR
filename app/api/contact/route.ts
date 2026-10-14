import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  replyTo: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(160).regex(/^[^\r\n]+$/),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMs = 10 * 60 * 1000;
const maxAttempts = 3;

function isRateLimited(ip: string) {
  const now = Date.now();
  if (attempts.size > 5000) {
    for (const [key, entry] of attempts) {
      if (entry.resetAt <= now) attempts.delete(key);
    }
    while (attempts.size > 5000) attempts.delete(attempts.keys().next().value!);
  }
  const current = attempts.get(ip);
  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (current.count >= maxAttempts) return true;
  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Requête non autorisée." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) return NextResponse.json({ error: "Message trop volumineux." }, { status: 413 });

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: "Vérifie les champs du formulaire." }, { status: 400 });

  const { name, replyTo, subject, message, website } = parsed.data;
  if (website) return NextResponse.json({ success: true });

  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Trop de messages envoyés. Réessaie dans quelques minutes." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("Contact email configuration is incomplete.");
    return NextResponse.json({ error: "L’envoi est momentanément indisponible. Réessaie plus tard." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo,
    subject: `Portfolio — ${subject}`,
    text: `Nouveau message depuis le portfolio\n\nNom : ${name}\nE-mail : ${replyTo}\nSujet : ${subject}\n\n${message}`,
  });

  if (error) {
    console.error("Resend failed to deliver a contact message:", error.message);
    return NextResponse.json({ error: "L’envoi a échoué. Réessaie plus tard." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
