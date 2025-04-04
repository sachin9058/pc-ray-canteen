import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectDB()
        const user = await currentUser()
        if(!user) {
            return NextResponse.json({error : "Unauthorized"},{status:401})
        }
        const adminEmails = ["luciferzx136@gmail.com"]
        if(!adminEmails.includes(user.emailAddresses[0].emailAddress)){
            return NextResponse.json({error:"Forbidden"},{status:403})
        }
        const users = await User.find().sort({createdAt : -1})
        return NextResponse.json(users)
    } catch (error) {
        console.error("Error Fetching users:",error);
        return NextResponse.json({error :"Internal Server Error"},{status:500})
    }
}