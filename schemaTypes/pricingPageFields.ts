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
      defineField({
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'image',
        options: { hotspot: true },
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
    of: [
        {
        type: 'object',
        fields: [
            {
            name: 'title',
            title: 'Step Title',
            type: 'string',
            validation: Rule => Rule.required(),
            },
            {
            name: 'description',
            title: 'Step Description',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.required(),
            },
        ],
        },
    ],
    validation: Rule => Rule.min(3).max(3),
  }),


  /* ================= FAQ ================= */

  defineField({
    name: 'pricingFaqs',
    title: 'FAQs',
    type: 'array',
    of: [{ type: 'pricingFaq' }],
  }),
]
