'use client'

import { useState, useMemo } from 'react'
import PricingHowItWorks from '@/components/PricingHowItWorks'
import PricingPlans from '@/components/PricingPlans'
import PricingComparison from '@/components/PricingComparison'
import PricingTrust from '@/components/PricingTrust'
import PricingGuarantee from '@/components/PricingGuarantee'
import PricingAddons from '@/components/PricingAddons'
import PricingFaqs from '@/components/PricingFaqs'
import CTASection from '@/components/CtaSection'
import PricingHero from './PricingHero'

interface Props {
  data: any
  siteSettings: any
}

export default function PricingClient({ data, siteSettings }: Props) {
  const [billing, setBilling] =
    useState<'one-time' | 'monthly'>('one-time')

  // ✅ NORMALIZE PLANS HERE (CRITICAL)
  const plans = useMemo(() => {
    return (data.pricingPlans ?? []).map((plan: any) => ({
      ...plan,
      features: Array.isArray(plan.features) ? plan.features : [],
    }))
  }, [data.pricingPlans])

  return (
    <>
      <PricingHero hero={data.pricingHero} />

      {data.howItWorks?.length > 0 && (
        <PricingHowItWorks steps={data.howItWorks} />
      )}

      {plans.length > 0 && (
        <PricingPlans
          plans={plans}
          billing={billing}
        />
      )}

      {plans.length > 0 && (
        <PricingComparison plans={plans} />
      )}

      <PricingTrust />
      <PricingGuarantee />

      {data.pricingAddons?.length > 0 && (
        <PricingAddons addons={data.pricingAddons} />
      )}

      {data.pricingFaqs?.length > 0 && (
        <PricingFaqs faqs={data.pricingFaqs} />
      )}

      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
