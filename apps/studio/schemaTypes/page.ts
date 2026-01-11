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
            name: 'sections',
            title: 'Content Sections',
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
                    name: 'textImage',
                    title: 'Text & Image',
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
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'imageAlt',
                            title: 'Image Alt Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'layout',
                            title: 'Layout',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Image Left', value: 'imageLeft' },
                                    { title: 'Image Right', value: 'imageRight' },
                                    { title: 'Image Full Width', value: 'imageFull' },
                                    { title: 'Text Only', value: 'textOnly' },
                                    { title: 'Image Only', value: 'imageOnly' },
                                ],
                            },
                            initialValue: 'imageLeft',
                        }),
                    ],
                },
                {
                    name: 'text',
                    title: 'Text Only',
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
                {
                    name: 'image',
                    title: 'Image Only',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        }),
                        defineField({
                            name: 'imageAlt',
                            title: 'Alt Text',
                            type: 'string',
                        }),
                    ],
                },
                {
                    name: 'cta',
                    title: 'Call to Action',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'heading',
                            title: 'Heading',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'buttonText',
                            title: 'Button Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'buttonUrl',
                            title: 'Button URL',
                            type: 'string',
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
