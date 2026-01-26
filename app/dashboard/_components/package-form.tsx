"use client";

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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TCPackages, ZCPackages } from "@/schema/zod/pricing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

interface PackageFormProps {
  initialData?: TCPackages;
  onSubmit: (data: TCPackages) => void;
  isLoading: boolean;
}

export function PackageForm({
  initialData,
  onSubmit,
  isLoading,
}: PackageFormProps) {
  const form = useForm<TCPackages>({
    resolver: zodResolver(ZCPackages),
    defaultValues: initialData || {
      title: "",
      price: "",
      slug: "",
      description: "",
      features: ["New Feature"],
      cta: "",
      isPopular: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features" as never,
  });

  const handleSubmit = (data: TCPackages) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Essential" {...field} />

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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the package..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPopular"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Popular Package</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Mark this package as popular to highlight it.
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <FormLabel>Features</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append("New Feature")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`features.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {form.formState.errors.features?.root?.message}
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Package" : "Create Package"}
        </Button>
      </form>
    </Form>
  );
}
