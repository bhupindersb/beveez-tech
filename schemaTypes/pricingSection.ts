import { defineType, defineField } from 'sanity'

export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Our Packages',
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Right Column Description',
      type: 'text',
    }),
  ],
})
