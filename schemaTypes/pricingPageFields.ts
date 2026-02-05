import { defineField } from 'sanity'

export const pricingPageFields = [
  /* ================= HERO ================= */

  defineField({
    name: 'pricingHero',
    title: 'Pricing Hero',
    type: 'object',
    fields: [
      { name: 'headline', type: 'string' },
      { name: 'subText', type: 'text', rows: 3 },
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
