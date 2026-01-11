import { cn } from "@/lib/utils";

interface DividerBlockProps {
  className?: string;
}

export function DividerBlock({ className }: DividerBlockProps) {
  return (
    <hr
      className={cn(
        "my-6 border-t border-border",
        className
      )}
    />
  );
}
