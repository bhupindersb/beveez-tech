import { defineType, defineField } from 'sanity'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),

    /* ================= SEO ================= */

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'seoTitle', type: 'string' },
        { name: 'seoDescription', type: 'text' },
      ],
    }),

    /* ================= HERO ================= */

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

    /* ================= PROBLEM ================= */

    defineField({
      name: 'problem',
      title: 'Problem Section',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'content', type: 'text' },
      ],
    }),

    /* ================= WHAT WE DO ================= */

    defineField({
      name: 'whatWeDo',
      title: 'What We Do',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    /* ================= PROCESS ================= */

    defineField({
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    /* ================= DELIVERABLES ================= */

    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    /* ================= FAQ ================= */

    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string' },
            { name: 'answer', type: 'text' },
          ],
        },
      ],
    }),

    /* ================= CTA ================= */

    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'subText', type: 'text' },
        { name: 'buttonText', type: 'string' },
        { name: 'buttonUrl', type: 'string' },
      ],
    }),

  ],
})
