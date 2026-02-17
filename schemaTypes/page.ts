import { defineType, defineField } from 'sanity'
import { servicesPageFields } from './servicesPageFields'
import { pricingPageFields } from './pricingPageFields'

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

    /* =======================
       About HERO (ONLY FOR ABOUT)
    ======================= */
    defineField({
      name: 'aboutHero',
      title: 'About Page – Hero Section',
      type: 'object',
      hidden: ({ parent }) => parent?.template !== 'about',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'subText',
          title: 'Sub Text',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'string',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    defineField({
      name: 'values',
      title: 'Core Services',
      type: 'array',
      hidden: ({ parent }) => parent?.template !== 'about',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text' },
            {
              name: 'icon',
              type: 'image',
              options: { hotspot: true }
            }
          ]
        }
      ]
    }),

    /* =======================
    ABOUT – WHO WE WORK WITH
  ======================= */
  defineField({
    name: 'whoWeWorkWith',
    title: 'About Page – Who We Work With',
    type: 'object',
    hidden: ({ parent }) => parent?.template !== 'about',
    fields: [
      defineField({
        name: 'headline',
        title: 'Headline',
        type: 'string',
        validation: Rule => Rule.required(),
      }),

      defineField({
        name: 'description',
        title: 'Description (Left)',
        type: 'text',
        rows: 3,
      }),

      defineField({
        name: 'sideNote',
        title: 'Side Note (Right)',
        type: 'text',
        rows: 3,
      }),

      defineField({
        name: 'audiences',
        title: 'Audience Cards',
        type: 'array',
        validation: Rule => Rule.min(3).max(3),
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text',
              },
              {
                name: 'icon',
                title: 'Icon',
                type: 'image',
                options: { hotspot: true },
              },
            ],
          },
        ],
      }),

      defineField({
        name: 'footerText',
        title: 'Bottom Line Text',
        type: 'string',
      }),
    ],
  }),

  defineField({
    name: 'ourApproach',
    title: 'Our Approach',
    type: 'ourApproach',
    hidden: ({ parent }) => parent?.template !== 'about',
  }),

  defineField({
    name: 'whyChooseUsAbout',
    title: 'Why Choose Us',
    type: 'whyChooseUsAbout',
    hidden: ({ parent }) => parent?.template !== 'about',
  }),

  defineField({
    name: 'ctaOverride',
    title: 'CTA Section (Optional Override)',
    type: 'object',
    hidden: ({ parent }) =>
      !['about', 'services', 'pricing'].includes(parent?.template),
    fields: [
      defineField({
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'image',
        options: { hotspot: true },
      }),
      defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
      }),
      defineField({
        name: 'subText',
        title: 'Sub Text',
        type: 'text',
      }),
      defineField({
        name: 'primaryCtaText',
        title: 'Primary CTA Text',
        type: 'string',
      }),
      defineField({
        name: 'primaryCtaUrl',
        title: 'Primary CTA URL',
        type: 'string',
      }),
      defineField({
        name: 'secondaryCtaText',
        title: 'Secondary CTA Text',
        type: 'string',
      }),
      defineField({
        name: 'secondaryCtaUrl',
        title: 'Secondary CTA URL',
        type: 'string',
      }),
    ],
  }),
  /* =======================
    SERVICES PAGE
  ======================= */

  ...servicesPageFields.map(field => ({
    ...field,
    hidden: ({ parent }: { parent?: { template?: string } }) =>
    parent?.template !== 'services'

  })),

  /* =======================
    PRICING PAGE
  ======================= */

  ...pricingPageFields.map(field => ({
    ...field,
    hidden: ({ parent }: { parent?: { template?: string } }) =>
      parent?.template !== 'pricing',
  })),

  /* =======================
    CONTACT PAGE
  ======================= */

  defineField({
    name: 'contactHero',
    title: 'Contact Page – Hero Section',
    type: 'object',
    hidden: ({ parent }) => parent?.template !== 'contact',
    fields: [
      defineField({
        name: 'headline',
        title: 'Headline',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'subText',
        title: 'Sub Text',
        type: 'text',
        rows: 3,
      }),
      defineField({
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'image',
        options: { hotspot: true },
      }),
    ],
  }),

  defineField({
    name: 'contactTrustPoints',
    title: 'Contact – Trust Points',
    type: 'array',
    hidden: ({ parent }) => parent?.template !== 'contact',
    of: [{ type: 'string' }],
  }),

  defineField({
    name: 'contactTestimonial',
    title: 'Contact – Testimonial',
    type: 'object',
    hidden: ({ parent }) => parent?.template !== 'contact',
    fields: [
      { name: 'quote', type: 'text' },
      { name: 'author', type: 'string' },
    ],
  }),

  ],
})
