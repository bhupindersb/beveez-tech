import { defineType, defineField } from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'buttonText', type: 'string' }),
    defineField({ name: 'buttonUrl', type: 'string' }),
  ],
})
