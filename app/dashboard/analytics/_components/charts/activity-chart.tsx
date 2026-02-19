
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface ActivityChartProps {
    data: {
        date: string;
        inquiries: number;
        applications: number;
        support: number;
    }[];
}

export function ActivityChart({ data }: ActivityChartProps) {
    // Format dates for display (e.g., "Oct 01")
    const formattedData = data.map((item) => ({
        ...item,
        displayDate: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        }),
    }));

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="displayDate"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    borderColor: "hsl(var(--border))",
                                    color: "hsl(var(--foreground))",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="inquiries"
                                stackId="1"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.2}
                                name="Inquiries"
                            />
                            <Area
                                type="monotone"
                                dataKey="applications"
                                stackId="1"
                                stroke="hsl(var(--chart-2))"
                                fill="hsl(var(--chart-2))"
                                fillOpacity={0.2}
                                name="Applications"
                            />
                            <Area
                                type="monotone"
                                dataKey="support"
                                stackId="1"
                                stroke="hsl(var(--chart-3))"
                                fill="hsl(var(--chart-3))"
                                fillOpacity={0.2}
                                name="Support"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
