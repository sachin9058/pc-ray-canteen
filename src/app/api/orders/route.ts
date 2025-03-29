import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items, totalAmount } = await req.json();

  if (!items || items.length === 0 || !totalAmount) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }

  const order = new Order({
    userId: user.id,
    items,
    totalAmount,
    status: "pending",
  });

  await order.save();

  return NextResponse.json({ message: "Order placed successfully", order });
}
