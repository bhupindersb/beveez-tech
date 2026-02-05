import { getPricingPage } from '@/sanity/lib/getPricingPage'
import { getSiteSettings } from '@/sanity/lib/getSiteSettings'

import PricingHero from './PricingHero'
import PricingPlans from '@/components/PricingPlans'
import PricingAddons from '@/components/PricingAddons'
import PricingFaqs from '@/components/PricingFaqs'
import CTASection from '@/components/CtaSection'

export default async function PricingPage() {
  const [data, siteSettings] = await Promise.all([
    getPricingPage(),
    getSiteSettings(),
  ])

  if (!data) {
    return <div className="py-32 text-center">Pricing not found</div>
  }

  return (
    <>
      <PricingHero hero={data.pricingHero} />

      <PricingPlans plans={data.pricingPlans} />

      <PricingAddons addons={data.pricingAddons} />

      <PricingFaqs faqs={data.pricingFaqs} />

      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
