import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "http://affilixwp.local",
  "https://beveez.tech",
  "https://www.beveez.tech",
]);

function corsHeaders(origin: string | null) {
  const headers: Record<string, string> = {};

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }

  return headers;
}

/* -------------------------
   CORS preflight
-------------------------- */
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

/* -------------------------
   Create subscription
-------------------------- */
export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const { planId, wpUserId, email, name } = await req.json();

    if (!planId || !wpUserId || !email) {
      return NextResponse.json(
        { error: "Missing planId, wpUserId or email" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    if (!process.env.RP_KEY_ID || !process.env.RP_KEY_SECRET) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RP_KEY_ID,
      key_secret: process.env.RP_KEY_SECRET,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12,

      customer: {
        email,
        name: name || "AffilixWP Customer",
      },

      notes: {
        wp_user_id: wpUserId.toString(),
      },
    });

    return NextResponse.json(subscription, {
      headers: corsHeaders(origin),
    });
  } catch (error) {
    console.error("❌ Razorpay create-subscription error:", error);

    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
