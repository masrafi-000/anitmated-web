"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TCSupport, ZCSupport } from "@/schema/zod/supportFormSchema";

interface ChatFormProps {
  onSubmit: (body: TCSupport) => void;
  disabled?: boolean;
}

export function ChatForm({ onSubmit, disabled }: ChatFormProps) {
  const form = useForm<TCSupport>({
    resolver: zodResolver(ZCSupport),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      details: "",
    },
  });

  return (
    <div className="w-full max-w-sm bg-card p-4 rounded-lg border shadow-sm">
      <div className="mb-4">
        <h4 className="font-semibold text-sm">Contact Details</h4>
        <p className="text-xs text-muted-foreground">
          Please fill out this form so we can reach you.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Your Name"
                    {...field}
                    disabled={disabled}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    {...field}
                    disabled={disabled}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    {...field}
                    disabled={disabled}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Any specific details? (Optional)"
                    {...field}
                    disabled={disabled}
                    className="h-20 text-sm resize-none"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            className="w-full cursor-pointer"
            disabled={disabled}
          >
            Submit Details
          </Button>
        </form>
      </Form>
    </div>
  );
}
