import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Page documents
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = doc?.slug
        const href = slug === 'home' ? '/' : `/${slug}`
        return {
          locations: [
            { title: doc?.title || 'Untitled', href },
          ],
        }
      },
    }),
    
    // Post documents
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = doc?.slug
        return {
          locations: [
            { title: doc?.title || 'Untitled', href: `/blog/${slug}` },
            { title: 'Blog', href: '/blog' },
          ],
        }
      },
    }),
  },
}
