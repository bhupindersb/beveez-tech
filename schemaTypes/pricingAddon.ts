import { defineType, defineField } from 'sanity'

export const pricingAddon = defineType({
  name: 'pricingAddon',
  title: 'Pricing Add-on',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Add-on Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Example: $199, $49/mo',
    }),

    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Add to Plan',
    }),

    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'string',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
