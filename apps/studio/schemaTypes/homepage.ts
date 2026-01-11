import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homepage',
    title: 'Homepage Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'enabled',
                    title: 'Enable Hero Section',
                    type: 'boolean',
                    initialValue: true,
                }),
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                }),
                defineField({
                    name: 'tagline',
                    title: 'Tagline',
                    type: 'text',
                    rows: 3,
                }),
                defineField({
                    name: 'icon',
                    title: 'Icon (Emoji)',
                    type: 'string',
                    description: 'Add an emoji icon, e.g., "✨", "👋", "🚀"',
                }),
                defineField({
                    name: 'image',
                    title: 'Background Image',
                    type: 'image',
                    options: { hotspot: true },
                }),
                defineField({
                    name: 'overlayOpacity',
                    title: 'Overlay Opacity (%)',
                    type: 'number',
                    initialValue: 40,
                    validation: (rule) => rule.min(0).max(100),
                }),
                defineField({
                    name: 'showCta',
                    title: 'Show CTA Button',
                    type: 'boolean',
                    initialValue: true,
                }),
                defineField({
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                    initialValue: 'Read the Blog',
                }),
                defineField({
                    name: 'ctaUrl',
                    title: 'CTA Button URL',
                    type: 'string',
                    initialValue: '/blog',
                }),
            ],
        }),
        defineField({
            name: 'featuredSection',
            title: 'Featured Posts Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'enabled',
                    title: 'Enable Featured Section',
                    type: 'boolean',
                    initialValue: true,
                }),
                defineField({
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Latest Posts',
                }),
                defineField({
                    name: 'subtitle',
                    title: 'Subtitle',
                    type: 'string',
                }),
                defineField({
                    name: 'icon',
                    title: 'Icon (Emoji)',
                    type: 'string',
                }),
                defineField({
                    name: 'postLimit',
                    title: 'Number of Posts to Show',
                    type: 'number',
                    initialValue: 6,
                    validation: (rule) => rule.min(1).max(12),
                }),
                defineField({
                    name: 'showLoadMore',
                    title: 'Show Load More Button',
                    type: 'boolean',
                    initialValue: true,
                }),
                defineField({
                    name: 'loadMoreText',
                    title: 'Load More Button Text',
                    type: 'string',
                    initialValue: 'Load More',
                }),
            ],
        }),
        defineField({
            name: 'aboutSection',
            title: 'About Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'enabled',
                    title: 'Enable About Section',
                    type: 'boolean',
                    initialValue: true,
                }),
                defineField({
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'About Me',
                }),
                defineField({
                    name: 'icon',
                    title: 'Icon (Emoji)',
                    type: 'string',
                }),
                defineField({
                    name: 'bio',
                    title: 'Bio',
                    type: 'array',
                    of: [{ type: 'block' }],
                }),
                defineField({
                    name: 'author',
                    title: 'Author to Feature',
                    type: 'reference',
                    to: [{ type: 'author' }],
                    description: 'Select the author to display (uses their name, bio, and image)',
                }),
                defineField({
                    name: 'layout',
                    title: 'Layout',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Image Left', value: 'imageLeft' },
                            { title: 'Image Right', value: 'imageRight' },
                            { title: 'Centered', value: 'centered' },
                            { title: 'No Image', value: 'noImage' },
                        ],
                    },
                    initialValue: 'imageLeft',
                }),
            ],
        }),
        defineField({
            name: 'categoriesSection',
            title: 'Categories Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'enabled',
                    title: 'Enable Categories Section',
                    type: 'boolean',
                    initialValue: true,
                }),
                defineField({
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Browse by Category',
                }),
                defineField({
                    name: 'icon',
                    title: 'Icon (Emoji)',
                    type: 'string',
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 2,
                }),
            ],
        }),
        defineField({
            name: 'newsletterSection',
            title: 'Newsletter Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'enabled',
                    title: 'Enable Newsletter Section',
                    type: 'boolean',
                    initialValue: true,
                }),
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    initialValue: 'Stay Updated',
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 2,
                }),
                defineField({
                    name: 'icon',
                    title: 'Icon (Emoji)',
                    type: 'string',
                }),
                defineField({
                    name: 'buttonText',
                    title: 'Button Text',
                    type: 'string',
                    initialValue: 'Subscribe',
                }),
                defineField({
                    name: 'successMessage',
                    title: 'Success Message',
                    type: 'string',
                    initialValue: 'Thanks for subscribing!',
                }),
            ],
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Twitter/X', value: 'twitter' },
                                    { title: 'GitHub', value: 'github' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'Discord', value: 'discord' },
                                    { title: 'Email', value: 'email' },
                                    { title: 'Website', value: 'website' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                }),
                defineField({
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Homepage Settings',
                subtitle: 'Customize your homepage appearance',
            }
        },
    },
})
