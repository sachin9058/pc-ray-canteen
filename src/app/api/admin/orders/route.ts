import {NextResponse } from "next/server";

import Order from "@/models/Order";
import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { connectDB } from "@/lib/mongodb";

const adminEmails = ["luciferzx136@gmail.com"];

export async function GET() {
    try {
        await connectDB()

        // Get current admin user
        const user = await currentUser();
        const email = user?.emailAddresses?.[0]?.emailAddress || "";

        if (!user || !adminEmails.includes(email)) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        // Fetch all orders from MongoDB
        const orders = await Order.find();

        // Extract unique user IDs from orders (filter out null/undefined)
        const userIds = [...new Set(orders.map(order => order.userId).filter(Boolean))];

        // Fetch user details from Clerk API
        const usersMap: Record<string, { name: string; email: string }> = {};

        await Promise.all(
            userIds.map(async (id: string) => {
                try {
                    const clerkUser = await clerkClient.users.getUser(id);
                    usersMap[id] = {
                        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || "Unknown User",


                        email: clerkUser.emailAddresses?.[0]?.emailAddress || "No Email",
                    };
                } catch {
                    console.warn(`⚠️ User ${id} not found in Clerk, using fallback.`);
                    usersMap[id] = { name: "Deleted User", email: "No Email" }; // ✅ Fallback for missing users
                }
            })
        );

        // Merge user data into orders
        const formattedOrders = orders.map(order => ({
            ...order.toObject(),
            user: usersMap[order.userId] || { name: "Deleted User", email: "No Email" }, // ✅ Ensure fallback
        }));

        return NextResponse.json(formattedOrders, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        return NextResponse.json({ message: "Failed to fetch orders", error }, { status: 500 });
    }
}
