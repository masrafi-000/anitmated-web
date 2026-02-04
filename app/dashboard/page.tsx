"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApplications } from "@/hooks/use-applications";
import { useBlogs } from "@/hooks/use-blogs";
import { useInquiries, type Inquiry } from "@/hooks/use-inquiries";
import { usePackages } from "@/hooks/use-packages";
import { usePricingInquiry } from "@/hooks/use-pricing";
import { useSupport } from "@/hooks/use-support";
import {
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  HelpCircle,
  Mail,
  Package,
  TrendingUp,
} from "lucide-react";
import DashboardCard from "./_components/dashboard-card";

export default function Page() {
  const { data: inquiries, isLoading: inquiriesLoading } = useInquiries();
  const { data: applicationsData, isLoading: applicationsLoading } =
    useApplications();
  const { data: blogs, isLoading: blogsLoading } = useBlogs();
  const { data: support, isLoading: supportLoading } = useSupport();
  const { data: pricingInquiries, isLoading: pricingLoading } =
    usePricingInquiry();
  const { data: packages, isLoading: packagesLoading } = usePackages();

  // Extract applications array from new response structure
  const applications = applicationsData?.data?.all || [];

  const isLoading =
    inquiriesLoading ||
    applicationsLoading ||
    blogsLoading ||
    supportLoading ||
    pricingLoading ||
    packagesLoading;

  // Calculate recent activity (last 7 days)
  type ItemWithCreatedAt = { createdAt: string | Date };
  const getRecentCount = (items: ItemWithCreatedAt[] | undefined) => {
    if (!items) return 0;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return items.filter(
      (item) => new Date(item.createdAt) > sevenDaysAgo
    ).length;
  };

  const recentInquiries = getRecentCount(inquiries);
  const recentApplications = getRecentCount(applications);
  const recentSupport = getRecentCount(support);

  return (
    <div className="px-4 lg:px-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
         {` Welcome back! Here's an overview of your business metrics`}
        </p>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <DashboardCard
              title="Service Inquiries"
              count={inquiries?.length || 0}
              icon={<Mail className="h-4 w-4" />}
              description="View all inquiries"
              href="/dashboard/inquiry"
            />
            <DashboardCard
              title="Job Applications"
              count={applications?.length || 0}
              icon={<Briefcase className="h-4 w-4" />}
              description="View all applications"
              href="/dashboard/careers"
            />
            <DashboardCard
              title="Blog Posts"
              count={blogs?.length || 0}
              icon={<FileText className="h-4 w-4" />}
              description="Manage blog posts"
              href="/dashboard/blogs"
            />
            <DashboardCard
              title="Support Requests"
              count={support?.length || 0}
              icon={<HelpCircle className="h-4 w-4" />}
              description="View support tickets"
              href="/dashboard/support"
            />
            <DashboardCard
              title="Pricing Inquiries"
              count={pricingInquiries?.length || 0}
              icon={<DollarSign className="h-4 w-4" />}
              description="View pricing requests"
              href="/dashboard/pricing-inquiry"
            />
            <DashboardCard
              title="Packages"
              count={packages?.length || 0}
              icon={<Package className="h-4 w-4" />}
              description="Manage packages"
              href="/dashboard/packages"
            />
          </>
        )}
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">New Inquiries</span>
                  </div>
                  <span className="text-2xl font-bold">{recentInquiries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">New Applications</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {recentApplications}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Support Requests</span>
                  </div>
                  <span className="text-2xl font-bold">{recentSupport}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Contacts
                  </span>
                  <span className="text-2xl font-bold">
                    {(inquiries?.length || 0) +
                      (support?.length || 0) +
                      (pricingInquiries?.length || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Published Blogs
                  </span>
                  <span className="text-2xl font-bold">
                    {blogs?.filter((b) => b.published).length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active Packages
                  </span>
                  <span className="text-2xl font-bold">
                    {packages?.length || 0}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Latest Inquiries Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Service Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          ) : inquiries && inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.slice(0, 5).map((inquiry: Inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-start justify-between border-b pb-3 last:border-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.email} • {inquiry.service || "General Inquiry"}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No inquiries yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
