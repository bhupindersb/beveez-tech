import { defineType, defineField } from 'sanity'

export const whyChooseUsAbout = defineType({
  name: 'whyChooseUsAbout',
  title: 'Why Choose Us About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'points',
      title: 'Key Points',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.min(1),
    }),

    defineField({
      name: 'description',
      title: 'Supporting Text',
      type: 'text',
    }),

    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
        }),
        defineField({
          name: 'author',
          title: 'Author Name',
          type: 'string',
        }),
      ],
    }),
  ],
})
