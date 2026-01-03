import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing token", { status: 401 });
  }

  const record = await redis.get(`affilixwp:token:${token}`);

  if (!record) {
    return new NextResponse("Invalid or expired token", { status: 403 });
  }

  // Optional: one-time download
  await redis.del(`affilixwp:token:${token}`);

  // Redirect to actual plugin ZIP
  return NextResponse.redirect(
    "https://github.com/bhupindersb/affilixwp/releases/download/v0.1.2/affilixwp-v0.1.2.zip"
  );
}
