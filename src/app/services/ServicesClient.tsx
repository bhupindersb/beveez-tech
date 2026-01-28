'use client'

import ServiceDetailSection from '@/components/ServiceDetailSection'
import CTASection from '@/components/CtaSection'
import ServiceSEO from '@/components/ServiceSEO'
import ServicesHero from './ServicesHero'

interface ServicesPageData {
  hero: any
  heroIcons?: any[]
  serviceDetails?: any[]
  ctaOverride?: any
}

interface SiteSettings {
  cta: any
}

export default function ServicesClient({
  data,
  siteSettings,
}: {
  data: ServicesPageData
  siteSettings: SiteSettings
}) {
  return (
    <>
      {/* SEO */}
      <ServiceSEO services={data.serviceDetails ?? []} />

      {/* HERO */}
      <ServicesHero
        hero={data.hero}
        heroIcons={data.heroIcons}
      />

      {/* SERVICES */}
      {data.serviceDetails?.map((service, i) => (
        <ServiceDetailSection key={i} data={service} />
      ))}

      {/* CTA */}
      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
