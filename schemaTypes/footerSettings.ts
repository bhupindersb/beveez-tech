// schemaTypes/footerSettings.ts
import { defineType, defineField } from 'sanity'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'url', type: 'string' },
          ],
        },
      ],
    }),

    defineField({
        name: 'services',
        title: 'Services',
        type: 'array',
        of: [
            {
            type: 'object',
            fields: [
                {
                name: 'label',
                title: 'Label',
                type: 'string',
                validation: Rule => Rule.required(),
                },
                {
                name: 'url',
                title: 'URL',
                type: 'string',
                validation: Rule => Rule.required(),
                },
            ],
            },
        ],
    }),

    defineField({
      name: 'legal',
      title: 'Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'url', type: 'string' },
          ],
        },
      ],
    }),

    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
})
