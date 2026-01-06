import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function normalizeDomain(domain: string) {
  try {
    return new URL(domain).hostname.replace(/^www\./, "");
  } catch {
    return domain.replace(/^www\./, "");
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Accept both styles
    const licenseKey = body.licenseKey || body.license_key;
    const domainRaw = body.domain;

    if (!licenseKey || !domainRaw) {
      return NextResponse.json({ valid: false });
    }

    const domain = normalizeDomain(domainRaw);

    const licenseKeyName = `affilixwp:license:${licenseKey}`;
    const license = await redis.get<{
      status: string;
      max_sites: number;
    }>(licenseKeyName);

    if (!license || license.status !== "active") {
      return NextResponse.json({ valid: false });
    }

    const domainsKey = `${licenseKeyName}:domains`;
    const domains = (await redis.smembers(domainsKey)) as string[];

    if (!domains.includes(domain)) {
      if (domains.length >= license.max_sites) {
        return NextResponse.json({
          valid: false,
          reason: "limit_reached",
        });
      }

      await redis.sadd(domainsKey, domain);
    }

    // Save last valid timestamp (grace period support)
    await redis.set(
      `${licenseKeyName}:last_valid`,
      Math.floor(Date.now() / 1000)
    );

    return NextResponse.json({ valid: true });
  } catch (err) {
    console.error("LICENSE VALIDATE ERROR", err);
    return NextResponse.json({ valid: false });
  }
}
