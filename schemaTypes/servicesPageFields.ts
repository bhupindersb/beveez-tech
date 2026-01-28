import { defineField } from 'sanity'

export const servicesPageFields = [
  /* ================= HERO ================= */
  defineField({
    name: 'hero',
    title: 'Services Hero',
    type: 'object',
    fields: [
      { name: 'headline', type: 'string', validation: Rule => Rule.required() },
      { name: 'subText', type: 'text' },

      { name: 'primaryCtaText', type: 'string' },
      { name: 'primaryCtaUrl', type: 'string' },

      { name: 'secondaryCtaText', type: 'string' },
      { name: 'secondaryCtaUrl', type: 'string' },

      {
        name: 'backgroundImage',
        type: 'image',
        options: { hotspot: true },
      },
    ],
  }),

  /* ================= HERO ICONS ================= */
  defineField({
    name: 'heroIcons',
    title: 'Hero Service Icons',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'description', type: 'string', title: 'Short Description' },
        {
          name: 'icon',
          title: 'Lottie JSON',
          type: 'file',
          options: { accept: '.json' },
        },
      ],
    }],
  }),

  /* ================= SERVICE DETAILS ================= */
  defineField({
    name: 'serviceDetails',
    title: 'Service Sections',
    type: 'array',
    of: [{ type: 'serviceDetail' }],
    validation: Rule => Rule.min(1),
  }),
]
