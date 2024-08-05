import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const calculators = await prisma.calculator.findMany();
  return NextResponse.json(calculators);
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  const newCalculator = await prisma.calculator.create({ data: { name } });
  return NextResponse.json(newCalculator, { status: 201 });
}