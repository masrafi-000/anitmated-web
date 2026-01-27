
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const job = await prisma.jobOpportunity.findUnique({
      where: {
        slug: slug,
        isActive: true,
        deletedAt: null,
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job opportunity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    return NextResponse.json(
      { error: "Failed to fetch job details" },
      { status: 500 }
    );
  }
}
