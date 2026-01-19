import { defineType, defineField } from 'sanity'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({ name: 'copyright', type: 'string' }),
  ],
})
