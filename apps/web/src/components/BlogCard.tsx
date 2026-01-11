"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardImage } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp } from "@/lib/animations";
import { formatDate } from "@/lib/utils";
import { urlFor } from "@/sanity/image";

// Mock BlogPost type (legacy)
interface MockBlogPost {
  _id?: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  readingTime?: string;
}

// Sanity BlogPost type
interface SanityBlogPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  tags?: string[];
  body?: any[];
  author?: {
    name: string;
    image?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  };
}

// Combined type
export type BlogPost = MockBlogPost | SanityBlogPost;

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  // Normalize fields for both mock and Sanity formats
  const isMock = 'date' in post;
  const slug = isMock
    ? (post.slug.startsWith('/') ? post.slug.slice(1) : post.slug)
    : post.slug.current;
  const title = post.title;
  const date = isMock ? post.date : post.publishedAt;
  const excerpt = post.excerpt || '';
  const tags = isMock ? post.tags : (post.tags || []);
  const readingTime = isMock ? post.readingTime : undefined;

  // Support both Sanity image and mock image
  const imageUrl = !isMock && post.mainImage
    ? urlFor(post.mainImage).width(800).height(500).url()
    : isMock && post.coverImage
    ? post.coverImage
    : undefined;

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blog/${slug}`}>
        <Card>
          {/* Cover Image */}
          <div className="aspect-[16/10] bg-gradient-to-br from-primary-lighter to-muted flex items-center justify-center relative overflow-hidden">
            {imageUrl ? (
              <CardImage
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl">✍️</span>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

            {/* Tags on image */}
            <div className="absolute bottom-3 left-3 flex gap-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>

          <CardContent>
            {/* Meta */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(date)}</span>
              {readingTime && (
                <>
                  <span>•</span>
                  <span>{readingTime}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {excerpt}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
