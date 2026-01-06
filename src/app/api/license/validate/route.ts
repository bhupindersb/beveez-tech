import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { license_key } = await req.json();

    if (license_key === "AFFILIXWP-TEST-1234") {
      return NextResponse.json({
        valid: true,
        status: "active",
        plan: "starter",
        expires_at: "2026-01-01",
      });
    }

    return NextResponse.json({
      valid: false,
      status: "invalid",
    });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
