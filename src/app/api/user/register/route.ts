import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  await connectDB();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingUser = await User.findOne({ clerkId: user.id });

  if (!existingUser) {
    const newUser = new User({
      clerkId: user.id,
      name: user.firstName + " " + user.lastName,
      email: user.emailAddresses[0]?.emailAddress || "",
    });

    await newUser.save();
  }

  return NextResponse.json({ message: "User registered successfully" });
}
