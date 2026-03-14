import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'client',
      title: 'Client / Project Name',
      type: 'string'
    }),

    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string'
    }),

    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string'
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image'
    }),

    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    defineField({
      name: 'solution',
      title: 'Solution',
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