import { defineType, defineField } from 'sanity'

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object', // ✅ CHANGED from document → object
  fields: [
    defineField({
      name: 'title',
      title: 'Plan Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Example: $999 / Starting at $1,499 / $199/mo',
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'string',
      description: 'Example: Startups, SaaS founders, Enterprises',
    }),

    defineField({
      name: 'features',
      title: 'Included Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Get Started',
    }),

    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'string',
    }),

    defineField({
      name: 'highlighted',
      title: 'Highlight this plan',
      type: 'boolean',
      description: 'Use for "Most Popular" or recommended plan',
      initialValue: false,
    }),
  ],
})
