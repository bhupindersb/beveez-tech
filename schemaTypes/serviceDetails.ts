import { defineType, defineField } from 'sanity'

export const serviceDetail = defineType({
  name: 'serviceDetail',
  title: 'Service Detail',
  type: 'object',

  fields: [
    defineField({
      name: 'heading',
      title: 'Service Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'subText',
      title: 'Short Sub Text',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'includes',
      title: 'What’s Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),

    defineField({
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'string',
    }),

    defineField({
      name: 'accent',
      title: 'Accent Color (hex)',
      type: 'string',
      description: 'Example: #f28f23',
    }),

    /* ================= VISUAL ================= */

    defineField({
      name: 'visual',
      title: 'Visual',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Visual Type',
          type: 'string',
          options: {
            list: [
              { title: 'Lottie (Hero Only)', value: 'lottie' },
              { title: 'Image', value: 'image' },
            ],
            layout: 'radio',
          },
          validation: Rule => Rule.required(),
        }),

        defineField({
          name: 'lottieFile',
          title: 'Lottie JSON',
          type: 'file',
          hidden: ({ parent }) => parent?.type !== 'lottie',
        }),

        defineField({
          name: 'image',
          title: 'Image (WEBP / PNG)',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
      ],
    }),
  ],
})
