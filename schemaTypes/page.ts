import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',

  fields: [
    /* =======================
       BASIC PAGE INFO
    ======================= */
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
       PAGE TEMPLATE SELECTOR
    ======================= */
    defineField({
      name: 'template',
      title: 'Page Template',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Services', value: 'services' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Contact', value: 'contact' },
          { title: 'Blog Index', value: 'blog' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),

    /* =======================
       SEO (ONLY ONCE – FIXED)
    ======================= */
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'seoTitle',
          title: 'SEO Title',
          type: 'string',
          description: 'Recommended: max 60 characters',
        }),
        defineField({
          name: 'seoDescription',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          description: 'Recommended: max 160 characters',
        }),
        defineField({
          name: 'seoImage',
          title: 'SEO Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    /* =======================
       HOMEPAGE HERO (ONLY FOR HOME)
    ======================= */
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      hidden: ({ parent }) => parent?.template !== 'home',
    }),

    defineField({
      name: 'heroHighlight',
      title: 'Hero Highlight Line',
      type: 'string',
      hidden: ({ parent }) => parent?.template !== 'home',
    }),

    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      hidden: ({ parent }) => parent?.template !== 'home',
    }),

    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.template !== 'home',
    }),

    defineField({
      name: 'heroHighlightImage',
      title: 'Hero Highlight Decoration Image',
      description: 'Decorative image behind gradient text',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.template !== 'home',
    }),

    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Hero Primary CTA Text',
      type: 'string',
      hidden: ({ parent }) => parent?.template !== 'home',
    }),

    defineField({
      name: 'heroPrimaryCtaUrl',
      title: 'Hero Primary CTA URL',
      type: 'string',
      hidden: ({ parent }) => parent?.template !== 'home',
    }),

    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary CTA Text',
      type: 'string',
      hidden: ({ parent }) => parent?.template !== 'home',
    }),

    defineField({
      name: 'heroSecondaryCtaUrl',
      title: 'Hero Secondary CTA URL',
      type: 'string',
      hidden: ({ parent }) => parent?.template !== 'home',
    }),
  ],
})
