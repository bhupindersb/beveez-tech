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
        Pricing page hero not configured in Sanity.
      </div>
    )
  }

  return (
    <>
      {/* SEO */}
      <ServiceSEO services={data.pricingPlans ?? []} />

      {/* HERO */}
      {data?.pricingHero?.headline && (
        <PricingHero
            hero={data.pricingHero}
        />
      )}

      {/* PLANS */}
      {data.pricingPlans?.length > 0 && (
        <PricingPlans plans={data.pricingPlans} />
      )}

      {/* ADDONS */}
      {data.pricingAddons?.length > 0 && (
        <PricingAddons addons={data.pricingAddons} />
      )}

      {/* FAQ */}
      {data.pricingFaqs?.length > 0 && (
        <PricingFaqs faqs={data.pricingFaqs} />
      )}

      {/* CTA */}
      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
