import { defineType, defineField } from 'sanity'

export const pricingFaq = defineType({
  name: 'pricingFaq',
  title: 'Pricing FAQ',
  type: 'object',

  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
    }),

    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
    }),
  ],
})
