import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "✅ MongoDB Connection Successful" });
  } catch{
    return NextResponse.json({ error: "❌ MongoDB Connection Failed" }, { status: 500 });
  }
}