
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    IconBriefcase,
    IconChartBar,
    IconDatabaseDollar,
    IconMist
} from "@tabler/icons-react";

interface OverviewCardsProps {
    data: {
        totalInquiries: number;
        totalApplications: number;
        totalSupport: number;
        totalPricing: number;
        totalPackages: number;
    };
}

export function OverviewCards({ data }: OverviewCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                    <IconChartBar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.totalInquiries}</div>
                    <p className="text-xs text-muted-foreground">
                        Across all services
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Job Applications</CardTitle>
                    <IconBriefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.totalApplications}</div>
                    <p className="text-xs text-muted-foreground">
                        Active candidates
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pricing Inquiries</CardTitle>
                    <IconDatabaseDollar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.totalPricing}</div>
                    <p className="text-xs text-muted-foreground">
                        Quote requests
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                    <IconMist className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.totalSupport}</div>
                    <p className="text-xs text-muted-foreground">
                        Customer issues
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
