import { defineType, defineField } from 'sanity'

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'subText',
      title: 'Section Sub Text',
      type: 'text',
      rows: 3,
    }),
  ],
})
