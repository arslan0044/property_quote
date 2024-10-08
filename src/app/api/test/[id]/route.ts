import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Utility function to parse integer IDs safely
const parseId = (id: string) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error("Invalid ID");
  return parsedId;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseId(params.id);

    const calculator = await prisma.calculator.findUnique({
      where: { id },
      include: {
        quoteTypes: {
          include: {
            values: true,
            supplements: true,
            disbursements: true,
          },
        },
      },
    });

    if (!calculator) {
      return NextResponse.json(
        { error: "Calculator not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(calculator);
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the calculator." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    if (!data.name || !Array.isArray(data.quote_types)) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const calculatorId = parseId(params.id);

    // Step 1: Delete existing related records
    await prisma.$transaction([
      prisma.value.deleteMany({ where: { quoteType: { calculatorId } } }),
      prisma.supplement.deleteMany({ where: { quoteType: { calculatorId } } }),
      prisma.disbursement.deleteMany({
        where: { quoteType: { calculatorId } },
      }),
      prisma.quoteType.deleteMany({ where: { calculatorId } }),
    ]);

    // Step 2: Update calculator
    const updatedCalc = await prisma.calculator.update({
      where: { id: calculatorId },
      data: { name: data.name, htmlurl: data.htmlurl, jsonurl: data.jsonurl },
    });

    // Step 3: Create new quote types and related records
    for (const quoteType of data.quote_types) {
      const newQuoteType = await prisma.quoteType.create({
        data: {
          type: quoteType.type,
          calculatorId: updatedCalc.id,
        },
      });

      if (quoteType.values && quoteType.values.length > 0) {
        await prisma.value.createMany({
          data: quoteType.values.map((v: any) => ({
            ...v,
            quoteTypeId: newQuoteType.id,
          })),
        });
      }

      if (quoteType.supplements && quoteType.supplements.length > 0) {
        await prisma.supplement.createMany({
          data: quoteType.supplements.map((s: any) => ({
            ...s,
            quoteTypeId: newQuoteType.id,
          })),
        });
      }

      if (quoteType.disbursements && quoteType.disbursements.length > 0) {
        await prisma.disbursement.createMany({
          data: quoteType.disbursements.map((d: any) => ({
            ...d,
            quoteTypeId: newQuoteType.id,
          })),
        });
      }
    }

    // Step 4: Fetch and return the updated calculator with all related data
    const updatedCalculator = await prisma.calculator.findUnique({
      where: { id: updatedCalc.id },
      include: {
        quoteTypes: {
          include: {
            values: true,
            supplements: true,
            disbursements: true,
          },
        },
      },
    });

    return NextResponse.json(updatedCalculator);
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json(
      {
        error: "An error occurred while updating the calculator.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseId(params.id);

    await prisma.$transaction(async (tx) => {
      await tx.value.deleteMany({ where: { quoteType: { calculatorId: id } } });
      await tx.supplement.deleteMany({
        where: { quoteType: { calculatorId: id } },
      });
      await tx.disbursement.deleteMany({
        where: { quoteType: { calculatorId: id } },
      });
      await tx.quoteType.deleteMany({ where: { calculatorId: id } });
      await tx.calculator.delete({ where: { id } });
    });

    return NextResponse.json(
      { message: "Calculator deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in DELETE:", error);
    return NextResponse.json(
      {
        error: "An error occurred while deleting the calculator.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
