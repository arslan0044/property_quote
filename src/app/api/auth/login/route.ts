import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // Update import to use Prisma

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists using Prisma
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        // console.log("User exists");

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }
        // console.log(user);

        // Create token data
        const tokenData = {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin, // Include isAdmin in token data if needed
        };

        // Create token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

        // Prepare response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            isAdmin: user.isAdmin,
            name: user.name
        });

        // Set token in cookies
        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60, // 1 day
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
