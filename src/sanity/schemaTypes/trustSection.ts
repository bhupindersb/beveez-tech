import { defineType, defineField } from 'sanity'

export const trustSection = defineType({
  name: 'trustSection',
  title: 'Trust Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'icon', type: 'image' },
          ],
        },
      ],
    }),
  ],
})
