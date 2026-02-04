import { Prisma } from "@/app/generated/client";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// GET single application by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          select: {
            id: true,
            slug: true,
            title: true,
            department: true,
            location: true,
            type: true,
            workMode: true,
          },
        },
        notes: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: application,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

// PATCH - Update application status
const updateSchema = z.object({
  status: z.enum([
    "PENDING",
    "REVIEWING",
    "INTERVIEWING",
    "OFFERED",
    "REJECTED",
    "WITHDRAWN",
  ]),
  adminName: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    const updateData: Prisma.ApplicationUpdateInput = {
      status: validatedData.status,
    };

    // If status is REJECTED, set rejection timestamp
    if (validatedData.status === "REJECTED") {
      updateData.rejectedAt = new Date();
      if (validatedData.adminName) {
        updateData.rejectedBy = validatedData.adminName;
      }
    }

    const application = await prisma.application.update({
      where: { id },
      data: updateData,
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
        message: "Application status updated successfully",
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

    console.error("Error updating application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update application" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete application" },
      { status: 500 }
    );
  }
}
