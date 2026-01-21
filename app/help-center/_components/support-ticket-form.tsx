"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ticketFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  priority: z.enum(["low", "medium", "high", "critical"]),
  issueType: z.enum(["bug", "feature", "billing", "general"]),
  message: z.string().min(10, "Please provide more detail in your message."),
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

export function SupportTicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      issueType: "general",
      message: "",
    },
  });

  async function onSubmit(data: TicketFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Support Ticket Data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  }

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Open a Ticket</h3>
        <p className="text-sm text-muted-foreground">
            Fill out the form below to get extended assistance from our technical team.
        </p>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
          <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Ticket Submitted!</h4>
          <p className="text-muted-foreground max-w-xs mx-auto">
            We've received your request and will get back to you shortly via email.
          </p>
          <Button variant="outline" className="mt-6" onClick={() => setIsSuccess(false)}>
            Submit Another Ticket
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
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
                    <FormLabel>Email Address</FormLabel>
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
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief summary of the issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="issueType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="billing">Billing Issue</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your issue in detail..."
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include steps to reproduce if applicable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Ticket...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Ticket
                </>
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
