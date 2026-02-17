"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/use-user";
import { RefreshCcw, UserX } from "lucide-react";
import { ProfileForm } from "./_components/profile-form";
import { SecuritySettings } from "./_components/security-settings";

const ProfileSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="flex items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
        <div className="space-y-4 max-w-md">
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-32 mt-6" />
        </div>
    </div>
);

const SecuritySkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <Card className="border-muted/60">
            <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
                <div className="max-w-md space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </CardContent>
        </Card>
        <Card className="border-muted/60">
            <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
                <div className="max-w-md space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </CardContent>
        </Card>
    </div>
);

export default function AccountPage() {
    const { data: user, isLoading, refetch } = useUser();

    // Error State
    if (!isLoading && !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <div className="bg-destructive/10 p-4 rounded-full mb-4">
                    <UserX className="h-10 w-10 text-destructive" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">User not found</h2>
                <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                    We encountered a problem while fetching your account details. Please try again or contact support if the issue persists.
                </p>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Refresh Page
                    </Button>
                    <Button onClick={() => refetch()} className="gap-2">
                        <RefreshCcw className="h-4 w-4" /> Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 px-4 md:px-10">
            <div>
                <h3 className="text-2xl font-semibold tracking-tight">Account</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4 outline-none">
                    <Card className="shadow-sm border-muted/60">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your profile details and public information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <ProfileSkeleton />
                            ) : (
                                <ProfileForm user={user!.user} onUpdate={refetch} />
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4 outline-none">
                    {isLoading ? (
                        <SecuritySkeleton />
                    ) : (
                        <SecuritySettings user={user!.user} onUpdate={refetch} />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}