import {defineType, defineField} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    /* =======================
       SEO (ONLY ONCE)
    ======================= */
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'seoTitle',
          title: 'SEO Title',
          type: 'string',
          description: 'Max 60 characters',
        }),
        defineField({
          name: 'seoDescription',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          description: 'Max 160 characters',
        }),
        defineField({
          name: 'seoImage',
          title: 'SEO Image',
          type: 'image',
        }),
      ],
    }),

    // HERO
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Highlight Line',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
    }),

    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroHighlightImage',
      title: 'Hero Highlight Decoration Image',
      description: 'Decorative image behind gradient text',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Hero Primary CTA Text',
      type: 'string',
    }),

    defineField({
      name: 'heroPrimaryCtaUrl',
      title: 'Hero Primary CTA URL',
      type: 'string',
    }),

    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary CTA Text',
      type: 'string',
    }),

    defineField({
      name: 'heroSecondaryCtaUrl',
      title: 'Hero Secondary CTA URL',
      type: 'string',
    }),
  ],
})
