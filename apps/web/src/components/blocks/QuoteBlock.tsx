import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  content: string;
  author?: string;
  className?: string;
}

export function QuoteBlock({ content, author, className }: QuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        "border-l-3 border-primary pl-4 my-4",
        className
      )}
    >
      <p className="text-lg italic text-muted-foreground mb-2">"{content}"</p>
      {author && (
        <cite className="text-sm text-muted-foreground not-italic">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}
