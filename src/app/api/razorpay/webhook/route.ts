import crypto from "crypto";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis (Vercel KV compatible)
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: Request) {
  console.log("🔔 Razorpay webhook hit");

  // --- Safety checks ---
  if (!process.env.RP_WEBHOOK_SECRET) {
    console.error("❌ RP_WEBHOOK_SECRET is missing");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  if (!process.env.AFFILIXWP_DOWNLOAD_SECRET) {
    console.error("❌ AFFILIXWP_DOWNLOAD_SECRET is missing");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.error("❌ Redis env vars are missing");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  // --- Read body + signature ---
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  // --- Verify Razorpay signature ---
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RP_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(body);

  // --- Handle successful subscription charge ---
  if (payload.event === "subscription.charged") {
    const subscriptionId = payload.payload.subscription.entity.id;
    const paymentId = payload.payload.payment.entity.id;
    const email =
      payload.payload.payment.entity.email || "unknown@customer.com";

    // Generate secure download token
    const token = crypto
      .createHmac("sha256", process.env.AFFILIXWP_DOWNLOAD_SECRET)
      .update(`${subscriptionId}|${paymentId}`)
      .digest("hex");

    // Store token in Redis (24h expiry)
    await redis.set(`affilixwp:token:${token}`, {
      email,
      subscriptionId,
      paymentId,
      createdAt: Date.now(),
    });

    await redis.expire(`affilixwp:token:${token}`, 60 * 60 * 24);

    console.log("✅ AffilixWP token stored");
  }

  return NextResponse.json({ received: true });
}
