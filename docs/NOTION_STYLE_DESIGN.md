# Notion-Style Website Design Document

**Version:** 1.0
**Date:** January 5, 2025
**Project:** Nina Website - Notion-Style Redesign
**Tech Stack:** Next.js 14 + Tailwind CSS + Framer Motion + Sanity CMS

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Design Philosophy](#design-philosophy)
3. [Layout Structure](#layout-structure)
4. [Typography System](#typography-system)
5. [Color Palette](#color-palette)
6. [Component Library](#component-library)
7. [Interactive Elements](#interactive-elements)
8. [Mobile Responsiveness](#mobile-responsiveness)
9. [Implementation Guidelines](#implementation-guidelines)
10. [Code Examples](#code-examples)

---

## Executive Summary

This design document provides comprehensive specifications for transforming the existing Nina website into a polished Notion-style personal site. The redesign focuses on minimalism, content hierarchy, and seamless user experience while maintaining the existing tech stack of Next.js, Tailwind CSS, and Sanity CMS.

The Notion aesthetic emphasizes whitespace, subtle borders, clean typography, and modular content blocks. This document builds upon the existing foundation while extending it with new components, patterns, and design tokens that align with modern 2025 web design standards.

---

## Design Philosophy

### Core Principles

The Notion-style design philosophy centers on three foundational principles that guide every design decision in this project. First, content primacy means the design should recede, allowing the content to take center stage. This is achieved through generous whitespace, restrained color palettes, and typography that prioritizes readability over decoration. Second, consistency creates familiarity, so users can navigate intuitively across different pages and sections. This is maintained through systematic spacing, unified component patterns, and predictable interactions. Third, subtle refinement acknowledges that quality lies in details that users may not consciously notice but will appreciate subconsciously. This includes smooth transitions, thoughtful hover states, and considered micro-interactions.

### Design Goals

The primary goals for this redesign include achieving a clean, distraction-free reading environment that encourages engagement with the content. The design must support multiple content types including blog posts, projects, and personal information without visual inconsistency. Navigation should feel natural and intuitive, with clear visual hierarchy and accessible pathways. Performance considerations ensure the site loads quickly and animates smoothly on all devices. Finally, maintainability requires that the design system scales cleanly as the website grows, with reusable components and consistent patterns.

---

## Layout Structure

### Overall Architecture

The Notion-style layout consists of three primary zones: the sidebar navigation, the main content area, and an optional right-side contextual panel. This tripartite structure provides clear organization while maximizing content space.

**Sidebar Navigation (Left Panel)**

The sidebar serves as the primary navigation hub, providing access to all major sections and pages of the site. It remains visible on larger screens while collapsing into a drawer or hamburger menu on mobile devices.

```css
/* Sidebar styles */
.sidebar {
  width: 260px;
  min-width: 260px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--background);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  transition: transform 0.3s ease;
}

.sidebar-collapsed {
  transform: translateX(-100%);
}
```

**Main Content Area (Center)**

The main content area is the primary focus, designed for optimal readability with constrained maximum widths. Content is centered with generous margins to prevent lines from becoming too long to read comfortably.

```css
.main-content {
  margin-left: 260px;
  padding: 2rem 3rem;
  max-width: 900px;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .main-content {
    margin-left: 0;
    padding: 1.5rem;
  }
}
```

**Page Cover Area**

Notion-style pages typically feature a cover image at the top, followed by an icon and the page title. This creates visual hierarchy and personality for each page.

```tsx
interface PageCoverProps {
  coverImage?: string;
  icon?: string;
  iconColor?: string;
  title: string;
}

function PageCover({ coverImage, icon, iconColor, title }: PageCoverProps) {
  return (
    <div className="relative -mx-6 -mt-4 mb-6">
      {coverImage && (
        <div className="h-48 md:h-64 w-full overflow-hidden">
          <img
            src={coverImage}
            alt="Page cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <span
              className="text-5xl"
              style={{ color: iconColor }}
            >
              {icon}
            </span>
          )}
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      </div>
    </div>
  );
}
```

### Navigation Components

**Breadcrumb Navigation**

Breadcrumbs provide context about the user's location within the site hierarchy and enable quick navigation up the tree.

```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {item.href ? (
            <a href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
```

**Sidebar Navigation Structure**

The sidebar should support nested navigation with collapsible sections, creating an expandable tree structure.

```tsx
interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  isExpanded?: boolean;
}

function SidebarNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="py-4">
      {items.map((item) => (
        <NavItemRow key={item.label} item={item} />
      ))}
    </nav>
  );
}

function NavItemRow({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const [isExpanded, setIsExpanded] = useState(item.isExpanded ?? true);

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-2 py-1.5 px-3 hover:bg-muted rounded-md cursor-pointer transition-colors",
          depth > 0 && "ml-4"
        )}
        style={{ paddingLeft: `${8 + depth * 12}px` }}
      >
        {item.children && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 hover:bg-muted-foreground/20 rounded"
          >
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          </button>
        )}
        {item.icon && <span className="text-base">{item.icon}</span>}
        {item.href ? (
          <a href={item.href} className="text-sm text-foreground hover:text-primary">
            {item.label}
          </a>
        ) : (
          <span className="text-sm text-muted-foreground">{item.label}</span>
        )}
      </div>
      {item.children && isExpanded && (
        <div className="mt-1">
          {item.children.map((child) => (
            <NavItemRow key={child.label} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Typography System

### Font Stack

The typography system relies on a carefully selected font stack that ensures beautiful rendering across all platforms while maintaining the clean, modern aesthetic characteristic of Notion-style designs.

```css
/* Primary sans-serif stack - clean, modern, highly readable */
--font-sans: "Google Sans", "Inter", -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Monospace stack - for code blocks and technical content */
--font-mono: "JetBrains Mono", "Fira Code", "SF Mono",
             Consolas, "Liberation Mono", Menlo, monospace;
```

The primary font, Inter, has become the industry standard for clean, modern interface design. Its tall x-height and open apertures ensure excellent readability at all sizes. For users who do not have Inter installed, the system falls back gracefully to the native system fonts, which on macOS and iOS provides San Francisco, on Windows provides Segoe UI, and on Android provides Roboto.

### Type Scale

The type scale follows a carefully considered ratio that creates clear visual hierarchy while maintaining harmony between different heading levels.

```css
/* Type scale - based on 16px base, 1.25 ratio */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */

/* Line heights */
--leading-tight: 1.2;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Typography Styles

```css
/* Base body text */
body {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--foreground);
}

/* Headings with tight leading for display impact */
h1, .h1 {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

h2, .h2 {
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: -0.01em;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

h3, .h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

h4, .h4 {
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Body paragraphs */
p {
  margin-bottom: 1.25rem;
  color: var(--foreground);
}

/* Links */
a {
  color: var(--primary);
  text-decoration: none;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s ease;
}

a:hover {
  text-decoration: underline;
  text-decoration-color: var(--primary);
}
```

### Prose Content Styling

For long-form content such as blog posts and articles, a dedicated prose component provides consistent styling that optimizes readability.

```css
.prose {
  max-width: 65ch;
  line-height: var(--leading-relaxed);
}

.prose p {
  margin-bottom: 1.5rem;
}

.prose h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.prose h3 {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose ul, .prose ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.prose li::marker {
  color: var(--muted-foreground);
}

.prose blockquote {
  border-left: 3px solid var(--primary);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--muted-foreground);
}

.prose code {
  background-color: var(--muted);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: var(--font-mono);
}

.prose pre {
  background-color: var(--muted);
  padding: 1.25rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose pre code {
  background: none;
  padding: 0;
  font-size: 0.875em;
}

.prose img {
  border-radius: 8px;
  margin: 2rem 0;
  width: 100%;
  height: auto;
}

.prose hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}
```

---

## Color Palette

### Design Token Architecture

The color system is built on CSS custom properties that support both light and dark modes while maintaining visual consistency and accessibility standards.

```css
/* ===== LIGHT MODE (Default) ===== */
:root {
  /* Neutrals - Foundation of the minimal aesthetic */
  --background: #ffffff;
  --foreground: #1a1a1a;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --muted-foreground-light: #a3a3a3;
  --border: #e5e5e5;
  --border-subtle: #f0f0f0;

  /* Primary Accent - Coral Pink (warm, inviting) */
  --primary: #f43f5e;
  --primary-light: #fb7185;
  --primary-lighter: #ffe4e6;
  --primary-foreground: #ffffff;

  /* Surface colors for cards and elevated elements */
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --card-border: #f0f0f0;
  --card-hover: #fafafa;

  /* Status colors - kept minimal */
  --success: #10b981;
  --success-bg: #ecfdf5;
  --warning: #f59e0b;
  --warning-bg: #fffbeb;
  --error: #ef4444;
  --error-bg: #fef2f2;
  --info: #3b82f6;
  --info-bg: #eff6ff;

  /* Shadows - subtle depth without harshness */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04),
            0 1px 2px -1px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.04),
               0 2px 4px -2px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.04),
               0 4px 6px -4px rgba(0, 0, 0, 0.04);
  --shadow-pink: 0 4px 14px 0 rgba(244, 63, 94, 0.15);
}

/* ===== DARK MODE ===== */
.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --muted: #1a1a1a;
  --muted-foreground: #a3a3a3;
  --muted-foreground-light: #d4d4d4;
  --border: #262626;
  --border-subtle: #333333;

  /* Primary Accent - Slightly lighter for dark backgrounds */
  --primary: #fb7185;
  --primary-light: #fda4af;
  --primary-lighter: rgba(253, 164, 175, 0.15);
  --primary-foreground: #0a0a0a;

  /* Surface colors */
  --card: #141414;
  --card-foreground: #ededed;
  --card-border: #262626;
  --card-hover: #1f1f1f;

  /* Status colors - adjusted for dark mode */
  --success-bg: #064e3b;
  --warning-bg: #451a03;
  --error-bg: #450a0a;
  --info-bg: #1e3a5f;

  /* Shadows - subtle glow effects */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5),
            0 1px 2px -1px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5),
               0 2px 4px -2px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5),
               0 4px 6px -4px rgba(0, 0, 0, 0.5);
  --shadow-pink: 0 4px 14px 0 rgba(251, 113, 133, 0.2);
}
```

### Color Application Guide

The color palette should be applied consistently across the interface to create visual harmony while maintaining clear information hierarchy.

**Text Colors**

Text color usage follows a clear hierarchy that guides user attention and ensures readability. Primary text color (#1a1a1a light, #ededed dark) is used for main content, headings, and interactive elements. Muted text color (#737373 light, #a3a3a3 dark) is used for secondary information, captions, and metadata. Link text uses the primary accent color (#f43f5e light, #fb7185 dark) with hover states that darken slightly for contrast.

**Background Colors**

Background colors create visual separation between different areas of the interface. The default background (#ffffff light, #0a0a0a dark) fills the entire page. The muted background (#f5f5f5 light, #1a1a1a dark) is used for navigation elements, code blocks, and subtle separation. The card background (#ffffff light, #141414 dark) is used for contained content areas like blog posts and project cards.

**Border Colors**

Borders provide visual structure without adding visual weight. The default border (#e5e5e5 light, #262626 dark) is used for main structural boundaries. Subtle borders (#f0f0f0 light, #333333 dark) are used for internal divisions and hover states.

---

## Component Library

### Block-Based Content System

The Notion-style architecture organizes content into modular blocks. Each block is a self-contained unit that can be styled, reordered, or manipulated independently.

```tsx
interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
  children?: Block[];
}

type BlockType =
  | 'paragraph'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'bulleted-list'
  | 'numbered-list'
  | 'todo'
  | 'toggle'
  | 'quote'
  | 'code'
  | 'image'
  | 'divider'
  | 'callout';

interface BlockContent {
  text?: string;
  checked?: boolean;
  language?: string;
  src?: string;
  alt?: string;
  icon?: string;
  color?: string;
  emoji?: string;
}
```

### Text Block Component

```tsx
function TextBlock({ content, type = 'paragraph' }: {
  content: string;
  type?: BlockType;
}) {
  const Tag = type.startsWith('heading')
    ? type.replace('-', '') as keyof JSX.IntrinsicElements
    : 'p';

  const className = cn(
    'mb-3 leading-relaxed',
    {
      'text-3xl font-bold mt-8 mb-4': type === 'heading-1',
      'text-2xl font-semibold mt-6 mb-3': type === 'heading-2',
      'text-xl font-medium mt-5 mb-2': type === 'heading-3',
    }
  );

  return <Tag className={className}>{content}</Tag>;
}
```

### Toggle Block Component

Toggle blocks provide collapsible content sections, perfect for FAQs or supplementary information.

```tsx
interface ToggleBlockProps {
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ToggleBlock({ summary, children, defaultOpen = false }: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      className="group mb-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer list-none select-none">
        <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
        <span className="font-medium">{summary}</span>
      </summary>
      <div className="px-4 pb-4 pl-6 text-muted-foreground">
        {children}
      </div>
    </details>
  );
}
```

### Todo Block Component

```tsx
interface TodoBlockProps {
  checked: boolean;
  text: string;
  onChange?: (checked: boolean) => void;
}

function TodoBlock({ checked, text, onChange }: TodoBlockProps) {
  return (
    <label className="flex items-start gap-3 py-1 cursor-pointer group">
      <div className={cn(
        "relative w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
        checked
          ? "bg-primary border-primary"
          : "border-border group-hover:border-primary/50"
      )}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
        />
        {checked && (
          <Check className="w-3.5 h-3.5 text-primary-foreground" />
        )}
      </div>
      <span className={cn(
        "group-hover:text-foreground transition-colors",
        checked && "line-through text-muted-foreground"
      )}>
        {text}
      </span>
    </label>
  );
}
```

### Callout Block Component

Callout blocks highlight important information with optional icons and colored backgrounds.

```tsx
interface CalloutBlockProps {
  emoji?: string;
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'info' | 'success';
}

function CalloutBlock({
  emoji,
  icon,
  title,
  children,
  variant = 'default'
}: CalloutBlockProps) {
  const variants = {
    default: { bg: 'bg-muted/50', border: 'border-border' },
    warning: { bg: 'bg-warning-bg', border: 'border-warning/30' },
    info: { bg: 'bg-info-bg', border: 'border-info/30' },
    success: { bg: 'bg-success-bg', border: 'border-success/30' },
  };

  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg border",
      variants[variant].bg,
      variants[variant].border
    )}>
      <div className="flex-shrink-0 text-xl">
        {emoji || icon || '💡'}
      </div>
      <div className="flex-1">
        {title && <p className="font-medium mb-1">{title}</p>}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
```

### Quote Block Component

```tsx
interface QuoteBlockProps {
  content: string;
  author?: string;
}

function QuoteBlock({ content, author }: QuoteBlockProps) {
  return (
    <blockquote className="border-l-3 border-primary pl-4 my-4">
      <p className="text-lg italic text-muted-foreground mb-2">"{content}"</p>
      {author && (
        <cite className="text-sm text-muted-foreground not-italic">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}
```

### Code Block Component

```tsx
interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-border my-4">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
          <FileCode className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{filename}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto bg-muted text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <button
          className="absolute top-3 right-3 p-2 rounded bg-muted-foreground/20 hover:bg-muted-foreground/30 transition-colors"
          aria-label="Copy code"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

### Image Block Component

```tsx
interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

function ImageBlock({ src, alt, caption, width, height }: ImageBlockProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <figure className="my-6">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-muted",
          isExpanded ? "fixed inset-4 z-50" : "cursor-zoom-in"
        )}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-auto transition-opacity duration-300",
            isExpanded && "max-h-full object-contain",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-background/90 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </figure>
  );
}
```

### Divider Block Component

```tsx
function DividerBlock() {
  return (
    <hr className="my-6 border-t border-border" />
  );
}
```

### Button Components

The button component system provides consistent styling with visual feedback for interaction states.

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    ...props
  }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      secondary: "bg-muted text-foreground hover:bg-muted/80 border border-border",
      ghost: "bg-transparent hover:bg-muted text-foreground",
      link: "bg-transparent text-primary hover:underline underline-offset-4 p-0 h-auto",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-md",
      md: "h-10 px-5 text-sm rounded-lg",
      lg: "h-12 px-6 text-base rounded-xl",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          variant !== 'link' && sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner className="mr-2 w-4 h-4" />
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);
```

### Input Components

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border bg-background transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-error focus:ring-error/20 focus:border-error",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={cn(
          "text-sm",
          error ? "text-error" : "text-muted-foreground"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-background transition-all duration-200 resize-none",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-error focus:ring-error/20 focus:border-error",
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn(
            "text-sm",
            error ? "text-error" : "text-muted-foreground"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
```

### Card Components

```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

function Card({ children, className, hoverable = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2, shadow: "0 8px 30px -8px rgba(0,0,0,0.08)" } : undefined}
      className={cn(
        "bg-card rounded-xl border border-card-border overflow-hidden transition-shadow duration-300",
        hoverable && "hover:shadow-md cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5 border-b border-card-border", className)}>{children}</div>;
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5 pt-0 flex items-center gap-3", className)}>{children}</div>;
}

function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
}

function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground mt-1", className)}>{children}</p>;
}
```

### Badge Component

```tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const variants = {
    default: "bg-primary-lighter text-primary",
    outline: "border border-border text-muted-foreground",
    success: "bg-success-bg text-success",
    warning: "bg-warning-bg text-warning",
    error: "bg-error-bg text-error",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span className={cn(
      "inline-flex items-center font-medium rounded-full",
      variants[variant],
      sizes[size]
    )}>
      {children}
    </span>
  );
}
```

---

## Interactive Elements

### Hover States

Hover states provide visual feedback that makes the interface feel responsive and polished. The hover effects should be subtle and fast to avoid disrupting the user's flow.

```css
/* Link hover */
a {
  transition: color 0.15s ease, text-decoration-color 0.15s ease;
}

/* Button hover - slight lift */
.btn:hover {
  transform: translateY(-1px);
}

/* Card hover - shadow increase */
.card:hover {
  box-shadow: var(--shadow-md);
}

/* Sidebar item hover */
.nav-item:hover {
  background-color: var(--muted);
}

/* Table row hover */
.table-row:hover {
  background-color: var(--muted);
}
```

### Transition System

The transition system ensures consistent timing and easing across all interactive elements.

```css
/* Transition variables */
--transition-fast: 150ms ease;
--transition-normal: 200ms ease;
--transition-slow: 300ms ease;

/* Easing functions */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Focus States

Accessible focus states ensure keyboard navigation is intuitive and clear.

```css
/* Focus visible for accessibility */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Loading States

```tsx
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <svg
      className={cn("animate-spin", sizes[size])}
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
  );
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-muted rounded", className)} />
  );
}
```

### Command Palette

The command palette provides quick access to site features and navigation.

```tsx
interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  // Available commands
  const commands = [
    { id: 'home', label: 'Go to Home', shortcut: 'H', action: () => router.push('/') },
    { id: 'projects', label: 'Go to Projects', shortcut: 'P', action: () => router.push('/projects') },
    { id: 'blog', label: 'Go to Blog', shortcut: 'B', action: () => router.push('/blog') },
    { id: 'contact', label: 'Go to Contact', shortcut: 'C', action: () => router.push('/contact') },
    { id: 'theme', label: 'Toggle Theme', shortcut: 'D', action: () => toggleTheme() },
    { id: 'search', label: 'Search', shortcut: 'K', action: () => openSearch() },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-lg">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-base"
            autoFocus
          />
          <kbd className="px-2 py-0.5 text-xs bg-muted rounded">ESC</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {commands
            .filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()))
            .map((cmd) => (
              <button
                key={cmd.id}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-muted transition-colors"
                onClick={() => {
                  cmd.action();
                  onOpenChange(false);
                }}
              >
                <span className="text-sm">{cmd.label}</span>
                {cmd.shortcut && (
                  <kbd className="text-xs text-muted-foreground">{cmd.shortcut}</kbd>
                )}
              </button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Mobile Responsiveness

### Breakpoint System

```css
/* Breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Responsive Layout Strategy

```css
/* Mobile-first base styles */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  transform: translateX(-100%);
  z-index: 100;
  transition: transform 0.3s ease;
}

.sidebar.open {
  transform: translateX(0);
}

.main-content {
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0);
    width: 240px;
  }

  .main-content {
    margin-left: 240px;
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .main-content {
    margin-left: 260px;
    padding: 2.5rem 3rem;
    max-width: 900px;
  }
}
```

### Mobile Navigation

```tsx
function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 bottom-0 w-[280px] bg-card border-r border-border z-50"
      >
        <div className="flex flex-col h-full pt-16 px-4">
          <nav className="flex-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block py-3 px-4 rounded-lg text-base font-medium hover:bg-muted transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="py-4 border-t border-border">
            <ThemeToggle />
          </div>
        </div>
      </motion.div>
    </>
  );
}
```

### Touch-Friendly Interactions

```css
/* Minimum touch target size */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Prevent tap highlight on mobile */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* iOS text size adjustment */
html {
  -webkit-text-size-adjust: 100%;
}
```

---

## Implementation Guidelines

### File Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Global styles and design tokens
│   │   └── slug/                   # Dynamic routes for pages
│   ├── components/
│   │   ├── ui/                     # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Select.tsx
│   │   │   └── ...
│   │   ├── blocks/                 # Content block components
│   │   │   ├── TextBlock.tsx
│   │   │   ├── HeadingBlock.tsx
│   │   │   ├── ImageBlock.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── QuoteBlock.tsx
│   │   │   ├── CalloutBlock.tsx
│   │   │   ├── ToggleBlock.tsx
│   │   │   ├── TodoBlock.tsx
│   │   │   └── ...
│   │   ├── layout/                 # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PageCover.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── ...
│   │   └── features/               # Feature-specific components
│   ├── lib/
│   │   ├── utils.ts                # Utility functions
│   │   ├── animations.ts           # Framer motion variants
│   │   ├── hooks.ts                # Custom React hooks
│   │   └── constants.ts            # Design constants
│   └── styles/
│       ├── variables.css           # CSS custom properties
│       ├── typography.css          # Typography system
│       └── components.css          # Component styles
```

### Component Development Rules

Each component should follow these guidelines:

1. Export both component and props interface
2. Use TypeScript for type safety
3. Support className composition via cn()
4. Include accessibility attributes
5. Support dark mode via CSS variables
6. Include hover and focus states
7. Use framer-motion for meaningful animations
8. Write story for documentation if applicable

### CSS Organization

```css
/* 1. Design tokens */
:root {
  --color-*: ...;
  --spacing-*: ...;
  --font-*: ...;
  --shadow-*: ...;
  --radius-*: ...;
}

/* 2. Base styles */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}

/* 3. Typography */
h1, h2, h3, ... { ... }
p, a, ul, ol, ... { ... }

/* 4. Component styles */
.btn { ... }
.card { ... }
.input { ... }

/* 5. Utility classes */
.flex { display: flex; }
.grid { display: grid; }
.overflow-hidden { overflow: hidden; }
/* etc. */
```

---

## Code Examples

### Complete Page Layout Example

```tsx
import { Sidebar } from '@/components/layout/Sidebar';
import { PageCover } from '@/components/layout/PageCover';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TextBlock } from '@/components/blocks/TextBlock';
import { HeadingBlock } from '@/components/blocks/HeadingBlock';
import { QuoteBlock } from '@/components/blocks/QuoteBlock';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = {
    title: 'The Art of Minimalist Design',
    icon: '🎨',
    coverImage: '/images/cover.jpg',
    content: [
      { type: 'paragraph', text: 'Minimalism is not about removing things you love...' },
      { type: 'heading-2', text: 'Key Principles' },
      { type: 'paragraph', text: 'There are several fundamental principles that guide minimalist design...' },
      { type: 'quote', text: 'Less is more.', author: 'Ludwig Mies van der Rohe' },
    ],
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 ml-0 lg:ml-64 xl:ml-72">
        <PageCover
          coverImage={post.coverImage}
          icon={post.icon}
          title={post.title}
        />

        <div className="max-w-3xl mx-auto px-6 pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />

          <article className="prose">
            {post.content.map((block, index) => {
              switch (block.type) {
                case 'heading-1':
                  return <HeadingBlock key={index} content={block.text} type="h1" />;
                case 'heading-2':
                  return <HeadingBlock key={index} content={block.text} type="h2" />;
                case 'paragraph':
                  return <TextBlock key={index} content={block.text} />;
                case 'quote':
                  return <QuoteBlock key={index} content={block.text} author={block.author} />;
                default:
                  return null;
              }
            })}
          </article>
        </div>
      </main>
    </div>
  );
}
```

### Theme Provider

```tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Animation Constants

```typescript
import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

export const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
};
```

---

## Conclusion

This design document provides a comprehensive foundation for implementing a Notion-style website that balances minimalism with functionality. The system builds on your existing Next.js, Tailwind CSS, and Sanity CMS stack while introducing new components and patterns that align with modern 2025 web design standards.

Key takeaways from this document include the importance of consistent spacing and typography in creating a clean, professional appearance. The block-based content system enables flexible, modular layouts that can adapt to various content types. The color palette, built on CSS custom properties, supports seamless dark mode switching while maintaining visual consistency. Interactive elements should be subtle but polished, using smooth transitions and thoughtful hover states. Mobile responsiveness is essential, with a focus on touch-friendly interactions and collapsible navigation.

The next steps for implementation include updating the global CSS with the expanded design tokens, creating the new block components in the components/blocks directory, implementing the sidebar navigation and page cover components, building the command palette for quick navigation, and progressively enhancing the existing pages with the new design system.

This document should be treated as a living reference that evolves as the project grows and new requirements emerge. Regular design reviews will help ensure consistency and quality throughout the implementation process.