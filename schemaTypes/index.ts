import { page } from './page'
import { siteSettings } from './siteSettings'
import { footerSettings } from './footerSettings'

// Homepage / Sections
import { trustSection } from './trust'
import { servicesSection } from './servicesSection'
import { service } from './services'
import { whyChooseUs } from './whyChooseUs'
import { whoWeWorkWithSection } from './whoWeWorkWith'
import { pricingSection } from './pricingSection'
import { pricingPlan } from './pricingPlan'
import { ctaSection } from './ctaSection'
import { blogSection } from './blog'

// Blog system
import { postType } from './postType'
import { author } from './author'
import { categoryType } from './categoryType'
import { blockContentType } from './blockContentType'
import { ourApproach } from './ourApproach'
import { whyChooseUsAbout } from './whyChooseUsAbout'
import { ourApproachStep } from './ourApproachStep'

import { serviceDetail } from './serviceDetails'

import { pricingAddon } from './pricingAddon'
import { pricingFaq } from './pricingFaq'
import { servicePage } from './servicePage'
import { category } from './category'


export const schemaTypes = [
  siteSettings,
  footerSettings,

  page,
  ourApproach,
  ourApproachStep,
  whyChooseUsAbout,

  /* =====================
     HOMEPAGE / SECTIONS
  ===================== */

  trustSection,
  servicesSection,
  service,
  whyChooseUs,
  whoWeWorkWithSection,
  pricingSection,
  pricingPlan,
  ctaSection,
  blogSection,

  postType,
  author,
  categoryType,
  blockContentType,

  serviceDetail,

  pricingAddon,
  pricingFaq,
  servicePage,
]
