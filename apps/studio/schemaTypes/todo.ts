import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'todo',
    title: 'Todo',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Text',
            type: 'string',
        }),
        defineField({
            name: 'checked',
            title: 'Checked',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            text: 'text',
            checked: 'checked',
        },
        prepare({ text, checked }) {
            return {
                title: text || 'Todo',
                subtitle: checked ? '✓ Completed' : '○ Incomplete',
            }
        },
    },
})
