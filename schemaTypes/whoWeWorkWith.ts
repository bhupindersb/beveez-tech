import { defineType, defineField } from 'sanity'

export const whoWeWorkWith = defineType({
  name: 'whoWeWorkWith',
  title: 'Who We Work With',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'intro',
      title: 'Intro Line',
      type: 'string',
      description: 'Example: We’re a good fit if you:',
    }),

    defineField({
      name: 'points',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'closingNote',
      title: 'Closing Note',
      type: 'string',
    }),

    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
    }),

    defineField({
      name: 'testimonialAuthor',
      title: 'Testimonial Author',
      type: 'string',
    }),
  ],
})
