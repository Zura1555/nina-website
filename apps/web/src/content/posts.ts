import type { BlogPost } from "@/types";

// Sample blog posts data (will be replaced with MDX later)
export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-decided-to-build-my-personal-brand-online",
    title: "Why I Decided to Build My Personal Brand Online",
    date: "2024-12-20",
    excerpt:
      "After years of staying in the background, I finally took the leap to create my own space on the internet. Here's what pushed me to start.",
    coverImage: undefined,
    tags: ["Career", "Personal"],
    published: true,
    readingTime: "5 min read",
  },
  {
    slug: "lessons-from-my-first-year-in-tech",
    title: "Lessons from My First Year in Tech",
    date: "2024-11-15",
    excerpt:
      "One year ago, I made a career change that scared me. Today, I'm sharing the biggest lessons I've learned along the way.",
    coverImage: undefined,
    tags: ["Career", "Tech"],
    published: true,
    readingTime: "7 min read",
  },
  {
    slug: "finding-balance-work-life-and-everything-between",
    title: "Finding Balance: Work, Life, and Everything Between",
    date: "2024-10-28",
    excerpt:
      "The elusive work-life balance everyone talks about. Does it exist? Here are my thoughts after months of experimenting.",
    coverImage: undefined,
    tags: ["Life", "Wellness"],
    published: true,
    readingTime: "6 min read",
  },
  {
    slug: "the-power-of-saying-no",
    title: "The Power of Saying No",
    date: "2024-09-10",
    excerpt:
      "Learning to say no was one of the hardest but most liberating skills I've developed. Let me tell you why.",
    coverImage: undefined,
    tags: ["Personal", "Growth"],
    published: true,
    readingTime: "4 min read",
  },
  {
    slug: "my-morning-routine-that-actually-works",
    title: "My Morning Routine That Actually Works",
    date: "2024-08-22",
    excerpt:
      "I've tried every productivity hack out there. Here's the simple morning routine that finally stuck.",
    coverImage: undefined,
    tags: ["Life", "Productivity"],
    published: true,
    readingTime: "5 min read",
  },
];

export const latestPosts = blogPosts.slice(0, 3);
