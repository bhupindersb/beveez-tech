import { defineField } from 'sanity'

export const pricingPageFields = [
  /* ================= PRICING HERO ================= */

  defineField({
    name: 'pricingHero',
    title: 'Pricing Hero',
    type: 'object',
    fields: [
      defineField({
        name: 'headline',
        title: 'Headline',
        type: 'string',
        validation: Rule => Rule.required(),
      }),

      defineField({
        name: 'subText',
        title: 'Sub Text',
        type: 'text',
        rows: 3,
      }),
    ],
  }),

  /* ================= PRICING PLANS ================= */

  defineField({
    name: 'pricingPlans',
    title: 'Pricing Plans',
    type: 'array',
    of: [{ type: 'pricingPlan' }],
    validation: Rule => Rule.min(1),
  }),

  /* ================= ADD-ONS ================= */

  defineField({
    name: 'pricingAddons',
    title: 'Add-ons',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Addon Title',
            type: 'string',
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
          }),
          defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
            description: 'Example: $199 / $499 / Custom',
          }),
        ],
      },
    ],
  }),

  /* ================= FAQ ================= */

  defineField({
    name: 'pricingFaqs',
    title: 'Pricing FAQs',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
          }),
          defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 3,
          }),
        ],
      },
    ],
  }),
]
