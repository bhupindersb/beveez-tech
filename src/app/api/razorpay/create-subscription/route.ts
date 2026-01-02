import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RP_KEY_ID!,
      key_secret: process.env.RP_KEY_SECRET!,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RP_PLAN_ID!,
      customer_notify: 1,
      quantity: 1,
      total_count: 12, // 12 months (set null for infinite)
    });

    return NextResponse.json({
      success: true,
      subscription_id: subscription.id,
    });
  } catch (error: any) {
    console.error("Razorpay error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
