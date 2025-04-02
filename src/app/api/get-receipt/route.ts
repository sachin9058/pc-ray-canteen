import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 });
  }

  try {
    const order = await razorpay.orders.fetch(orderId);
    return NextResponse.json({ success: true, order });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch order" }, { status: 500 });
  }
}
