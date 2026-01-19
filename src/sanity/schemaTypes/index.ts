import { type SchemaTypeDefinition } from 'sanity'

// BLOG
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'

// SITE
import { page } from './page'
import { siteSettings } from './siteSettings'
import { footerSettings } from './footerSettings'

// HOMEPAGE SECTIONS
import { trustSection } from './trustSection'
import { servicesSection } from './servicesSection'
import { whyChooseUs } from './whyChooseUs'
import { whoWeWorkWith } from './whoWeWorkWith'
import { pricingSection } from './pricingSection'
import { ctaSection } from './ctaSection'
import { blogSection } from './blogSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // GLOBAL
    siteSettings,
    footerSettings,

    // PAGES
    page,

    // HOMEPAGE SECTIONS
    trustSection,
    servicesSection,
    whyChooseUs,
    whoWeWorkWith,
    pricingSection,
    ctaSection,
    blogSection,

    // BLOG
    blockContentType,
    categoryType,
    postType,
    authorType,
  ],
}
