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

    type LicenseRecord = {
        email: string;
        status: "active" | "inactive";
        createdAt: number;
        expiresAt?: number;
        };

        const data = await redis.get<LicenseRecord>(key);

        if (data) {
        licenses.push({
            key: key.replace("affilixwp:license:", ""),
            ...data,
        });
        }

  }

  return NextResponse.json(licenses);
}
