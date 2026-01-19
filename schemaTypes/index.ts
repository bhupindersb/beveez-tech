import { page } from './page'
import { siteSettings } from './siteSettings'
import { footerSettings } from './footerSettings'

// Homepage / Sections
import { trustSection } from './trust'
import { servicesSection } from './servicesSection'
import { service } from './services'
import { whyChooseUs } from './whyChooseUs'
import { whoWeWorkWith } from './whoWeWorkWith'
import { pricingSection } from './pricingSection'
import { pricingPlan } from './pricingPlan'
import { ctaSection } from './ctaSection'
import { blogSection } from './blog'

// Blog system
import { postType } from './postType'
import { authorType } from './authorType'
import { categoryType } from './categoryType'
import { blockContentType } from './blockContentType'

export const schemaTypes = [
  // Global
  siteSettings,
  footerSettings,

  // Pages
  page,

  // Homepage sections
  trustSection,
  servicesSection,
  service,
  whyChooseUs,
  whoWeWorkWith,
  pricingSection,
  pricingPlan,
  ctaSection,
  blogSection,

  // Blog
  postType,
  authorType,
  categoryType,
  blockContentType,
]
