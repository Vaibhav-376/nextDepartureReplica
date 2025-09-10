
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../../../../../prisma/client";



export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });


    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
