import prisma from "@/lib/prisma";
import { ZCContact } from "@/schema/zod/contactFormSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = ZCContact.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submited succesfully",
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
