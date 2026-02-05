import { defineField } from 'sanity'

export const pricingPageFields = [
  /* ================= HERO ================= */

  defineField({
    name: 'pricingHero',
    title: 'Pricing Page – Hero',
    type: 'object',
    hidden: ({ parent }) => parent?.template !== 'pricing',
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

  /* ================= PLANS ================= */

  defineField({
    name: 'pricingPlans',
    title: 'Pricing Plans',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'pricingPlan' }] }],
  }),

  /* ================= ADDONS ================= */

  defineField({
    name: 'pricingAddons',
    title: 'Add-ons',
    type: 'array',
    of: [{ type: 'pricingAddon' }],
  }),

  /* ================= HOW IT WORKS ================= */

  defineField({
    name: 'howItWorks',
    title: 'How It Works',
    type: 'array',
    of: [{ type: 'string' }],
  }),

  /* ================= FAQ ================= */

  defineField({
    name: 'pricingFaqs',
    title: 'FAQs',
    type: 'array',
    of: [{ type: 'pricingFaq' }],
  }),
]
