import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {userId} = getAuth(req);
        console.log("Authenticated User ID:", userId); 
        if(!userId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {fullName,mobile,room,floor} = await req.json();
        if(!fullName || !mobile || !room || !floor ){
            return NextResponse.json({message : "All Fields are Required"},{status:401})
        }

        await mongoose.connect(process.env.MONGODB_URI!)


        //save adress to db
        const newAddress = new Address({userId, fullName, mobile, room, floor})
        await newAddress.save()

        return  NextResponse.json({message : "Address Saved Successfully"},{status:201})

    } catch (error) {
        return NextResponse.json({ message: "Error saving address" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await mongoose.connect(process.env.MONGODB_URI!);
        const addresses = await Address.find({ userId });

        return NextResponse.json({ addresses }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error fetching addresses" }, { status: 500 });
    }
}