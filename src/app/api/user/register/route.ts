import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
      email: string;
      isAdmin: boolean;
    };
  } catch (error) {
    return console.log(error);
  }
};

// User registration handler
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || '';
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin token is missing.' },
        { status: 403 }
      );
    }

    const adminUser = getUserFromToken(token);

    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Only Admin can create new users.' },
        { status: 403 }
      );
    }

    const reqBody = await request.json();
    const { name, username, email, password, isAdmin} = reqBody;
    console.log(reqBody);

    // Check if email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email or Username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        isAdmin: isAdmin, 
      },
    });

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      user: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
