'use client'

import PricingHero from './PricingHero'
import PricingPlans from '@/components/PricingPlans'
import CTASection from '@/components/CtaSection'

interface Props {
  data: any
  siteSettings: any
}

export default function PricingClient({ data, siteSettings }: Props) {
  return (
    <>
      {/* HERO */}
      <PricingHero
        headline={data.pricingHero.headline}
        subText={data.pricingHero.subText}
      />

      {/* PLANS */}
      {data.pricingPlans?.length > 0 && (
        <PricingPlans plans={data.pricingPlans} />
      )}

      {/* CTA */}
      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
