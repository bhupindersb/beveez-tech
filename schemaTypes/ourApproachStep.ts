import { defineType, defineField } from 'sanity'

export const ourApproachStep = defineType({
  name: 'ourApproachStep',
  title: 'Approach Step',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Step Number',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
