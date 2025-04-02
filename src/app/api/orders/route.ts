import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order"; 
import { connectDB } from "@/lib/mongodb"; 

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB connection
    const { userId, cartItems, totalAmount } = await req.json();

    if (!userId || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const newOrder = new Order({
      userId,
      items: cartItems.map((item: CartItem) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      status: "pending",
    });

    await newOrder.save();

    return NextResponse.json({ message: "Order placed successfully!" }, { status: 201 });
  } catch  {
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}