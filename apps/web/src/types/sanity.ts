import { PortableTextBlock } from 'next-sanity'

// Page Settings
export interface Page {
  _id: string
  _type: 'page'
  title: string
  slug: {
    current: string
  }
  icon?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  sections?: PageSection[]
}

export type PageSection = HeroSection | TextImageSection | TextSection | ImageSection | CTASection

export interface HeroSection {
  _key: string
  _type: 'hero'
  heading?: string
  tagline?: string
  icon?: string
  image?: SanityImage
}

export interface TextImageSection {
  _key: string
  _type: 'textImage'
  heading?: string
  body?: PortableTextBlock[]
  image?: SanityImage
  imageAlt?: string
  layout?: 'imageLeft' | 'imageRight' | 'imageFull' | 'textOnly' | 'imageOnly'
}

export interface TextSection {
  _key: string
  _type: 'text'
  heading?: string
  body?: PortableTextBlock[]
}

export interface ImageSection {
  _key: string
  _type: 'image'
  image?: SanityImage
  caption?: string
  imageAlt?: string
}

export interface CTASection {
  _key: string
  _type: 'cta'
  heading?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

export interface Project {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  description: string
  tags: string[]
  featured: boolean
  mainImage?: SanityImage
  gallery?: SanityImage[]
  link?: string
  github?: string
  publishedAt?: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface BlogPost {
  _id: string
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  mainImage?: SanityImage
  body: PortableTextBlock[]
  author?: {
    name: string
    image?: SanityImage
  }
}
