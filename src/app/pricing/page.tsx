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

  console.log('PRICING PAGE DATA:', data)


  // 🚨 HARD GUARDS — REQUIRED FOR STATIC BUILDS
  if (
    !data ||
    !data.pricingHero ||
    !data.pricingHero.headline
  ) {
    return (
      <div className="py-[200px] text-center text-gray-500">
        Pricing page content not found.
      </div>
    )
  }

  return (
    <>
      {/* HERO */}
      <PricingHero hero={data.pricingHero} />

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
