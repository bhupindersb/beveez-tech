'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

import WhoWeWorkWithAbout from '@/components/WhoWeWorkWithAbout'
import OurApproach from '@/components/OurApproach'
import { fadeUp, staggerContainer } from '@/lib/motion'
import WhyChooseUs from '@/components/WhyChooseUsAbout'

/* ================= TYPES ================= */

interface AboutValueItem {
  title: string
  description: string
  icon?: { asset?: { url?: string } }
}

interface AboutHero {
  headline: string
  subText?: string
  ctaText?: string
  ctaUrl?: string
  backgroundImage?: { asset?: { url?: string } }
}

interface WhoWeWorkWithAudience {
  title: string
  description: string
  icon?: { asset?: { url?: string } }
}

interface WhoWeWorkWithData {
  headline: string
  description?: string
  sideNote?: string
  footerText?: string
  audiences: WhoWeWorkWithAudience[]
}

interface OurApproachStep {
  number?: number
  title: string
  description?: string
}

interface OurApproachData {
  heading: string
  subText?: string
  steps?: OurApproachStep[]
  visual?: {
    backgroundImage?: { asset?: { url?: string } }
    mainImage?: { asset?: { url?: string } }
    subText?: string
  }
}

interface WhyChooseUsAboutData {
  heading: string
  points: string[]
  description?: string
  testimonial?: {
    quote?: string
    author?: string
  }
}

interface AboutPageData {
  aboutHero?: AboutHero
  values?: AboutValueItem[]
  whoWeWorkWith?: WhoWeWorkWithData
  ourApproach?: OurApproachData
  whyChooseUsAbout?: WhyChooseUsAboutData
}

/* ================= PAGE ================= */

export default function AboutClient({ data }: { data: AboutPageData }) {
  const reduceMotion = useReducedMotion()

  if (!data?.aboutHero) {
    return (
      <div className="py-32 text-center text-gray-500">
        About page content not found.
      </div>
    )
  }

  const hero = data.aboutHero
  const whoWeWorkWith = data.whoWeWorkWith
  const ourApproach = data.ourApproach

  const hasApproach =
    !!ourApproach &&
    Array.isArray(ourApproach.steps) &&
    ourApproach.steps.length > 0

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">

        {/* Background Image */}
        {hero.backgroundImage?.asset?.url && (
          <Image
            src={hero.backgroundImage.asset.url}
            alt="About background"
            fill
            className="object-contain"
            priority
          />
        )}

        {/* Orange Gradient Glow */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute inset-x-0 bottom-0 h-[40%]
                     bg-gradient-to-t from-[#f28f23]/50 to-transparent"
        />

        {/* Blue Glow */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: [0.45, 0.6, 0.45], scale: [1, 1.05, 1] }}
          transition={{ duration: 16, repeat: Infinity }}
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
          viewport={{ once: true, margin: '-120px' }}
          className="relative z-30 mx-auto max-w-[1280px]
                     px-6 pt-[180px] pb-[140px] text-center"
        >
          <motion.h1
            variants={reduceMotion ? undefined : fadeUp}
            className="font-heading font-bold text-darkBlue leading-tight text-[30px] sm:text-[40px] md:text-[64px] lg:text-[72px] relative"
          >
            {hero.headline}
          </motion.h1>

          {hero.subText && (
            <motion.p
              variants={reduceMotion ? undefined : fadeUp}
              className="mt-8 md:mt-12 text-lg
                         text-darkBlue md:max-w-[640px] mx-auto"
            >
              {hero.subText}
            </motion.p>
          )}

          {hero.ctaText && hero.ctaUrl && (
            <motion.a
              variants={reduceMotion ? undefined : fadeUp}
              href={hero.ctaUrl}
              className="inline-block mt-10 rounded-full
                         bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                         px-12 py-6 text-white font-semibold"
            >
              {hero.ctaText}
            </motion.a>
          )}

          {/* ================= VALUE BOXES ================= */}
          {data.values && data.values.length > 0 && (
            <motion.div
                variants={reduceMotion ? undefined : staggerContainer(0.12)}
                className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8"
            >
                {data.values.map((item, i) => {
                const offset =
                    i === 1 || i === 2 ? 'md:mt-[80px]' : 'md:mt-0'

                return (
                    <motion.div
                    key={i}
                    variants={reduceMotion ? undefined : fadeUp}
                    className={`rounded-3xl bg-white p-8 text-left
                                shadow-md ${offset}`}
                    >
                    {item.icon?.asset?.url && (
                        <Image
                        src={item.icon.asset.url}
                        alt={item.title}
                        width={120}
                        height={120}
                        className="mx-auto"
                        />
                    )}

                    <h3 className="mt-6 text-xl font-semibold text-darkBlue">
                        {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-gray-600">
                        {item.description}
                    </p>
                    </motion.div>
                )
                })}
            </motion.div>
            )}

        </motion.div>
      </section>

      {/* ================= WHO WE WORK WITH ================= */}
      
        {whoWeWorkWith && whoWeWorkWith.audiences.length > 0 && (
            <WhoWeWorkWithAbout data={whoWeWorkWith} />
        )}

        {/* ================= OUR APPROACH ================= */}
        {hasApproach && <OurApproach data={ourApproach!} />}

        {data.whyChooseUsAbout && (
            <WhyChooseUs data={data.whyChooseUsAbout} />
        )}

    </>
  )
}




