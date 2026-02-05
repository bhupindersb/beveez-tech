import { defineType, defineField } from 'sanity'

export const pricingAddon = defineType({
  name: 'pricingAddon',
  title: 'Pricing Add-on',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Addon Title',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
    }),
  ],
})
