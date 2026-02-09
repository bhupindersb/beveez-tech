import crypto from "crypto";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

/* ----------------------------
   Init services
----------------------------- */

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

/* ----------------------------
   Helpers
----------------------------- */

function generateLicenseKey() {
  const part = () =>
    Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AFFILIXWP-${part()}-${part()}-${part()}`;
}

/* ----------------------------
   Webhook handler
----------------------------- */

export async function POST(req: Request) {
  console.log("🔔 Razorpay webhook hit");

  if (
    !process.env.RP_WEBHOOK_SECRET ||
    !process.env.AFFILIXWP_DOWNLOAD_SECRET ||
    !process.env.KV_REST_API_URL ||
    !process.env.KV_REST_API_TOKEN ||
    !process.env.RESEND_API_KEY ||
    !process.env.AFFILIXWP_API_SECRET ||
    !process.env.WP_BASE_URL
  ) {
    console.error("❌ Missing environment variables");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  /* ----------------------------
     Verify signature
  ----------------------------- */

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

  if (payload.event !== "subscription.charged") {
    return NextResponse.json({ received: true });
  }

  /* ----------------------------
     Extract Razorpay data
  ----------------------------- */

  const subscription = payload.payload.subscription.entity;
  const payment = payload.payload.payment.entity;

  const wpUserId = subscription.notes?.wp_user_id;

  if (!wpUserId) {
    console.error("❌ wp_user_id missing in Razorpay notes");
    return NextResponse.json({ received: true });
  }

  const amount = payment.amount / 100;
  const reference = `razorpay_${payment.id}`;
  const email = payment.email;

  /* ----------------------------
     1️⃣ Download token
  ----------------------------- */

  const token = crypto
    .createHmac("sha256", process.env.AFFILIXWP_DOWNLOAD_SECRET)
    .update(`${subscription.id}|${payment.id}`)
    .digest("hex");

  await redis.set(`affilixwp:token:${token}`, {
    email,
    subscriptionId: subscription.id,
    paymentId: payment.id,
    createdAt: Date.now(),
  });

  await redis.expire(`affilixwp:token:${token}`, 60 * 60 * 24);

  /* ----------------------------
     2️⃣ License
  ----------------------------- */

  const licenseKey = generateLicenseKey();

  await redis.set(`affilixwp:license:${licenseKey}`, {
    status: "active",
    plan: "pro",
    max_sites: 1,
    email,
    created_at: new Date().toISOString(),
    expires_at: null,
  });

  /* ----------------------------
     3️⃣ Trigger WordPress commission
  ----------------------------- */

  try {
    const res = await fetch(
      `${process.env.WP_BASE_URL}/wp-json/affilixwp/v1/commission`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-affilixwp-secret": process.env.AFFILIXWP_API_SECRET!,
        },
        body: JSON.stringify({
          buyer_user_id: Number(wpUserId),
          amount: Number(amount),
          reference,
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Commission API failed:", text);
    } else {
      console.log("💰 Commission recorded successfully");
    }
  } catch (err) {
    console.error("❌ Commission API error", err);
  }

  /* ----------------------------
     4️⃣ Email
  ----------------------------- */

  try {
    const downloadUrl = `https://www.beveez.tech/api/download/affilixwp?token=${token}`;

    await resend.emails.send({
      from: "AffilixWP <noreply@beveez.tech>",
      to: email,
      subject: "Your AffilixWP License & Download",
      html: `
        <h2>Welcome to AffilixWP 🎉</h2>
        <p><strong>Your License Key:</strong></p>
        <pre>${licenseKey}</pre>
        <p><a href="${downloadUrl}">Download Plugin</a></p>
      `,
    });
  } catch (err) {
    console.error("❌ Email send failed", err);
  }

  return NextResponse.json({ received: true });
}
