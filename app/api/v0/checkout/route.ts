import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
  packageId: z.string(),
  fullName: z.string(),
  email: z.email(),
  phone: z.string(),
  company: z.string().optional(),
  projectType: z.string(),
  timeline: z.string(),
  budget: z.string(),
  description: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = checkoutSchema.parse(body);

    const checkout = await prisma.checkout.create({
      data: {
        ...validatedData,
        company: validatedData.company || "",
      },
    });

    return NextResponse.json({
      message: "Order submitted successfully",
      data: checkout,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error },
        { status: 400 }
      );
    }
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Failed to submit order" },
      { status: 500 }
    );
  }
}
