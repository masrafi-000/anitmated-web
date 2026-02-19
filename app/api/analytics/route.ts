import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // 1. Overview Counts
    const [
      totalInquiries,
      totalApplications,
      totalSupport,
      totalPricing,
      totalPackages,
      recentInquiriesList,
      inquiriesByService,
      inquiriesByBudget,
      last30DaysInquiries,
      last30DaysApplications,
      last30DaysSupport,
    ] = await Promise.all([
      prisma.inquiry.count(),
      prisma.application.count(),
      prisma.support.count(),
      prisma.pricingInquiry.count(),
      prisma.package.count(),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          service: true,
          createdAt: true,
        },
      }),
      prisma.inquiry.groupBy({
        by: ["service"],
        _count: {
          service: true,
        },
      }),
      prisma.inquiry.groupBy({
        by: ["budget"],
        _count: {
          budget: true,
        },
      }),
      // Fetch data for activity chart (last 30 days)
      prisma.inquiry.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { createdAt: true },
      }),
      prisma.application.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { createdAt: true },
      }),
      prisma.support.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { createdAt: true },
      }),
    ]);

    // 2. Process Activity History (Group by Date)
    const activityMap = new Map<
      string,
      { date: string; inquiries: number; applications: number; support: number }
    >();

    // Initialize map with last 30 days to ensure continuous timeline
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD
      activityMap.set(dateString, {
        date: dateString,
        inquiries: 0,
        applications: 0,
        support: 0,
      });
    }

    // Helper to populate map
    const populate = (
      items: { createdAt: Date }[],
      key: "inquiries" | "applications" | "support",
    ) => {
      items.forEach((item) => {
        const dateString = item.createdAt.toISOString().split("T")[0];
        if (activityMap.has(dateString)) {
          const entry = activityMap.get(dateString)!;
          entry[key]++;
        }
      });
    };

    populate(last30DaysInquiries, "inquiries");
    populate(last30DaysApplications, "applications");
    populate(last30DaysSupport, "support");

    // Convert map to sorted array
    const activityHistory = Array.from(activityMap.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // 3. Format Distribution Data
    const serviceDistribution = inquiriesByService.map(
      (item: { service: string; _count: { service: number } }) => ({
        name: item.service,
        value: item._count.service,
      }),
    );

    const budgetDistribution = inquiriesByBudget.map(
      (item: { budget: string; _count: { budget: number } }) => ({
        name: item.budget,
        value: item._count.budget,
      }),
    );

    return NextResponse.json({
      overview: {
        totalInquiries,
        totalApplications,
        totalSupport,
        totalPricing,
        totalPackages,
      },
      recentInquiries: recentInquiriesList,
      activityHistory,
      serviceDistribution,
      budgetDistribution,
    });
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 },
    );
  }
}
