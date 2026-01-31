import { Prisma } from "@/app/generated/client";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");

    const where: Prisma.JobOpportunityWhereInput = {
      isActive: true,
      deletedAt: null,
    };

    if (department && department !== "All Positions") {
      where.department = department;
    }

    const jobs = await prisma.jobOpportunity.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Job opportunities fetched successfully",
        count: jobs.length,
        data: jobs,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching job opportunities:", error);
    return NextResponse.json(
      { error: "Failed to fetch job opportunities" },
      { status: 500 },
    );
  }
}
