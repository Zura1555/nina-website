import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
}

/* Hume.ai Button Variants */
const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-[#ff8000] shadow-sm hover:shadow-purple-glow rounded-full",
  secondary:
    "bg-background text-foreground hover:bg-[#ff8000] hover:text-white border border-border/50 rounded-full",
  ghost: "bg-transparent hover:bg-muted text-foreground rounded-full",
  link: "bg-transparent text-foreground hover:text-accent-purple-500 hover:underline underline-offset-4 p-0 h-auto",
  pill: "bg-primary text-primary-foreground hover:bg-[#ff8000] shadow-md hover:shadow-purple-glow rounded-full",
};

const sizes = {
  sm: "h-8 px-3 text-xs font-mono uppercase tracking-wide rounded-full",
  md: "h-10 px-5 text-sm rounded-full",
  lg: "h-12 px-7 text-base rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          variant !== "link" && sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
