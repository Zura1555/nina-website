"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, FileCode } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden border border-border my-4",
        className
      )}
    >
      {filename && (
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-2 bg-muted border-b border-border",
            "text-sm text-muted-foreground"
          )}
        >
          <FileCode className="w-4 h-4" />
          <span>{filename}</span>
          {language && (
            <span className="ml-auto px-2 py-0.5 bg-background rounded text-xs">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        {!filename && language && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 text-xs text-muted-foreground bg-muted rounded">
              {language}
            </span>
          </div>
        )}
        <pre
          className={cn(
            "p-4 overflow-x-auto bg-muted text-sm",
            "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
          )}
        >
          <code className="font-mono">{lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none opacity-30 w-8 text-right pr-4">
                  {i + 1}
                </span>
              )}
              <span>{line}</span>
            </div>
          ))}</code>
        </pre>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className={cn(
            "absolute top-3 right-3 p-2 rounded",
            "bg-background/80 hover:bg-background",
            "border border-border",
            "transition-colors"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
