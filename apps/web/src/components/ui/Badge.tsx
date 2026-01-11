import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "purple" | "blue" | "green";
  className?: string;
}

/* Hume.ai Badge Styles - Mono uppercase labels */
export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wide",
        {
          /* Hume.ai default: subtle purple accent */
          "bg-accent-purple-500/10 text-accent-purple-500": variant === "default",
          /* Purple variant */
          "bg-accent-purple-500/20 text-accent-purple-500": variant === "purple",
          /* Blue variant */
          "bg-accent-blue-300/30 text-accent-blue-400": variant === "blue",
          /* Green variant */
          "bg-accent-green-200 text-accent-green-300": variant === "green",
          /* Outline variant */
          "border border-border text-muted-foreground bg-transparent": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
