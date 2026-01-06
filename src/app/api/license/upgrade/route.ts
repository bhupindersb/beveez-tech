import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { licenseKey, plan, max_sites } = await req.json();

    if (!licenseKey || !plan || !max_sites) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const key = `affilixwp:license:${licenseKey}`;
    const license = await redis.get<any>(key);

    if (!license) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    await redis.set(key, {
      ...license,
      plan,
      max_sites,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
