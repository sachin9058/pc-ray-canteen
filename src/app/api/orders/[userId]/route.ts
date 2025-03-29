import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  await connectDB();

  const orders = await Order.find({ userId: params.userId });

  if (!orders) {
    return NextResponse.json({ error: "No orders found" }, { status: 404 });
  }

  return NextResponse.json(orders);
}
