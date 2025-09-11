// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            howCanWeHelp,
            description,
            subscription,
            howSubscribe,
            device,
        } = body;


        if (!name || !email || !howCanWeHelp || !description) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const detail = prisma.contactForm.create({
            data: {
                name,
                email,
                howCanWeHelp,
                description,
                subscription,
                howSubscribe,
                device
            }
        })

        return NextResponse.json(
            {
                success: true,
                message: "Form submitted successfully",
                data: {
                    name,
                    email,
                    howCanWeHelp,
                    description,
                    subscription,
                    howSubscribe,
                    device,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
