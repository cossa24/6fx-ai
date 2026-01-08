import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEV_PASSWORD = process.env.DEV_ACCESS_PASSWORD || "6fx-dev-2026";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === DEV_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("dev-access", "granted", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
