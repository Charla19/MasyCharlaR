import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = "masy-admin-session";

export async function signAdminSession() {
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is missing");
  return new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(secret);
}

export async function verifyAdminSession(token?: string) {
  if (!token || !process.env.AUTH_SECRET) return false;
  try { const { payload } = await jwtVerify(token, secret); return payload.role === "admin"; } catch { return false; }
}

export async function validAdminCredentials(email: string, password: string) {
  const encodedHash = process.env.ADMIN_PASSWORD_HASH_B64;
  if (!encodedHash || email !== process.env.ADMIN_EMAIL) return false;
  let passwordHash: string;
  try {
    passwordHash = Buffer.from(encodedHash, "base64").toString("utf8");
    if (!/^\$2[aby]\$\d\d\$[./A-Za-z0-9]{53}$/.test(passwordHash)) return false;
  } catch {
    return false;
  }
  return bcrypt.compare(password, passwordHash);
}

export { cookieName };
