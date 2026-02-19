
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityListProps {
    data: {
        id: string;
        name: string;
        email: string;
        service: string;
        createdAt: string;
    }[];
}

export function RecentActivityList({ data }: RecentActivityListProps) {
    return (
        <Card className="col-span-4 lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Service Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {data.map((item) => (
                        <div key={item.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={`https://avatar.vercel.sh/${item.name}`} alt="Avatar" />
                                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{item.name}</p>
                                <p className="text-sm text-muted-foreground">{item.email}</p>
                            </div>
                            <div className="ml-auto font-medium text-xs text-muted-foreground text-right">
                                <div className="text-foreground">{item.service}</div>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                    {data.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
