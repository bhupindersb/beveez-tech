import { defineType, defineField } from 'sanity'

export const pricingAddon = defineType({
  name: 'pricingAddon',
  title: 'Pricing Add-on',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Add-on Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
})
