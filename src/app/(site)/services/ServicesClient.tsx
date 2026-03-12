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
  // ✅ Normalize once — no more undefined checks everywhere
  const services = data.serviceDetails ?? []

  return (
    <>
      {/* ================= SEO ================= */}
      <ServiceSEO services={services} />

      {/* ================= HERO ================= */}
      <ServicesHero
        hero={data.hero}
        heroIcons={data.heroIcons}
      />

      {/* ================= SERVICES ================= */}
      {services.map((service, i) => (
        <ServiceDetailSection
          key={i}
          data={service}
          index={i}
          total={services.length}
        />
      ))}

      {/* ================= CTA ================= */}
      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
