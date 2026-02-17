import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string' },
        { name: 'metaDescription', type: 'text' },
      ],
    }),

    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'headline', type: 'string' },
        { name: 'subText', type: 'text' },
        {
          name: 'backgroundImage',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),

    defineField({
      name: 'trustPoints',
      title: 'Trust Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text' },
        { name: 'author', type: 'string' },
      ],
    }),
  ],
})
