import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch a single customer by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customerId = Number(params.id);
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

// PUT: Update a single customer by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customerId = Number(params.id);
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: { name, email, phone },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

// DELETE: Delete a single customer by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customerId = Number(params.id);
    await prisma.customer.delete({
      where: { id: customerId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
