import { NextResponse } from "next/server";
import {
  createAdminSession,
  validateAdminCredentials,
  COOKIE_NAME,
} from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required." }, { status: 400 });
    }

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = await createAdminSession();
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
