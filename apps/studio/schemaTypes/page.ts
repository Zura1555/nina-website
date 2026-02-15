import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Page Icon',
            type: 'string',
            description: 'Emoji icon for the page (e.g., "👋", "📝", "💬")',
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
        defineField({
            name: 'pageBuilder',
            title: 'Page Builder',
            type: 'array',
            of: [
                {
                    name: 'hero',
                    title: 'Hero Section',
                    type: 'object',
                    fields: [
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
                        }),
                        defineField({
                            name: 'image',
                            title: 'Background Image',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                    ],
                },
                {
                    name: 'content',
                    title: 'Content Section',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'heading',
                            title: 'Heading',
                            type: 'string',
                        }),
                        defineField({
                            name: 'body',
                            title: 'Body Text',
                            type: 'array',
                            of: [{ type: 'block' }],
                        }),
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug.current',
        },
        prepare(selection) {
            const { title, slug } = selection
            return {
                title: title || 'Untitled',
                subtitle: slug ? `/${slug}` : 'No slug',
            }
        },
    },
})
