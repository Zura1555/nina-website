import { cn } from "@/lib/utils";

interface CalloutBlockProps {
  emoji?: string;
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "warning" | "info" | "success";
  className?: string;
}

const variants = {
  default: {
    bg: "bg-muted/50",
    border: "border-border",
    icon: "💡",
  },
  warning: {
    bg: "bg-warning-bg",
    border: "border-warning/30",
    icon: "⚠️",
  },
  info: {
    bg: "bg-info-bg",
    border: "border-info/30",
    icon: "ℹ️",
  },
  success: {
    bg: "bg-success-bg",
    border: "border-success/30",
    icon: "✅",
  },
};

export function CalloutBlock({
  emoji,
  icon,
  title,
  children,
  variant = "default",
  className,
}: CalloutBlockProps) {
  const style = variants[variant];

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg border",
        style.bg,
        style.border,
        className
      )}
    >
      <div className="flex-shrink-0 text-xl">
        {emoji || icon || style.icon}
      </div>
      <div className="flex-1">
        {title && (
          <p className="font-medium mb-1 text-foreground">{title}</p>
        )}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
