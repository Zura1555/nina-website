import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
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
            description: 'Emoji or icon for the page (e.g., "🎨")',
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                // Standard blocks
                { type: 'block' },
                { type: 'image' },
                // Custom blocks
                { type: 'callout' },
                { type: 'quote' },
                { type: 'code' },
                { type: 'toggle' },
                { type: 'todo' },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author, title, media } = selection
            return {
                title: title || 'Untitled',
                subtitle: author ? `by ${author}` : 'No author',
                media: media,
            }
        },
    },
})
