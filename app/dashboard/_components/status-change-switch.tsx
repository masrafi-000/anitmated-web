"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUpdateApplicationStatus } from "@/hooks/use-applications";
import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StatusChangeSwitchProps {
  applicationId: string;
  currentStatus: string;
}

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "REVIEWING", label: "Reviewing" },
  { value: "INTERVIEWING", label: "Interviewing" },
  { value: "OFFERED", label: "Offered" },
  { value: "WITHDRAWN", label: "Withdrawn" },
];

export function StatusChangeSwitch({
  applicationId,
  currentStatus,
}: StatusChangeSwitchProps) {
  const [open, setOpen] = useState(false);
  const updateStatusMutation = useUpdateApplicationStatus();

  const handleStatusChange = async (newStatus: string, checked: boolean) => {
    if (!checked) return; // Only act when turning on

    try {
      await updateStatusMutation.mutateAsync({
        id: applicationId,
        status: newStatus,
        adminName: "Admin", // TODO: Get from auth context
      });

      toast.success(`Status updated to ${newStatus}`);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={updateStatusMutation.isPending}
        >
          {updateStatusMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              Change Status
              <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-3 p-2">
          {statusOptions.map((status) => (
            <div
              key={status.value}
              className="flex items-center justify-between space-x-2"
            >
              <Label
                htmlFor={`status-${status.value}-${applicationId}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {status.label}
              </Label>
              <Switch
                id={`status-${status.value}-${applicationId}`}
                checked={currentStatus === status.value}
                onCheckedChange={(checked) =>
                  handleStatusChange(status.value, checked)
                }
                disabled={
                  updateStatusMutation.isPending ||
                  currentStatus === status.value
                }
              />
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
