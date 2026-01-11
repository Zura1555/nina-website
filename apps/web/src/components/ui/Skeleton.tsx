import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse bg-muted rounded",
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

interface SkeletonTextProps {
  className?: string;
  lines?: number;
}

export function SkeletonText({ className, lines = 3 }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 w-full",
            i === lines - 1 && "w-3/4"
          )}
        />
      ))}
    </div>
  );
}

SkeletonText.displayName = "SkeletonText";

interface SkeletonAvatarProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SkeletonAvatar({ className, size = "md" }: SkeletonAvatarProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <Skeleton
      className={cn(
        "rounded-full",
        sizes[size],
        className
      )}
    />
  );
}

SkeletonAvatar.displayName = "SkeletonAvatar";
