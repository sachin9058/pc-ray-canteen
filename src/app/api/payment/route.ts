import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    return NextResponse.json({ success: false, error: "Payment initiation failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 });
    }

    await Order.findOneAndUpdate(
      { paymentId: razorpay_order_id },
      { $set: { status: "Paid", paymentId: razorpay_payment_id } }
    );

    return NextResponse.json({ success: true, message: "Payment verified and order updated!" });
  } catch (error) {
    console.error("❌ Payment Verification Failed:", error);
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 });
  }
}
