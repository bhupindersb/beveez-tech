import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'string'
    }),

    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string'
    }),

    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string'
    }),

    defineField({
      name: 'challenge',
      title: 'Challenges',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    defineField({
      name: 'solution',
      title: 'Solutions',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    defineField({
      name: 'performanceScore',
      title: 'Performance Score',
      type: 'number'
    }),

    defineField({
      name: 'seoScore',
      title: 'SEO Score',
      type: 'number'
    }),

    defineField({
      name: 'coreVitals',
      title: 'Core Web Vitals',
      type: 'string'
    }),

    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }]
    }),

  ],
})