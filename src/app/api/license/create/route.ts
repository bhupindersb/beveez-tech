import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function generateLicenseKey() {
  return (
    "AFFILIXWP-" +
    crypto.randomBytes(4).toString("hex").toUpperCase()
  );
}

export async function POST(req: Request) {
  try {
    const { email, plan = "pro" } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const licenseKey = generateLicenseKey();

    await redis.set(`affilixwp:license:${licenseKey}`, {
      status: "active",
      plan,
      max_sites: 1,
      created_at: new Date().toISOString(),
      expires_at: null, // lifetime
      email,
    });

    return NextResponse.json({
      success: true,
      licenseKey,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
