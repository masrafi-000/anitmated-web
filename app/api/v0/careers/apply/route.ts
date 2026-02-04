import { ApplicationStatus, Prisma } from "@/app/generated/client";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // Build where clause
    const where: Prisma.ApplicationWhereInput = {};

    // Filter by search (name or email)
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    // Filter by status
    if (status) {
      where.status = status as ApplicationStatus;
    }

    // Filter by department (via job relation)
    if (department && department !== "All") {
      where.job = {
        department: department,
      };
    }

    // Separate counts query - remove status filter but keep other filters
    const countWhere = { ...where };
    delete countWhere.status;

    const [applications, statusCounts] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          job: {
            select: {
              id: true,
              slug: true,
              title: true,
              department: true,
            },
          },
        },
      }),
      prisma.application.groupBy({
        by: ["status"],
        _count: {
          _all: true,
        },
        where: countWhere,
      }),
    ]);

    // Define Application type from the query result
    type ApplicationWithJob = Prisma.ApplicationGetPayload<{
      include: {
        job: {
          select: {
            id: true;
            slug: true;
            title: true;
            department: true;
          };
        };
      };
    }>;

    // Group by department
    const byDepartment: Record<string, ApplicationWithJob[]> = {};
    const byStatus: Record<string, ApplicationWithJob[]> = {};

    applications.forEach((app) => {
      // Add null check for job
      if (!app.job) {
        console.warn(`Application ${app.id} has no associated job`);
        return;
      }

      const dept = app.job.department;
      const appStatus = app.status;

      if (!byDepartment[dept]) {
        byDepartment[dept] = [];
      }
      byDepartment[dept].push(app);

      if (!byStatus[appStatus]) {
        byStatus[appStatus] = [];
      }
      byStatus[appStatus].push(app);
    });

    // Map aggregation results to counts object
    const countMap = statusCounts.reduce((acc, curr) => {
      acc[curr.status] = curr._count._all;
      return acc;
    }, {} as Record<string, number>);

    // Calculate total from aggregation
    const totalCount = statusCounts.reduce((acc, curr) => acc + curr._count._all, 0);

    // Count statistics using the aggregated data
    const counts = {
      total: totalCount,
      pending: countMap.PENDING || 0,
      reviewing: countMap.REVIEWING || 0,
      interviewing: countMap.INTERVIEWING || 0,
      offered: countMap.OFFERED || 0,
      rejected: countMap.REJECTED || 0,
      withdrawn: countMap.WITHDRAWN || 0,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Applications fetched successfully",
        data: {
          all: applications,
          byDepartment,
          byStatus,
        },
        count: counts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    // Log the full error for debugging
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch applications",
        error: error instanceof Error ? error.message : "Unknown error"
      },
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
