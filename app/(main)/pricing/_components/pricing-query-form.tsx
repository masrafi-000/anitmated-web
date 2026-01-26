"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePricingInquiry } from "@/hooks/use-pricing";
import { TCPricingInquiry, ZCPricingInquiry } from "@/schema/zod/pricingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function PricingQueryForm() {
  const queryClient = useQueryClient();
  const form = useForm<TCPricingInquiry>({
    resolver: zodResolver(ZCPricingInquiry),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useCreatePricingInquiry();

  function onSubmit(data: TCPricingInquiry) {
    mutation.mutate(data, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["pricing-inquiry"] });
        toast.success(response.message || "Query submitted successfully!");
        form.reset();
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to submit query. Please try again.",
        );
      },
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-muted/60 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Have questions about our pricing?
        </CardTitle>
        <CardDescription>
          Fill out the form below and our team will get back to you within 24
          hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan or inquiry type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Essential Plan">
                        Essential Plan ($2,999)
                      </SelectItem>
                      <SelectItem value="Growth Plan">
                        Growth Plan ($5,999)
                      </SelectItem>
                      <SelectItem value="Enterprise Plan">
                        Enterprise Plan (Custom)
                      </SelectItem>
                      <SelectItem value="General Inquiry">
                        General Inquiry
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project requirements..."
                      className="min-h-30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Inquiry
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
