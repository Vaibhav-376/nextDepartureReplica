import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";



export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.user.delete({ where: { id: params.id } });
        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { isAdmin } = await request.json();
    try {
        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: { isAdmin },
        });
        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
