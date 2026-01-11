import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface DialogProps extends HTMLMotionProps<"dialog"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ className, children, open, onOpenChange, ...props }, ref) => {
    return (
      <motion.dialog
        ref={ref}
        open={open}
        className={cn(
          "bg-card rounded-xl border border-card-border p-0 max-w-lg w-full",
          "backdrop:bg-background/80 backdrop:backdrop-blur-sm",
          "open:animate-fade-in closed:animate-fade-out",
          className
        )}
        onClose={(e) => {
          onOpenChange?.(false);
        }}
        {...props}
      >
        {children}
      </motion.dialog>
    );
  }
);

Dialog.displayName = "Dialog";

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-0", className)} {...props}>
        {children}
      </div>
    );
  }
);

DialogContent.displayName = "DialogContent";

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center px-4 py-3 border-b border-border", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogHeader.displayName = "DialogHeader";

interface DialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("max-h-72 overflow-y-auto py-2", className)} {...props}>
        {children}
      </div>
    );
  }
);

DialogBody.displayName = "DialogBody";

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-end gap-3 px-4 py-3 border-t border-border", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogFooter.displayName = "DialogFooter";
