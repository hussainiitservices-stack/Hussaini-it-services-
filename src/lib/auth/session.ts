import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function getSecret() {
  return new TextEncoder().encode(
    process.env.SESSION_SECRET || "fallback-dev-secret-change-me"
  );
}

export async function createAdminSession() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifyAdminSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminSession(token);
}

export function validateAdminCredentials(username: string, password: string) {
  const adminUser = process.env.ADMIN_USERNAME || "Hussain mesharwala";
  const adminPass = process.env.ADMIN_PASSWORD || "Huss@in52";
  return username.trim() === adminUser && password === adminPass;
}

export { COOKIE_NAME };
