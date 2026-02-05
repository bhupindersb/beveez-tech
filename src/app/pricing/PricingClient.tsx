'use client'

import PricingHero from './PricingHero'
import PricingPlans from '@/components/PricingPlans'
import PricingAddons from '@/components/PricingAddons'
import PricingFaqs from '@/components/PricingFaqs'
import CTASection from '@/components/CtaSection'
import ServiceSEO from '@/components/ServiceSEO'

interface PricingClientProps {
  data: any
  siteSettings: any
}

export default function PricingClient({
  data,
  siteSettings,
}: PricingClientProps) {
  if (!data?.pricingHero) {
    return (
      <div className="py-32 text-center text-gray-500">
        Pricing page content not found.
      </div>
    )
  }

  return (
    <>
      {/* SEO */}
      <ServiceSEO services={data.pricingPlans ?? []} />

      {/* HERO */}
      <PricingHero hero={data.pricingHero} />

      {/* PRICING PLANS */}
      <PricingPlans plans={data.pricingPlans ?? []} />

      {/* ADD-ONS */}
      <PricingAddons addons={data.pricingAddons ?? []} />

      {/* FAQ */}
      <PricingFaqs faqs={data.pricingFaqs ?? []} />

      {/* CTA */}
      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
