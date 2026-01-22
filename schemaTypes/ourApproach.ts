import { defineType, defineField } from 'sanity'

export const ourApproach = defineType({
  name: 'ourApproach',
  title: 'Our Approach',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'subText',
      type: 'text',
    }),

    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'ourApproachStep' }], // ✅ FIX
      validation: Rule => Rule.min(1),
    }),

    defineField({
      name: 'visual',
      title: 'Visual',
      type: 'object',
      fields: [
        {
          name: 'backgroundImage',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'mainImage',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'subText',
          type: 'text',
        },
      ],
    }),
  ],
})
