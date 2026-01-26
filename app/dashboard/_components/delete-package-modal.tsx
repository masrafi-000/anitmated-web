"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

interface DeletePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const DeletePackageModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: DeletePackageModalProps) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertTriangle className="h-6 w-6" />
            <DialogTitle>Delete Package</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete this package? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={countdown > 0 || isLoading}
          >
            {isLoading ? (
              "Deleting..."
            ) : (
              <>
                Delete Package <strong className={``}>{countdown}</strong>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
