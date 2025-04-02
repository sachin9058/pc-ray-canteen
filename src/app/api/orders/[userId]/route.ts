import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ userId: string }> }) {
  try {
    console.log("Connecting to the database...");
    await connectDB();

    console.log("Extracting userId from params...");
    const { userId } = await context.params; // Await params

    if (!userId) {
      console.error("User ID is missing in params.");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    console.log("Fetching orders for userId:", userId);
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      console.warn("No orders found for userId:", userId);
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    console.log("Orders fetched successfully:", orders);
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}