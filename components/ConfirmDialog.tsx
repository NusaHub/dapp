"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  triggerText?: string; // teks tombol opsional
  title: string;
  description: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
  open?: boolean; // otomatis open jika true
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  triggerText,
  title,
  description,
  onConfirm,
  variant = "default",
  open: openProp,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  // jika diberikan prop open, override state internal
  React.useEffect(() => {
    if (openProp !== undefined) {
      setOpen(openProp);
    }
  }, [openProp]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerText && (
        <DialogTrigger asChild>
          <Button>{triggerText}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Confirm
          </Button>
          {/* <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
