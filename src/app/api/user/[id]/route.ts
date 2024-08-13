import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
      email: string;
      isAdmin: boolean;
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const user = getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = parseInt(request.url.split("/").pop() || "", 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const foundUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: foundUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const adminUser = getUserFromToken(token);
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = parseInt(request.url.split("/").pop() || "", 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const reqBody = await request.json();
    console.log("Received request body:", reqBody);

    const { name, username, email, password, isAdmin } = reqBody;

    const updatedData: any = {};
    if (name !== undefined) updatedData.name = name;
    if (username !== undefined) updatedData.username = username;
    if (email !== undefined) updatedData.email = email;
    if (isAdmin !== undefined) updatedData.isAdmin = isAdmin;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updatedData.password = await bcryptjs.hash(password, salt);
    }

    console.log("Data to be updated:", updatedData);
    
    if (Object.keys(updatedData).length > 0) {
      try {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: updatedData,
        });
        console.log("Updated user:", updatedUser);

        return NextResponse.json({
          message: "User updated successfully",
          user: updatedUser,
        });
      } catch (dbError: any) {
        console.error("Database update error:", dbError);
        return NextResponse.json({ error: dbError.message }, { status: 500 });
      }
    } else {
      console.log("No changes to update");
      return NextResponse.json({
        message: "No changes to update",
      });
    }
  } catch (error: any) {
    console.error("General error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const adminUser = getUserFromToken(token);
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = parseInt(request.url.split("/").pop() || "", 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}