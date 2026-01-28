'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

import ServiceDetailSection from '@/components/ServiceDetailSection'
import CTASection from '@/components/CtaSection'
import ServiceSEO from '@/components/ServiceSEO'
import RemoteLottie from '@/components/RemoteLottie'
import { fadeUp, staggerContainer } from '@/lib/motion'

/* ================= TYPES ================= */

interface HeroIcon {
  label: string
  description?: string
  icon: {
    asset?: { url?: string }
  }
}

interface ServiceHero {
  headline: string
  subText?: string
  backgroundImage?: { asset?: { url?: string } }
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
}

interface ImageVisual {
  type: 'image'
  image: {
    asset?: { url?: string }
  }
}

interface ServiceDetail {
  heading: string
  subText?: string
  description?: string
  includes?: string[]
  ctaText?: string
  ctaUrl?: string
  accent?: string
  visual: ImageVisual
}

interface CTAData {
  heading?: string
  subText?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  backgroundImage?: { asset?: { url?: string } }
}

interface ServicesPageData {
  hero: ServiceHero
  heroIcons?: HeroIcon[]
  serviceDetails?: ServiceDetail[]
  ctaOverride?: CTAData
}

interface SiteSettings {
  cta: CTAData
}

interface Props {
  data: ServicesPageData
  siteSettings: SiteSettings
}

/* ================= PAGE ================= */

export default function ServicesClient({ data, siteSettings }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <>
      {/* ================= SEO ================= */}
      <ServiceSEO services={data.serviceDetails ?? []} />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">

        {data.hero.backgroundImage?.asset?.url && (
          <Image
            src={data.hero.backgroundImage.asset.url}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-[40%]
                        bg-gradient-to-t from-[#f28f23]/50 to-transparent" />

        <motion.div
          aria-hidden
          initial={{ opacity: 0.45 }}
          animate={{ opacity: [0.45, 0.6, 0.45] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute left-1/2 top-[45%]
                     h-[700px] w-[700px]
                     -translate-x-1/2 -translate-y-1/2
                     rounded-full bg-[#7becff]/50 blur-[250px]"
        />

        <motion.div
          variants={reduceMotion ? undefined : staggerContainer()}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-[1280px]
                     px-6 pt-[180px] pb-[140px] text-center"
        >
          <motion.h1 variants={fadeUp} className="text-[64px] font-heading font-bold text-darkBlue">
            {data.hero.headline}
          </motion.h1>

          {data.hero.subText && (
            <motion.p variants={fadeUp} className="mt-6 text-lg text-darkBlue/90">
              {data.hero.subText}
            </motion.p>
          )}

          {/* ✅ HERO CTA */}
          <motion.div variants={fadeUp} className="mt-10 flex justify-center gap-6">
            {data.hero.primaryCtaText && data.hero.primaryCtaUrl && (
              <a href={data.hero.primaryCtaUrl} className="rounded-full bg-orange px-10 py-5 text-white font-semibold">
                {data.hero.primaryCtaText}
              </a>
            )}
            {data.hero.secondaryCtaText && data.hero.secondaryCtaUrl && (
              <a href={data.hero.secondaryCtaUrl} className="rounded-full bg-white px-10 py-5 font-semibold">
                {data.hero.secondaryCtaText}
              </a>
            )}
          </motion.div>

          {/* HERO ICON GRID */}
          {data.heroIcons?.length ? (
            <motion.div
              variants={staggerContainer(0.15)}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12"
            >
              {data.heroIcons.map((icon, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center"
                >
                  <RemoteLottie
                    src={icon.icon.asset!.url!}
                    size={96}
                  />

                  <p className="mt-4 font-semibold text-darkBlue">
                    {icon.label}
                  </p>

                  {icon.description && (
                    <p className="mt-1 text-sm text-darkBlue/70">
                      {icon.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : null}

        </motion.div>
      </section>

      {data.serviceDetails?.map((s, i) => (
        <ServiceDetailSection key={i} data={s} />
      ))}

      <CTASection data={data.ctaOverride ?? siteSettings.cta} />
    </>
  )
}
