"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ToggleBlockProps {
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function ToggleBlock({
  summary,
  children,
  defaultOpen = false,
  className,
}: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      className={cn(
        "group mb-3 rounded-lg border border-border overflow-hidden",
        "hover:bg-muted/30 transition-colors",
        className
      )}
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer list-none select-none">
        <ChevronRight
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            "group-open:rotate-90"
          )}
        />
        <span className="font-medium">{summary}</span>
      </summary>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pl-9 text-muted-foreground">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </details>
  );
}
