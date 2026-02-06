import { getPricingPage } from '@/sanity/lib/getPricingPage'
import { getSiteSettings } from '@/sanity/lib/getSiteSettings'

import PricingHero from './PricingHero'
import PricingHowItWorks from '@/components/PricingHowItWorks'
import PricingPlans from '@/components/PricingPlans'
import PricingComparison from '@/components/PricingComparison'
import PricingTrust from '@/components/PricingTrust'
import PricingGuarantee from '@/components/PricingGuarantee'
import PricingAddons from '@/components/PricingAddons'
import PricingFaqs from '@/components/PricingFaqs'
import CTASection from '@/components/CtaSection'

export const revalidate = 30

export default async function PricingPage() {
  const [data, siteSettings] = await Promise.all([
    getPricingPage(),
    getSiteSettings(),
  ])

  console.log('PRICING PAGE DATA:', data)


  // 🚨 HARD GUARDS — REQUIRED FOR STATIC BUILDS
  if (!data) {
    return (
      <div className="py-[200px] text-center text-red-500">
        Pricing page document not found in Sanity.
      </div>
    )
  }

  if (!data.pricingHero) {
    return (
      <div className="py-[200px] text-center text-orange-500">
        Pricing Hero is missing.
      </div>
    )
  }

  if (!data.pricingHero.headline) {
    return (
      <div className="py-[200px] text-center text-yellow-500">
        Pricing Hero headline is empty.
      </div>
    )
  }

  return (
    <>
      {/* HERO */}
      <PricingHero hero={data.pricingHero} />

      <pre className="mx-auto max-w-[900px] p-6 text-xs bg-gray-100 overflow-auto">
        {JSON.stringify(data.howItWorks, null, 2)}
      </pre>

      {data.howItWorks?.length > 0 && (
        <PricingHowItWorks steps={data.howItWorks} />
      )}


      {/* PLANS */}
      {data.pricingPlans?.length > 0 && (
        <PricingPlans plans={data.pricingPlans} />
      )}

      {/* COMPARISON */}
      {data.pricingPlans?.length > 0 && (
        <PricingComparison plans={data.pricingPlans} />
      )}

      {/* TRUST */}
      <PricingTrust />

      {/* GUARANTEE */}
      <PricingGuarantee />

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
