// src/app/api/admin/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(req: Request, context: Context) {
  await connectDB();
  const id = context.params.id;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch order", error: err }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: Context) {
  await connectDB();
  const { id } = await context.params;

  try {
    const data = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true });

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to update order", error: err }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: Context) {
  await connectDB();
  const id = context.params.id;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to delete order", error: err }, { status: 500 });
  }
}
