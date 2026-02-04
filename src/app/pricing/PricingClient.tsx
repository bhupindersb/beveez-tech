'use client'

import PricingHero from './PricingHero'
import PricingPlans from '@/components/PricingPlans'
import PricingAddons from '@/components/PricingAddons'
import PricingFaqs from '@/components/PricingFaqs'
import CTASection from '@/components/CtaSection'

export default function PricingClient({ data, siteSettings }: any) {
  return (
    <>
      <PricingHero
        headline={data.pricingHero.headline}
        subText={data.pricingHero.subText}
      />

      <PricingPlans plans={data.pricingPlans ?? []} />

      <PricingAddons addons={data.pricingAddons ?? []} />

      <PricingFaqs faqs={data.pricingFaqs ?? []} />

      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
