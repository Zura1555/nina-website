import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-2 py-0.5",
          "text-xs font-mono font-medium",
          "bg-muted rounded border border-border",
          "text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";
