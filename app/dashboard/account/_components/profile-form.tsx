"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProfileUpdate } from "@/hooks/use-profile-update";

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    designation: z.string().optional(),
    avaterImage: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    user: {
        name: string;
        email: string;
        username: string;
        designation?: string;
        avaterImage?: string;
    };
    onUpdate: () => void;
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
    const { mutate: updateProfile, isPending: isLoading } = useProfileUpdate();

    console.log(user)
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || "",
            designation: user.designation || "",
            avaterImage: user.avaterImage || "",
        },
    });

    const avatarUrl = useWatch({
        control: form.control,
        name: "avaterImage",
    });

    function onSubmit(data: ProfileFormValues) {
        updateProfile(data, {
            onSuccess: () => {
                onUpdate();
            }
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="text-2xl">
                        {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <h4 className="font-medium text-sm">{user.designation}</h4>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Designation</FormLabel>
                                <FormControl>
                                    <Input placeholder="Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="avaterImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Avatar URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/avatar.png" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Profile
                    </Button>
                </form>
            </Form>
        </div>
    );
}
