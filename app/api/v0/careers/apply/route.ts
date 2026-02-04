import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
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
        message: "Applications fetched successfully",
        count: applications.length,
        data: applications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

const applicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  educationLevel: z.string().optional().nullable(),
  yearsOfExperience: z.number().optional().nullable(),
  currentDesignation: z.string().optional().nullable(),
  currentCompany: z.string().optional().nullable(),
  currentSalary: z.number().optional().nullable(),
  expectedSalary: z.number().optional().nullable(),
  resumeUrl: z.string().url("Invalid Resume URL"),
  coverLetter: z.string().optional().nullable(),
  techSkills: z.array(z.string()).optional(),
  softSkills: z.array(z.string()).optional(),
  linkedInProfile: z.string().optional().nullable(),
  portfolioUrl: z.string().optional().nullable(),
  githubProfile: z.string().optional().nullable(),
  stackOverflow: z.string().optional().nullable(),
  codeForces: z.string().optional().nullable(),
  codeChef: z.string().optional().nullable(),
  hackerrank: z.string().optional().nullable(),
  leetCode: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Parse and validate
    const validatedData = applicationSchema.parse(body);

    // Create Application
    const application = await prisma.application.create({
      data: {
        jobId: validatedData.jobId,
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        educationLevel: validatedData.educationLevel,
        yearsOfExperience: validatedData.yearsOfExperience,
        currentDesignation: validatedData.currentDesignation,
        currentCompany: validatedData.currentCompany,
        currentSalary: validatedData.currentSalary,
        expectedSalary: validatedData.expectedSalary,
        resumeUrl: validatedData.resumeUrl,
        coverLetter: validatedData.coverLetter,
        techSkills: validatedData.techSkills || [],
        softSkills: validatedData.softSkills || [],
        linkedInProfile: validatedData.linkedInProfile,
        portfolioUrl: validatedData.portfolioUrl,
        githubProfile: validatedData.githubProfile,
        stackOverflow: validatedData.stackOverflow,
        codeForces: validatedData.codeForces,
        codeChef: validatedData.codeChef,
        hackerrank: validatedData.hackerrank,
        leetCode: validatedData.leetCode,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Application submitted successfully",
        data: application,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error", message: "Validation failed", errors: error.issues },
        { status: 400 },
      );
    }

    console.error("Error submitting application:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to submit application" },
      { status: 500 },
    );
  }
}
