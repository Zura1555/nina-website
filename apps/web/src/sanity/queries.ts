import { sanityFetch } from "./fetch";
import type { Project, BlogPost, Page } from "@/types/sanity";

export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  icon,
  seo {
    metaTitle,
    metaDescription
  },
  sections[] {
    _key,
    _type,
    heading,
    tagline,
    icon,
    image {
      _type,
      asset->{
        _id,
        _type,
        url
      },
      alt,
      hotspot
    },
    imageAlt,
    caption,
    layout,
    body,
    description,
    buttonText,
    buttonUrl
  }
}`;

export const PROJECTS_QUERY = `*[_type == "project"]|order(_createdAt desc){
  _id,
  title,
  slug,
  description,
  tags,
  featured,
  mainImage,
  link,
  github,
  publishedAt
}`;

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true]|order(_createdAt desc){
  _id,
  title,
  slug,
  description,
  tags,
  featured,
  mainImage,
  link,
  github,
  publishedAt
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  tags,
  featured,
  mainImage,
  gallery,
  link,
  github,
  publishedAt
}`;

export const LATEST_POSTS_QUERY = `*[_type == "post"]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "tags": tags
}`;

export const POSTS_WITH_LIMIT_QUERY = `*[_type == "post"]|order(publishedAt desc)[0...$limit]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "tags": tags
}`;

export async function getPage(slug: string): Promise<Page | null> {
  return sanityFetch<Page | null>({
    query: PAGE_QUERY,
    params: { slug },
    tags: [`page:${slug}`, "page"],
  });
}

export async function getProjects(): Promise<Project[]> {
  return sanityFetch<Project[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return sanityFetch<Project[]>({
    query: FEATURED_PROJECTS_QUERY,
    tags: ["project"],
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project | null>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags: [`project:${slug}`, "project"],
  });
}

export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>({
    query: POSTS_WITH_LIMIT_QUERY,
    params: { limit },
    tags: ["post"],
  });
}

export async function getHomepage(): Promise<Page | null> {
  return sanityFetch<Page | null>({
    query: PAGE_QUERY,
    params: { slug: "home" },
    tags: ["page:home", "page"],
  });
}
