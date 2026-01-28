import { defineField } from 'sanity'

export const servicesPageFields = [
  /* ================= HERO ================= */

  defineField({
    name: 'hero',
    title: 'Services Hero',
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
      defineField({
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'image',
        options: { hotspot: true },
      }),

      /* ✅ ADD THESE */
      defineField({
        name: 'primaryCtaText',
        title: 'Primary CTA Text',
        type: 'string',
      }),
      defineField({
        name: 'primaryCtaUrl',
        title: 'Primary CTA URL',
        type: 'string',
      }),
      defineField({
        name: 'secondaryCtaText',
        title: 'Secondary CTA Text',
        type: 'string',
      }),
      defineField({
        name: 'secondaryCtaUrl',
        title: 'Secondary CTA URL',
        type: 'string',
      }),
    ],
  }),

  /* ================= HERO ICONS ================= */

  defineField({
    name: 'heroIcons',
    title: 'Hero Service Icons',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          { name: 'label', title: 'Title', type: 'string' },
          { name: 'description', title: 'Short Description', type: 'string' },
          {
            name: 'icon',
            title: 'Lottie JSON',
            type: 'file',
            options: { accept: '.json' },
          },
        ],
      },
    ],
  }),

  /* ================= SERVICE DETAILS ================= */

  defineField({
    name: 'serviceDetails',
    title: 'Service Sections',
    type: 'array',
    of: [{ type: 'serviceDetail' }],
  }),
]
