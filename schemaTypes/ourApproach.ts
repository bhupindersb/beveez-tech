import { defineType, defineField } from 'sanity'

export const ourApproach = defineType({
  name: 'ourApproach',
  title: 'Our Approach Section',
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
      type: 'string',
    }),

    /* LEFT COLUMN – STEPS */
    defineField({
      name: 'steps',
      title: 'Approach Steps',
      type: 'array',
      validation: Rule => Rule.min(1),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Step Number',
              type: 'numberint',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
          ],
        },
      ],
    }),

    /* RIGHT COLUMN */
    defineField({
      name: 'visual',
      title: 'Right Column Visual',
      type: 'object',
      fields: [
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'mainImage',
          title: 'Main Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'subText',
          title: 'Bottom Sub Text',
          type: 'string',
        },
      ],
    }),
  ],
})
