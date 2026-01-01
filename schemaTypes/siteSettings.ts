import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'navCtaText',
      title: 'Navigation CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'navCtaUrl',
      title: 'Navigation CTA URL',
      type: 'string',
    }),
  ],
})
