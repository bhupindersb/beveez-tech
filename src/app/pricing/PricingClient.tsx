'use client'

import PricingHero from './PricingHero'
import PricingPlans from '@/components/PricingPlans'
import PricingAddons from '@/components/PricingAddons'
import PricingFaqs from '@/components/PricingFaqs'
import PricingSEO from '@/components/PricingSEO'
import CTASection from '@/components/CtaSection'
import PricingComparison from '@/components/PricingComparison'
import PricingTrust from '@/components/PricingTrust'
import PricingFit from '@/components/PricingFit'


export default function PricingClient({ data, siteSettings }: any) {
  return (
    <>
      {/* SEO */}
      <PricingSEO
        plans={data.pricingPlans ?? []}
        faqs={data.pricingFaqs ?? []}
      />

      {/* HERO */}
      <PricingHero
        headline={data.pricingHero.headline}
        subText={data.pricingHero.subText}
      />

      {/* PLANS */}
      <PricingPlans plans={data.pricingPlans ?? []} />

      <PricingComparison />
      <PricingTrust />
      <PricingFit />

      {/* ADD-ONS */}
      <PricingAddons addons={data.pricingAddons ?? []} />

      {/* FAQ */}
      <PricingFaqs faqs={data.pricingFaqs ?? []} />

      {/* CTA */}
      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
