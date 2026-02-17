"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api, ApiError } from "@/lib/axios";

// Username Schema
const usernameSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters"),
});

// Password Schema
const passwordSchema = z.object({
    password: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type UsernameFormValues = z.infer<typeof usernameSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

interface SecuritySettingsProps {
    user: {
        username: string;
    };
    onUpdate: () => void;
}

export function SecuritySettings({ user, onUpdate }: SecuritySettingsProps) {
    const [isUsernameLoading, setIsUsernameLoading] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    const usernameForm = useForm<UsernameFormValues>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: user.username || "",
        },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    async function onUsernameSubmit(data: UsernameFormValues) {
        if (data.username === user.username) {
            toast.info("Username is the same");
            return;
        }

        setIsUsernameLoading(true);
        try {
            await api.put("/admin-auth", { username: data.username });
            toast.success("Username updated successfully");
            onUpdate();
        } catch (error) {
            const err = error as ApiError;
            toast.error(err.message || "Failed to update username");
        } finally {
            setIsUsernameLoading(false);
        }
    }

    async function onPasswordSubmit(data: PasswordFormValues) {
        setIsPasswordLoading(true);
        try {
            await api.put("/admin-auth", {
                password: data.password,
                newPassword: data.newPassword
            });
            toast.success("Password updated successfully");
            passwordForm.reset();
        } catch (error) {
            const err = error as ApiError;
            toast.error(err.message || "Failed to update password");
        } finally {
            setIsPasswordLoading(false);
        }
    }

    return (
        <div className="space-y-6">

            <Card>
                <CardHeader>
                    <CardTitle>Change Username</CardTitle>
                    <CardDescription>Update your unique username.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...usernameForm}>
                        <form onSubmit={usernameForm.handleSubmit(onUsernameSubmit)} className="space-y-4 max-w-md">
                            <FormField
                                control={usernameForm.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="new_username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isUsernameLoading}>
                                {isUsernameLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update Username
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 max-w-md">
                            <FormField
                                control={passwordForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPasswordLoading}>
                                {isPasswordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
