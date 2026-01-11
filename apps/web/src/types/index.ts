/**
 * Blog post frontmatter
 */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  readingTime?: string;
  content?: string;
}

/**
 * Project data
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

/**
 * Social link
 */
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

/**
 * Navigation item
 */
export interface NavItem {
  label: string;
  href: string;
}

/**
 * Site metadata
 */
export interface SiteMetadata {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  email: string;
  social: SocialLink[];
}
