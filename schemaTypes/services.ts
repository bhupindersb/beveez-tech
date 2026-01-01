import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Service Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'image',
      title: 'Service Image (PNG / SVG / GIF / WEBP)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],

  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
