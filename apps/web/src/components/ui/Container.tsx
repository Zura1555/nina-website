import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-6 md:px-8",
        {
          "max-w-[1280px]": size === "default",
          "max-w-[768px]": size === "narrow",
          "max-w-[1536px]": size === "wide",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
