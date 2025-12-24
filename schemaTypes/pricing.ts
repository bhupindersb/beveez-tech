import {defineType, defineField} from 'sanity'

export const pricing = defineType({
  name: 'pricing',
  title: 'Pricing Plans',
  type: 'document',
  fields: [
    defineField({
      name: 'planName',
      title: 'Plan Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'string'
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlight Plan',
      type: 'boolean',
      initialValue: false
    })
  ]
})

