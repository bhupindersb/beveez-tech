'use client'

import CTASection from '@/components/CtaSection'

export default function PricingClient({
  data,
  ctaOverride,
  siteSettings,
}: any) {
  return (
    <>
      {/* HERO */}
      <section className="py-[160px] text-center">
        <h1 className="text-[64px] font-heading font-bold">
          {data.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl mx-auto">
          {data.hero.subText}
        </p>
      </section>

      {/* PLANS */}
      {/* (Next step: animated pricing grid) */}

      {/* ADD-ONS */}
      {/* (Next step) */}

      {/* HOW IT WORKS */}
      {/* (Next step) */}

      {/* FAQ */}
      {/* (Next step) */}

      {/* CTA */}
      <CTASection data={ctaOverride ?? siteSettings.cta} />
    </>
  )
}
