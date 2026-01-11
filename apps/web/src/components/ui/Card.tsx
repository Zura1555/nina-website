"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cardHover } from "@/lib/animations";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  href?: string;
}

export function Card({
  children,
  className,
  hoverable = true,
  href,
}: CardProps) {
  const cardContent = (
    <motion.div
      initial="rest"
      whileHover={hoverable ? "hover" : "rest"}
      animate="rest"
      variants={cardHover}
      className={cn(
        "bg-card rounded-lg border border-card-border overflow-hidden",
        "transition-all duration-300",
        hoverable && "hover:shadow-lg hover:shadow-purple-glow/10 hover:-translate-y-0.5 cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{cardContent}</a>;
  }

  return cardContent;
}

export function CardImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300"
        whileHover={{ scale: 1.05 }}
      />
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4 md:p-6", className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-xl font-semibold mb-2", className)}>{children}</h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
}
