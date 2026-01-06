import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const GRACE_PERIOD_DAYS = 7;

export async function POST(req: Request) {
  try {
    const { licenseKey, domain } = await req.json();

    if (!licenseKey || !domain) {
      return NextResponse.json({ valid: false });
    }

    const licenseKeyName = `affilixwp:license:${licenseKey}`;
    const license = await redis.get<any>(licenseKeyName);

    if (!license || license.status !== "active") {
      return NextResponse.json({ valid: false });
    }

    const domainsKey = `${licenseKeyName}:domains`;
    const domains = await redis.smembers(domainsKey);

    if (!domains.includes(domain)) {
      if (domains.length >= license.max_sites) {
        return NextResponse.json({
          valid: false,
          reason: "limit_reached",
        });
      }
      await redis.sadd(domainsKey, domain);
    }

    await redis.set(
      `${licenseKeyName}:last_valid`,
      Math.floor(Date.now() / 1000)
    );

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
