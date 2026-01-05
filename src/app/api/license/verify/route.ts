import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: Request) {
  const { licenseKey, domain } = await req.json();

  if (!licenseKey || !domain) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const record: any = await redis.get(`license:${licenseKey}`);

  if (!record || record.status !== "active") {
    return NextResponse.json({ valid: false });
  }

  // Bind domain (first activation)
  if (!record.domains.includes(domain)) {
    record.domains.push(domain);
    await redis.set(`license:${licenseKey}`, record);
  }

  return NextResponse.json({
    valid: true,
    email: record.email,
  });
}
