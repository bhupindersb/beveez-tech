import { defineType, defineField } from 'sanity'

export const trustSection = defineType({
  name: 'trustSection',
  title: 'Trust Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    // ✅ NEW: Heading Icon (SVG / GIF / PNG)
    defineField({
      name: 'headingIcon',
      title: 'Heading Icon (SVG / GIF)',
      type: 'image',
      options: {
        accept: '.svg,.gif,.png',
      },
    }),

    defineField({
      name: 'items',
      title: 'Trust Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon (SVG / GIF)',
              type: 'image',
              options: {
                accept: '.svg,.gif,.png',
              },
            },
            {
              name: 'title',
              title: 'Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
})
