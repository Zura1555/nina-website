import { client } from './client'
import type { Project, BlogPost } from '@/types/sanity'

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
}`

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
}`

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
}`

export const LATEST_POSTS_QUERY = `*[_type == "post"]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "tags": tags
}`

export async function getProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(PROJECTS_QUERY)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(FEATURED_PROJECTS_QUERY)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug })
}

export async function getLatestPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(LATEST_POSTS_QUERY)
}
