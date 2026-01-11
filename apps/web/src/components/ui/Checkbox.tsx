import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked = false, onChange, className, id, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label
        className={cn(
          "flex items-center gap-3 cursor-pointer select-none",
          "group",
          className
        )}
        htmlFor={id}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <motion.div
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center",
              "transition-all duration-200",
              checked
                ? "bg-primary border-primary"
                : "border-border group-hover:border-primary/50"
            )}
            animate={checked ? { scale: [1, 0.9, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            {checked && (
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.15 }}
                className="w-3.5 h-3.5 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            )}
          </motion.div>
        </div>
        {label && (
          <span
            className={cn(
              "text-sm transition-colors",
              checked && "text-muted-foreground line-through"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
