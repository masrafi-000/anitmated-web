


import prisma from "@/lib/prisma";
import { ZCPricingInquiry } from "@/schema/zod/pricingSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const pricingInquiries = await prisma.pricingInquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      {
        success: true,
        message:
          pricingInquiries.length === 0
            ? " No Pricing Inquiry Data Found"
            : "All Submitted Pricing Inquiries Fetched",
        data: pricingInquiries,
        count: pricingInquiries.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = ZCPricingInquiry.parse(body);

    const inquiry = await prisma.pricingInquiry.create({
       data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pricing Inquiry Form Submitted Successfully",
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const inquiry = await prisma.pricingInquiry.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pricing Inquiry Deleted Successfully",
        data: inquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const inquiry = await prisma.pricingInquiry.update({
      where: {
        id: body.id,
      },
      data: body,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pricing Inquiry Updated Successfully",
        data: inquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}