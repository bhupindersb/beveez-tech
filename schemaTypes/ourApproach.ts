import { defineType, defineField } from 'sanity'

export const ourApproach = defineType({
  name: 'ourApproach',
  title: 'Our Approach',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'subText',
      title: 'Sub Text',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      validation: Rule => Rule.min(1).required(),
      of: [
        defineField({
          name: 'step',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Step Number',
              type: 'number', // ✅ FIXED
              validation: Rule => Rule.required().integer().positive(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'visual',
      title: 'Right Column Visual',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'mainImage',
          title: 'Main Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'subText',
          title: 'Sub Text',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
  ],
})
