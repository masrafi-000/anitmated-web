"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ZCPackages } from "@/schema/zod/pricing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type PackageFormValues = z.infer<typeof ZCPackages>;

export default function CreatePackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(ZCPackages),
    defaultValues: {
      title: "Essential",
      price: "",
      slug: "",
      description: "",
      cta: "Get Started",
      features: [""],
      isPopular: false,
    },
  });



  async function onSubmit(data: PackageFormValues) {
    setLoading(true);
    try {
      const response = await fetch("/api/v0/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create package");
      }

      toast.success("Package created successfully");
      router.push("/dashboard/packages"); 
      router.refresh(); 
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  const currentFeatures = form.watch("features");

  return (
    <div className="px-4 md:px-6 lg:px-8 container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Package</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <Input placeholder="Enter title"  {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                            <Input placeholder="essential-plan" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input placeholder="$99" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                 <FormField
                    control={form.control}
                    name="isPopular"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 rounded-md border p-3 mt-2">
                        <FormControl>
                            <Checkbox
                            className="size-4 cursor-pointer"
                            checked={field.value}
                            onCheckedChange={() => field.onChange(!field.value)}
                            />
                        </FormControl>
                        <div className="-mt-2">
                            <FormLabel className="text-sm">
                            Popular
                            </FormLabel>
                            <FormDescription>
                            Mark this plan as popular/recommended.
                            </FormDescription>
                        </div>
                        </FormItem>
                    )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Plan description..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <FormLabel>Features</FormLabel>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            // Manual append to default array handling since useFieldArray requires complex setup for primitives sometimes
                            const current = form.getValues("features");
                            form.setValue("features", [...current, ""]);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Feature
                    </Button>
                </div>
                {/* Manual mapping for simplicity with primitives */}
                {currentFeatures.map((_, index) => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={`features.${index}`}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-2">
                                <FormControl>
                                    <Input {...field} placeholder="Feature detail..." />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => {
                                        const current = form.getValues("features");
                                        if(current.length > 1) {
                                            const newFeatures = current.filter((_, i) => i !== index);
                                            form.setValue("features", newFeatures);
                                        } else {
                                            // Maybe don't delete last one or just clear it?
                                            // Schema says min(1), so keeping at least one is good, logic above handles.
                                            // But if user wants to delete the only one? form validation will catch empty.
                                            // Let's allow delete if > 1 or just clear.
                                            if (current.length === 1) {
                                                // form.setValue("features", []); // Validations will fail, which is correct
                                                // Actually let's just remove it.
                                                // form.setValue("features", []);
                                                // But map wont render anything.
                                                // Let's just create a new empty one?
                                            }
                                             const newFeatures = current.filter((_, i) => i !== index);
                                             form.setValue("features", newFeatures);
                                        }
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                {form.formState.errors.features && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.features.message}</p>
                )}
              </div>

               <div className="w-full">
                 <FormField
                    control={form.control}
                    name="cta"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>CTA Text</FormLabel>
                        <FormControl>
                            <Input placeholder="Get Started" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
               </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Package"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
