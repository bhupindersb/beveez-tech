import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RP_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(body);

  /**
   * Important event:
   * subscription.charged
   */
  if (payload.event === "subscription.charged") {
    const subscriptionId = payload.payload.subscription.entity.id;
    const paymentId = payload.payload.payment.entity.id;
    const email =
      payload.payload.payment.entity.email || "unknown@customer.com";

    // Generate secure download token
    const token = crypto
      .createHmac("sha256", process.env.AFFILIXWP_DOWNLOAD_SECRET!)
      .update(subscriptionId + "|" + paymentId)
      .digest("hex");

    /**
     * TODO (MVP):
     * Store token + email + subscriptionId
     * Use:
     * - SQLite
     * - JSON file
     * - Redis / KV
     * - Vercel KV
     *
     * For now, log it
     */
    console.log("AffilixWP Download Token:", token);
    console.log("Customer Email:", email);
  }

  return NextResponse.json({ received: true });
}
