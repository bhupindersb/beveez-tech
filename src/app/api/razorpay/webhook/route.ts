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

const resend = new Resend(process.env.RESEND_API_KEY);

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

  /* ----------------------------
     Safety checks
  ----------------------------- */
  if (
    !process.env.RP_WEBHOOK_SECRET ||
    !process.env.AFFILIXWP_DOWNLOAD_SECRET ||
    !process.env.KV_REST_API_URL ||
    !process.env.KV_REST_API_TOKEN ||
    !process.env.RESEND_API_KEY ||
    !process.env.AFFILIXWP_API_SECRET
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

  /* ----------------------------
     Handle payment success
  ----------------------------- */
  if (payload.event === "subscription.charged") {
    const subscriptionId = payload.payload.subscription.entity.id;
    const paymentId = payload.payload.payment.entity.id;
    const amountPaise = payload.payload.payment.entity.amount;
    const email =
      payload.payload.payment.entity.email || "unknown@customer.com";

    const orderAmount = amountPaise / 100; // convert paise → INR
    const reference = `razorpay_${paymentId}`;

    /* ----------------------------
       1️⃣ Download token
    ----------------------------- */
    const token = crypto
      .createHmac("sha256", process.env.AFFILIXWP_DOWNLOAD_SECRET)
      .update(`${subscriptionId}|${paymentId}`)
      .digest("hex");

    await redis.set(`affilixwp:token:${token}`, {
      email,
      subscriptionId,
      paymentId,
      createdAt: Date.now(),
    });

    await redis.expire(`affilixwp:token:${token}`, 60 * 60 * 24);

    console.log("✅ Download token stored");

    /* ----------------------------
       2️⃣ License creation
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

    console.log("🔑 License issued:", licenseKey);

    /* ----------------------------
       3️⃣ Trigger WP commission
    ----------------------------- */
    try {
      const commissionRes = await fetch(
        "https://www.beveez.tech/wp-json/affilixwp/v1/commission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-affilixwp-secret": process.env.AFFILIXWP_API_SECRET,
          },
          body: JSON.stringify({
            buyer_user_id: payload.payload.payment.entity.notes?.wp_user_id,
            amount: orderAmount,
            reference,
          }),
        }
      );

      if (!commissionRes.ok) {
        console.error("❌ Commission API failed");
      } else {
        console.log("💰 Commission recorded");
      }
    } catch (err) {
      console.error("❌ Commission API error", err);
    }

    /* ----------------------------
       4️⃣ Send email
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
          <pre style="font-size:16px">${licenseKey}</pre>

          <p><strong>Download Plugin:</strong></p>
          <p><a href="${downloadUrl}">Download AffilixWP</a></p>

          <p>This license is valid for one site.</p>
          <p>Need help? support@beveez.tech</p>
        `,
      });

      console.log("📧 License email sent");
    } catch (error) {
      console.error("❌ Failed to send email", error);
    }
  }

  return NextResponse.json({ received: true });
}
