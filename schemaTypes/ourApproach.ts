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
        of: [
            {
            type: 'object',
            fields: [
                {
                name: 'number',
                title: 'Step Number',
                type: 'number',
                validation: Rule => Rule.required(),
                },
                {
                name: 'title',
                type: 'string',
                validation: Rule => Rule.required(),
                },
                {
                name: 'description',
                type: 'text',
                validation: Rule => Rule.required(),
                },
            ],
            },
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
