import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { planId, wpUserId } = await req.json();

    if (!wpUserId) {
      return NextResponse.json(
        { error: "Missing WP user ID" },
        { status: 400 }
      );
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12,
      notes: {
        wp_user_id: wpUserId, // 🔥 THIS IS THE KEY LINE
      },
    });

    return NextResponse.json(subscription);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
