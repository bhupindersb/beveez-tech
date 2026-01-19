import { defineType, defineField } from 'sanity'

export const whyChooseUs = defineType({
  name: 'whyChooseUs',
  title: 'Why Choose Us',
  type: 'document',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'content', type: 'text' }),
  ],
})
