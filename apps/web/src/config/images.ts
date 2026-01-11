/**
 * Image Configuration
 *
 * This file manages placeholder images and default visuals for your website.
 * Edit these values to customize the fallback images when content images are missing.
 */

export const imageConfig = {
  // Fallback emoji placeholders for when images are not available
  placeholders: {
    /**
     * Profile/Author image placeholder
     * Shown in the hero section when no author image is uploaded
     */
    profile: '👩',

    /**
     * Blog post cover image placeholder
     * Shown when a blog post has no main image
     */
    blogPost: '✍️',

    /**
     * Project thumbnail placeholder
     * Shown when a project has no image
     */
    project: '🎨',
  },

  // Default image sizes for Sanity image transformations
  sizes: {
    /**
     * Blog card image dimensions (width x height)
     */
    blogCard: { width: 800, height: 500 },

    /**
     * Project card image dimensions
     */
    projectCard: { width: 600, height: 450 },

    /**
     * Page cover/hero image dimensions
     */
    pageCover: { width: 1920, height: 400 },

    /**
     * Author profile image dimensions
     */
    authorProfile: { width: 400, height: 400 },
  },

  // Quality settings for optimized images
  quality: {
    /**
     * CDN image quality (1-100)
     */
    default: 80,
  },
}

export type ImageConfig = typeof imageConfig
