import { defineType, defineField } from 'sanity'

export const whyChooseUs = defineType({
  name: 'whyChooseUs',
  title: 'Why Choose Us',
  type: 'document',
  fields: [
    defineField({
      name: 'ghostHeading',
      title: 'Ghost Heading (Background)',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Left Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'points',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ✅ STAT CARDS
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            {
              name: 'value',
              title: 'Stat Value',
              type: 'number',
              description: 'Example: 120, 98, 5',
              validation: Rule => Rule.required(),
            },
            {
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'Use + or % (leave empty if none)',
              options: {
                list: [
                  { title: '+', value: '+' },
                  { title: '%', value: '%' },
                ],
              },
            },
            {
              name: 'title',
              title: 'Stat Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Stat Description',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'Stat Icon (SVG / GIF)',
              type: 'image',
              options: {
                accept: 'image/svg+xml,image/gif,image/png',
              },
            },
          ],
        },
      ],
    }),
  ],
})
