import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planId, wpUserId } = await req.json();

    if (!planId || !wpUserId) {
      return NextResponse.json(
        { error: "Missing planId or wpUserId" },
        { status: 400 }
      );
    }

    // ✅ Create Razorpay instance AT RUNTIME
    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      console.error("❌ Razorpay env vars missing");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
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
      notes: {
        wp_user_id: wpUserId, // 🔥 THIS FIXES COMMISSIONS
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("❌ Razorpay error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
