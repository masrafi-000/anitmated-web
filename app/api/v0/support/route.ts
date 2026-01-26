import prisma from "@/lib/prisma";
import { ZCSupport } from "@/schema/zod/supportFormSchema";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    const support = await prisma.support.findMany();
    return NextResponse.json(
      {
        success: true,
        message:
          support.length === 0
            ? " No Support Data Found"
            : "All Submitted Support Forms Fetched",
        count: support.length,
        data: support,
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

    const validatedData = ZCSupport.parse(body);

    const support = await prisma.support.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Support Form Submitted Successfully",
        data: support,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const support = await prisma.support.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Support Form Deleted Successfully",
        data: support,
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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const support = await prisma.support.update({
      where: {
        id: body.id,
      },
      data: body,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Support Form Updated Successfully",
        data: support,
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
