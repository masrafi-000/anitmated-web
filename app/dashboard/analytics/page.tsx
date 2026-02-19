
"use client";


import { useAnalytics } from "@/hooks/use-analytics";
import { IconAlertTriangle } from "@tabler/icons-react";
import { AnalyticsHeader } from "./_components/analytics-header";
import { ActivityChart } from "./_components/charts/activity-chart";
import { BudgetBarChart } from "./_components/charts/budget-bar-chart";
import { ServicePieChart } from "./_components/charts/service-pie-chart";
import { OverviewCards } from "./_components/overview-cards";
import { RecentActivityList } from "./_components/recent-activity-list";
import Loading from "./loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AnalyticsPage() {
    const { data, isLoading, error } = useAnalytics();

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="p-8">
                <Alert variant="destructive">
                    <IconAlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Failed to load analytics data. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <AnalyticsHeader />
            <div className="space-y-4">
                <OverviewCards data={data.overview} />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4 lg:col-span-7">
                        <ActivityChart data={data.activityHistory} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4 md:col-span-3 lg:col-span-3">
                        <ServicePieChart data={data.serviceDistribution} />
                    </div>
                    <div className="col-span-4 md:col-span-4 lg:col-span-4">
                        <BudgetBarChart data={data.budgetDistribution} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-1">
                    <RecentActivityList data={data.recentInquiries} />
                </div>
            </div>
        </div>
    );
}
