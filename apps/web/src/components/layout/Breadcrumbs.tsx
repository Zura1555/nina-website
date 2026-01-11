"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground mb-6",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={cn(
                "hover:text-foreground transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-primary focus-visible:ring-offset-2",
                "rounded-sm"
              )}
            >
              {item.label}
            </Link>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "text-foreground font-medium",
                index === items.length - 1 && "text-muted-foreground"
              )}
            >
              {item.label}
            </motion.span>
          )}
        </div>
      ))}
    </nav>
  );
}
