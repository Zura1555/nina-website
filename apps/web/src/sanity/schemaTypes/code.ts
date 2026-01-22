import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'code',
    title: 'Code Block',
    type: 'object',
    fields: [
        defineField({
            name: 'code',
            title: 'Code',
            type: 'text',
            rows: 10,
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            options: {
                list: [
                    { title: 'JavaScript', value: 'javascript' },
                    { title: 'TypeScript', value: 'typescript' },
                    { title: 'Python', value: 'python' },
                    { title: 'HTML', value: 'html' },
                    { title: 'CSS', value: 'css' },
                    { title: 'JSON', value: 'json' },
                    { title: 'Bash', value: 'bash' },
                    { title: 'SQL', value: 'sql' },
                    { title: 'Other', value: 'other' },
                ],
            },
            initialValue: 'typescript',
        }),
        defineField({
            name: 'filename',
            title: 'Filename',
            type: 'string',
            description: 'Optional filename to display in header',
        }),
        defineField({
            name: 'showLineNumbers',
            title: 'Show Line Numbers',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            code: 'code',
            language: 'language',
            filename: 'filename',
        },
        prepare({ code, language, filename }) {
            return {
                title: filename || `${language} code`,
                subtitle: code?.substring(0, 40) + '...' || 'Code block',
            }
        },
    },
})
