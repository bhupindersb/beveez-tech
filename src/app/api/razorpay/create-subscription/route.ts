import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "http://affilixwp.local",
  "https://beveez.tech",
  "https://www.beveez.tech",
]);

function buildCorsHeaders(origin: string | null): Headers {
  const headers = new Headers();

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  return headers;
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: buildCorsHeaders(origin),
  });
}

/**
 * Create Razorpay subscription
 */
export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const { planId, wpUserId } = await req.json();

    if (!planId || !wpUserId) {
      return NextResponse.json(
        { error: "Missing planId or wpUserId" },
        {
          status: 400,
          headers: buildCorsHeaders(origin),
        }
      );
    }

    if (
      !process.env.RP_KEY_ID ||
      !process.env.RP_KEY_SECRET
    ) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        {
          status: 500,
          headers: buildCorsHeaders(origin),
        }
      );
    }

    // ✅ Razorpay created at runtime
    const razorpay = new Razorpay({
      key_id: process.env.RP_KEY_ID,
      key_secret: process.env.RP_KEY_SECRET,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12,
      notes: {
        wp_user_id: wpUserId,
      },
    });

    return NextResponse.json(subscription, {
      headers: buildCorsHeaders(origin),
    });

  } catch (error) {
    console.error("❌ Razorpay error:", error);

    return NextResponse.json(
      { error: "Failed to create subscription" },
      {
        status: 500,
        headers: buildCorsHeaders(origin),
      }
    );
  }
}
