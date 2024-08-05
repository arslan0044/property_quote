import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const disbursements = await prisma.disbursement.findMany();
    return NextResponse.json(disbursements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve disbursements' }, { status: 500 });
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
    
    const newDisbursement = await prisma.disbursement.create({
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
    return NextResponse.json(newDisbursement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create disbursement' }, { status: 500 });
  }
}