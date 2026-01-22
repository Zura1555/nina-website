import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'quote',
    title: 'Quote',
    type: 'object',
    fields: [
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            description: 'Optional author attribution',
        }),
    ],
    preview: {
        select: {
            content: 'content',
            author: 'author',
        },
        prepare({ content, author }) {
            return {
                title: content?.substring(0, 60) + '...' || 'Quote',
                subtitle: author ? `— ${author}` : 'Quote block',
            }
        },
    },
})
