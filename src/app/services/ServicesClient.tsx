'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Lottie from 'lottie-react'

import ServiceDetailSection from '@/components/ServiceDetailSection'
import CTASection from '@/components/CtaSection'
import { fadeUp, staggerContainer } from '@/lib/motion'
import ServiceSEO from '@/components/ServiceSEO'
import RemoteLottie from '@/components/RemoteLottie'


/* ================= TYPES ================= */

interface LottieVisual {
  type: 'lottie'
  lottieFile: {
    asset?: { url?: string }
  }
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
  visual: LottieVisual | ImageVisual
}

interface ServicesPageData {
  hero: {
    headline: string
    subText?: string
    backgroundImage?: { asset?: { url?: string } }
  }
  serviceDetails?: ServiceDetail[]
  ctaOverride?: any
}

interface SiteSettings {
  cta: any
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

        {/* Background Image */}
        {data.hero.backgroundImage?.asset?.url && (
          <Image
            src={data.hero.backgroundImage.asset.url}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Orange Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[40%]
                        bg-gradient-to-t from-[#f28f23]/50 to-transparent" />

        {/* Blue Glow */}
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

        {/* Hero Content */}
        <motion.div
          variants={reduceMotion ? undefined : staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-[1280px]
                     px-6 pt-[180px] pb-[140px] text-center"
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading font-bold text-darkBlue
                       text-[36px] sm:text-[48px]
                       md:text-[64px] lg:text-[72px]"
          >
            {data.hero.headline}
          </motion.h1>

          {data.hero.subText && (
            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg text-darkBlue/90
                         max-w-[680px] mx-auto"
            >
              {data.hero.subText}
            </motion.p>
          )}

          {/* HERO ICON GRID */}
          <motion.div
            variants={staggerContainer(0.15)}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {data.serviceDetails?.map((service, i) => {
              if (service.visual.type !== 'lottie') return null

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col items-center"
                >
                  <HoverLottie
                    src={service.visual.lottieFile.asset?.url}
                  />
                  <p className="mt-4 font-semibold text-darkBlue text-center">
                    {service.heading}
                  </p>
                </motion.div>
              )
            })}

          </motion.div>
        </motion.div>
      </section>

      {/* ================= SERVICE DETAILS ================= */}
      {data.serviceDetails
        ?.filter(s => s.visual.type === 'image')
        .map((service, i) => (
            <ServiceDetailSection key={i} data={service as any} />
    ))}


      {/* ================= CTA ================= */}
      <CTASection data={data.ctaOverride ?? siteSettings.cta}/>

    </>
  )
}

/* ================= LOTTIE HOVER ================= */


function HoverLottie({ src }: { src?: string }) {
  if (!src) return null

  return (
    <RemoteLottie
      src={src}
      size={96}
    />
  )
}

