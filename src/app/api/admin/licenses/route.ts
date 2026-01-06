import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  const keys = await redis.keys("affilixwp:license:*");

  const licenses = [];

  for (const key of keys) {
    if (key.includes(":domains") || key.includes(":last_valid")) continue;

    const license = await redis.get<any>(key);
    if (!license) continue;

    const domains = await redis.smembers(`${key}:domains`);

    licenses.push({
      licenseKey: key.replace("affilixwp:license:", ""),
      email: license.email,
      plan: license.plan,
      max_sites: license.max_sites,
      sites_used: domains.length,
      domains,
      status: license.status,
    });
  }

  return NextResponse.json(licenses);
}
