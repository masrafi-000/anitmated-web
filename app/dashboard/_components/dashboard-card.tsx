import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DashboardCard({
  title,
  count,
  icon,
  description,
  href,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  description?: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="hover:bg-accent transition-colors cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count}</div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              {description}
              <ArrowUpRight className="h-3 w-3" />
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}