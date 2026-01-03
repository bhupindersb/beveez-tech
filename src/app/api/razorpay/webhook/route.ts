import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🔔 Webhook hit");

  console.log("ENV CHECK:", {
    RP_WEBHOOK_SECRET: process.env.RP_WEBHOOK_SECRET,
    HAS_SECRET: !!process.env.RP_WEBHOOK_SECRET,
    AFFILIXWP_DOWNLOAD_SECRET: !!process.env.AFFILIXWP_DOWNLOAD_SECRET,
  });

  if (!process.env.RP_WEBHOOK_SECRET) {
    console.error("❌ RP_WEBHOOK_SECRET is missing");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  if (!process.env.AFFILIXWP_DOWNLOAD_SECRET) {
    console.error("❌ AFFILIXWP_DOWNLOAD_SECRET is missing");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RP_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(body);

  if (payload.event === "subscription.charged") {
    const subscriptionId = payload.payload.subscription.entity.id;
    const paymentId = payload.payload.payment.entity.id;
    const email =
      payload.payload.payment.entity.email || "unknown@customer.com";

    const token = crypto
      .createHmac("sha256", process.env.AFFILIXWP_DOWNLOAD_SECRET)
      .update(subscriptionId + "|" + paymentId)
      .digest("hex");

    console.log("AffilixWP Download Token:", token);
    console.log("Customer Email:", email);
  }

  return NextResponse.json({ received: true });
}
