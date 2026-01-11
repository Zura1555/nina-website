import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { urlFor } from "@/sanity/image";

interface PageCoverProps {
  coverImage?: {
    asset: {
      _ref?: string;
    };
    alt?: string;
  };
  icon?: string;
  iconColor?: string;
  title: string;
  className?: string;
}

export function PageCover({
  coverImage,
  icon,
  iconColor,
  title,
  className,
}: PageCoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const imageUrl = coverImage?.asset?._ref
    ? urlFor(coverImage).width(1920).height(400).url()
    : null;

  return (
    <div ref={ref} className={cn("relative -mx-6 -mt-4 mb-6", className)}>
      {/* Cover Image */}
      {imageUrl && (
        <motion.div
          style={{ y, opacity }}
          className="relative h-48 md:h-64 w-full overflow-hidden"
        >
          <motion.img
            src={imageUrl}
            alt={coverImage?.alt || title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        </motion.div>
      )}

      {/* Icon and Title */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3">
          {icon && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-5xl"
              style={{ color: iconColor }}
              role="img"
              aria-label={icon}
            >
              {icon}
            </motion.span>
          )}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className={cn(
              "text-4xl md:text-5xl font-bold",
              "leading-tight tracking-tight"
            )}
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </div>
  );
}
