import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ToggleBlock } from "@/components/blocks/ToggleBlock";
import { TodoBlock } from "@/components/blocks/TodoBlock";
import { CalloutBlock } from "@/components/blocks/CalloutBlock";
import { QuoteBlock } from "@/components/blocks/QuoteBlock";
import { CodeBlock } from "@/components/blocks/CodeBlock";
import { DividerBlock } from "@/components/blocks/DividerBlock";
import { Button } from "@/components/ui/Button";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export default function PageBuilder({ blocks }: { blocks: any[] }) {
  if (!blocks) return null;

  return (
    <div className="flex flex-col gap-4 py-8">
      {blocks.map((block, index) => (
        <motion.div
          key={block._key || index}
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: index * 0.05 }}
        >
          <BlockRenderer block={block} />
        </motion.div>
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: any }) {
  switch (block._type) {
    case "hero":
      return (
        <section className="text-center px-4">
          {block.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <img
                src={urlFor(block.image).width(1200).height(400).url()}
                alt={block.heading}
                className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {block.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {block.tagline}
          </motion.p>
        </section>
      );

    case "callToAction":
      return (
        <div className="text-center my-8">
          <Link href={block.url}>
            <Button size="lg">
              {block.linkText}
            </Button>
          </Link>
        </div>
      );

    case "content":
      return (
        <div className="prose prose-lg max-w-3xl mx-auto">
          <PortableText value={block.body} />
        </div>
      );

    case "toggle":
      return (
        <ToggleBlock
          summary={block.summary}
          defaultOpen={block.defaultOpen}
        >
          {block.content && <PortableText value={block.content} />}
        </ToggleBlock>
      );

    case "todo":
      return (
        <TodoBlock
          checked={block.checked || false}
          text={block.text}
        />
      );

    case "callout":
      return (
        <CalloutBlock
          emoji={block.emoji}
          title={block.title}
          variant={block.variant || "default"}
        >
          {block.content && <PortableText value={block.content} />}
        </CalloutBlock>
      );

    case "quote":
      return (
        <QuoteBlock
          content={block.content}
          author={block.author}
        />
      );

    case "code":
      return (
        <CodeBlock
          code={block.code}
          language={block.language}
          filename={block.filename}
          showLineNumbers={block.showLineNumbers}
        />
      );

    case "divider":
      return <DividerBlock />;

    case "image":
      return (
        <figure className="my-8">
          <img
            src={urlFor(block).width(800).url()}
            alt={block.alt || ""}
            className="w-full h-auto rounded-lg"
          />
          {block.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      console.warn(`Unknown block type: ${block._type}`);
      return null;
  }
}

// Portable Text components for rich text content
export const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      return (
        <figure className="my-6">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            className="w-full h-auto rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }: { value: any }) => (
      <CalloutBlock
        emoji={value.emoji}
        title={value.title}
        variant={value.variant || "default"}
      >
        <PortableText value={value.content} />
      </CalloutBlock>
    ),
    quote: ({ value }: { value: any }) => (
      <QuoteBlock content={value.content} author={value.author} />
    ),
    code: ({ value }: { value: any }) => (
      <CodeBlock
        code={value.code}
        language={value.language}
        filename={value.filename}
      />
    ),
    toggle: ({ value }: { value: any }) => (
      <ToggleBlock summary={value.summary} defaultOpen={value.defaultOpen}>
        <PortableText value={value.content} />
      </ToggleBlock>
    ),
    todo: ({ value }: { value: any }) => (
      <TodoBlock checked={value.checked || false} text={value.text} />
    ),
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-semibold mt-8 mb-4 pb-2 border-b border-border">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-medium mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-medium mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-3 border-primary pl-4 my-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    hr: () => <DividerBlock />,
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
  },
};
