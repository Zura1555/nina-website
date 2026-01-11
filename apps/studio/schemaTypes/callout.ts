import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'callout',
    title: 'Callout',
    type: 'object',
    fields: [
        defineField({
            name: 'emoji',
            title: 'Emoji',
            type: 'string',
            description: 'Emoji icon to display (e.g., "💡", "⚠️", "ℹ️")',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'variant',
            title: 'Variant',
            type: 'string',
            options: {
                list: [
                    { title: 'Default', value: 'default' },
                    { title: 'Warning', value: 'warning' },
                    { title: 'Info', value: 'info' },
                    { title: 'Success', value: 'success' },
                ],
            },
            initialValue: 'default',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            emoji: 'emoji',
        },
        prepare({ title, emoji }) {
            return {
                title: title || 'Callout',
                subtitle: emoji ? `${emoji} Callout block` : 'Callout block',
            }
        },
    },
})
