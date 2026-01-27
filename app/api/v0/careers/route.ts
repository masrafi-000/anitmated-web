import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await prisma.jobOpportunity.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
     
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
