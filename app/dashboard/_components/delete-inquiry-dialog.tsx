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
import { Inquiry, useDeleteInquiry } from "@/hooks/use-inquiries";
import { TUDContact } from "@/schema/zod/contactFormSchema";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DeleteInquiryDialogProps {
  inquiry: Inquiry;
}

export function DeleteInquiryDialog({ inquiry }: DeleteInquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const deleteInquiry = useDeleteInquiry();
  const queryClient = useQueryClient();

  // Handle countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, countdown]);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setCountdown(10);
    }
  };

  const handleDelete = () => {
    const deleteData: TUDContact = {
      ...inquiry,
      service: inquiry.service as
        | "branding"
        | "design"
        | "development"
        | "marketing",
      budget: inquiry.budget as "<5k" | "5k-10k" | "10k-20k" | "20k+",
      name: inquiry.name,
      email: inquiry.email,
      description: inquiry.description || "",
      id: inquiry.id,
    };
    deleteInquiry.mutate(deleteData, {
      onSuccess: () => {
        toast.success("Inquiry deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        setOpen(false);
      },
      onError: (error: Error) => {
        toast.error(error?.message || "Failed to delete inquiry");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            inquiry from <strong>{inquiry.name}</strong> and remove the data
            from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={countdown > 0 || deleteInquiry.isPending}
          >
            {deleteInquiry.isPending
              ? "Deleting..."
              : countdown > 0
                ? `Confirm (${countdown}s)`
                : "Confirm Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
