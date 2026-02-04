import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const rejectSchema = z.object({
  reason: z.string().optional(),
  adminName: z.string().min(1, "Admin name is required"),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = rejectSchema.parse(body);

    // Update application to rejected status
    const application = await prisma.application.update({
      where: { id },
      data: {
        status: "REJECTED",
        rejectedAt: new Date(),
        rejectedBy: validatedData.adminName,
        rejectionReason: validatedData.reason || null,
      },
      include: {
        job: {
          select: {
            title: true,
            department: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application rejected successfully",
        data: application,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Error rejecting application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reject application" },
      { status: 500 }
    );
  }
}
