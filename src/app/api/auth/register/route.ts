import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcryptjs";



export async function POST(request: NextRequest) {
    const {email,name,password} = await request.json();
    if(!email || !name || !password){
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { 
            email, 
            name, 
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });


    return NextResponse.json({ user }, { status: 201 });

}