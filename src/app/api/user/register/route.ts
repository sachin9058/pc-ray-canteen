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

  try {
    // Get user's email
    const email = user.emailAddresses[0]?.emailAddress || "";

    // Check if the user already exists by clerkId OR email
    const existingUser = await User.findOne({ $or: [{ clerkId: user.id }, { email }] });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists", user: existingUser });
    }

    // Create new user only if they don't exist
    const newUser = new User({
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email,
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
