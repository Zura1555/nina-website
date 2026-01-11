import { PortableTextBlock } from 'next-sanity'

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
