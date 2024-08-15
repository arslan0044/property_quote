import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const calculators = await prisma.calculator.findMany({
            include: {
                quoteTypes: {
                    include: {
                        values: true,
                        supplements: true,
                        disbursements: true
                    }
                }
            }
        });
        return NextResponse.json(calculators);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching calculators.' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        
        if (!data.name || !Array.isArray(data.quote_types)) {
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        const calculator = await prisma.calculator.create({
            data: {
                name: data.name,
                htmlurl:data.htmlurl,
                jsonurl:data.jsonurl,
                quoteTypes: {
                    create: data.quote_types.map((quoteType: {
                        type: string;
                        values: any[];
                        supplements: any[];
                        disbursements: any[];
                    }) => ({
                        type: quoteType.type,
                        values: {
                            create: quoteType.values?.map(value => ({
                                propertyValueStart: value.propertyValueStart,
                                propertyValueEnd: value.propertyValueEnd,
                                legalFees: value.legalFees,
                                percentageOfValue: value.percentageOfValue,
                                plusFixedFee: value.plusFixedFee,
                                pricedOnApplication: value.pricedOnApplication
                            })) || []
                        },
                        supplements: {
                            create: quoteType.supplements?.map(supplement => ({
                                title: supplement.title,
                                cost: supplement.cost,
                                type: supplement.type,
                                free: supplement.free,
                                joinQuotes: supplement.joinQuotes,
                                perIndividual: supplement.perIndividual,
                                variable: supplement.variable,
                                pricedOnApplication: supplement.pricedOnApplication
                            })) || []
                        },
                        disbursements: {
                            create: quoteType.disbursements?.map(disbursement => ({
                                title: disbursement.title,
                                cost: disbursement.cost,
                                type: disbursement.type,
                                free: disbursement.free,
                                joinQuotes: disbursement.joinQuotes,
                                perIndividual: disbursement.perIndividual,
                                variable: disbursement.variable,
                                pricedOnApplication: disbursement.pricedOnApplication
                            })) || []
                        }
                    }))
                }
            },
            include: {
                quoteTypes: {
                    include: {
                        values: true,
                        supplements: true,
                        disbursements: true
                    }
                }
            }
        });

        return NextResponse.json(calculator, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating the calculator.' }, { status: 500 });
    }
}