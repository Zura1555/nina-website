import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'toggle',
    title: 'Toggle',
    type: 'object',
    fields: [
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'string',
            description: 'The clickable header text',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'The expandable content',
        }),
        defineField({
            name: 'defaultOpen',
            title: 'Default Open',
            type: 'boolean',
            initialValue: false,
            description: 'Whether the toggle is open by default',
        }),
    ],
    preview: {
        select: {
            summary: 'summary',
        },
        prepare({ summary }) {
            return {
                title: summary || 'Toggle',
                subtitle: 'Toggle/accordion block',
            }
        },
    },
})
