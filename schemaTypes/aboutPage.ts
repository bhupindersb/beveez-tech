import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',

  fields: [
    /* ======================
       PAGE META
    ====================== */
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      initialValue: { current: 'about' },
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),

    /* ======================
       SEO
    ====================== */
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'seoTitle', title: 'SEO Title', type: 'string' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3 },
        { name: 'seoImage', title: 'SEO Image', type: 'image' },
      ],
    }),

    /* ======================
       HERO SECTION
    ====================== */
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'headline',
          title: 'Headline (H1)',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'subText',
          title: 'Sub Text',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
        },
        {
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'string',
        },
      ],
    }),

    /* ======================
       VALUE BOXES
    ====================== */
    defineField({
      name: 'values',
      title: 'Value Boxes',
      type: 'array',
      validation: Rule => Rule.max(4),
      of: [
        defineField({
          name: 'valueItem',
          title: 'Value Item',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon (SVG / PNG)',
              type: 'image',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
          ],
        }),
      ],
    }),
    defineField({
        name: 'whyChooseUs',
        title: 'Why Choose Us Section',
        type: 'whyChooseUs',
        hidden: ({ parent }) => parent?.template !== 'about',
    }),

  ],
})
