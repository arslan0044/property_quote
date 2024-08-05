import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const supplements = await prisma.supplement.findMany();
    return NextResponse.json(supplements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve supplements' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      quoteTypeId,
      title,
      cost,
      free,
      joinQuotes,
      perIndividual,
      variable,
      pricedOnApplication
    } = await request.json();
    
    const newSupplement = await prisma.supplement.create({
      data: {
        quoteTypeId,
        title,
        cost,
        free,
        joinQuotes,
        perIndividual,
        variable,
        pricedOnApplication
      },
    });
    return NextResponse.json(newSupplement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create supplement' }, { status: 500 });
  }
}