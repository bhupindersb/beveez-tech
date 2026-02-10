import { defineType, defineField } from 'sanity'

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Plan Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Example: ₹49,999 or $999 / mo',
    }),

    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'string',
      description: 'Short qualifier (e.g. Startups, Agencies)',
    }),

    defineField({
      name: 'features',
      title: 'What’s Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'highlighted',
      title: 'Highlight Plan',
      type: 'boolean',
      description: 'Visually emphasize this plan',
      initialValue: false,
    }),

    /* ================= PAYMENT ================= */

    defineField({
      name: 'paymentProvider',
      title: 'Payment Provider',
      type: 'string',
      options: {
        list: [
          { title: 'Stripe', value: 'stripe' },
          { title: 'Razorpay', value: 'razorpay' },
          { title: 'Paddle', value: 'paddle' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'paymentLink',
      title: 'Payment Link',
      type: 'url',
      description: 'Hosted checkout URL',
    }),

    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
    }),

    /* ================= ORDER ================= */

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'planType',
      title: 'Plan Type (System)',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Starter Website', value: 'starter' },
          { title: 'Growth Website', value: 'growth' },
          { title: 'Performance & Scale', value: 'performance' },
          { title: 'Custom Project', value: 'custom' },
        ],
        layout: 'radio',
      },
    }),

  ],

  orderings: [
    {
      title: 'Order Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
