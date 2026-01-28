import { defineField } from 'sanity'

export const servicesPageFields = [
  /* ================= HERO ================= */

  defineField({
    name: 'hero',
    title: 'Services Hero',
    type: 'object',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'string',
        validation: Rule => Rule.required(),
      },
      {
        name: 'subText',
        title: 'Sub Text',
        type: 'text',
        rows: 3,
      },
      {
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'image',
        options: { hotspot: true },
      },
    ],
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
