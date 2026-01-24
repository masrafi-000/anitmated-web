"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Inquiry, useUpdateInquiry } from "@/hooks/use-inquiries";
import {
    TCContact,
    TUDContact,
    ZCContact,
} from "@/schema/zod/contactFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditInquiryDialogProps {
  inquiry: Inquiry;
}

export function EditInquiryDialog({ inquiry }: EditInquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const updateInquiry = useUpdateInquiry();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ZCContact>>({
    resolver: zodResolver(ZCContact),
    defaultValues: {
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company || "",
      service: inquiry.service as
        | "branding"
        | "design"
        | "development"
        | "marketing"
        | undefined,
      budget: inquiry.budget as
        | "<5k"
        | "5k-10k"
        | "10k-20k"
        | "20k+"
        | undefined,
      description: inquiry.description || "",
    },
  });

  // Reset form when dialog opens or inquiry changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: inquiry.name,
        email: inquiry.email,
        company: inquiry.company || "",
        service: inquiry.service as
          | "branding"
          | "design"
          | "development"
          | "marketing"
          | undefined,
        budget: inquiry.budget as
          | "<5k"
          | "5k-10k"
          | "10k-20k"
          | "20k+"
          | undefined,
        description: inquiry.description || "",
      });
    }
  }, [open, inquiry, form]);

  const onSubmit = (values: TCContact) => {
    const updateData: TUDContact = {
      ...values,
      id: inquiry.id,
    };

    updateInquiry.mutate(updateData, {
      onSuccess: () => {
        toast.success("Inquiry updated successfully");
        queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        setOpen(false);
      },
      onError: (error: Error) => {
        toast.error(error?.message || "Failed to update inquiry");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Inquiry</DialogTitle>
          <DialogDescription>
            Make changes to the inquiry here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a budget" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="<5k">&lt;$5k</SelectItem>
                      <SelectItem value="5k-10k">$5k - $10k</SelectItem>
                      <SelectItem value="10k-20k">$10k - $20k</SelectItem>
                      <SelectItem value="20k+">$20k+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none h-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={updateInquiry.isPending}>
                {updateInquiry.isPending ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
