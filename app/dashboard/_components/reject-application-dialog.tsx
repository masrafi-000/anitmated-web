"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRejectApplication } from "@/hooks/use-applications";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RejectApplicationDialogProps {
  applicationId: string;
  applicantName: string;
}

export function RejectApplicationDialog({
  applicationId,
  applicantName,
}: RejectApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const rejectMutation = useRejectApplication();

  const handleReject = async () => {
    try {
      await rejectMutation.mutateAsync({
        id: applicationId,
        reason: reason || undefined,
        adminName: "Admin", // TODO: Get from auth context
      });

      toast.success("Application rejected successfully");
      setOpen(false);
      setReason("");
    } catch (error) {
      toast.error("Failed to reject application");
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <X className="h-4 w-4 mr-1" />
          Reject
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Application</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reject the application from{" "}
            <span className="font-semibold">{applicantName}</span>? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2 py-4">
          <Label htmlFor="reason">Rejection Reason (Optional)</Label>
          <Textarea
            id="reason"
            placeholder="Provide a reason for rejection..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            disabled={rejectMutation.isPending}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={rejectMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleReject();
            }}
            disabled={rejectMutation.isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {rejectMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Rejecting...
              </>
            ) : (
              "Reject Application"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
