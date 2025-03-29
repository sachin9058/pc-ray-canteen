import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const testOrder = await Order.create({
        userId: "12345",
        items: [{ productId: "67890", quantity: 2 }],
        totalPrice: 20.99,
        status: "pending",
      });
    return NextResponse.json({ message: "✅ MongoDB Connection Successful" });
  } catch (error) {
    return NextResponse.json({ error: "❌ MongoDB Connection Failed" }, { status: 500 });
  }
}