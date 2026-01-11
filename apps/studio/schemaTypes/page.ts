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
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'pageBuilder',
            title: 'Page Builder',
            type: 'array',
            of: [
                {
                    name: 'hero',
                    title: 'Hero',
                    type: 'object',
                    fields: [
                        { name: 'heading', type: 'string', title: 'Heading' },
                        { name: 'tagline', type: 'string', title: 'Tagline' },
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                    ],
                },
                {
                    name: 'callToAction',
                    title: 'Call to Action',
                    type: 'object',
                    fields: [
                        { name: 'linkText', type: 'string', title: 'Link Text' },
                        { name: 'url', type: 'string', title: 'URL' },
                    ],
                },
                {
                    name: 'content',
                    title: 'Content',
                    type: 'object',
                    fields: [
                        {
                            name: 'body',
                            title: 'Body',
                            type: 'array',
                            of: [{ type: 'block' }]
                        }
                    ]
                },
            ],
        }),
    ],
})
