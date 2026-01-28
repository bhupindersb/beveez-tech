'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import RemoteLottie from '@/components/RemoteLottie'
import { fadeUp, staggerContainer } from '@/lib/motion'

/* ================= TYPES ================= */

interface HeroIcon {
  label: string
  description?: string
  icon?: {
    asset?: {
      url?: string
    }
  }
}

interface ServicesHeroData {
  headline: string
  subText?: string
  backgroundImage?: {
    asset?: { url?: string }
  }
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
}

interface Props {
  hero: ServicesHeroData
  heroIcons?: HeroIcon[]
}

/* ================= COMPONENT ================= */

export default function ServicesHero({ hero, heroIcons }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      {hero.backgroundImage?.asset?.url && (
        <Image
          src={hero.backgroundImage.asset.url}
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

      {/* Content */}
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
          className="font-heading font-bold text-darkBlue leading-tight text-[30px] sm:text-[40px] md:text-[64px] lg:text-[72px]"
        >
          {hero.headline}
        </motion.h1>

        {hero.subText && (
          <motion.p
            variants={fadeUp}
            className="mt-8 md:mt-12 text-lg text-darkBlue md:max-w-[640px] mx-auto"
          >
            {hero.subText}
          </motion.p>
        )}

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
          {hero.primaryCtaText && hero.primaryCtaUrl && (
            <a
              href={hero.primaryCtaUrl}
              className="rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-12 py-6 text-white font-semibold text-center transition-all hover:from-[#f68f1e] hover:to-[#cf5a20]"
            >
              {hero.primaryCtaText}
            </a>
          )}

          {hero.secondaryCtaText && hero.secondaryCtaUrl && (
            <a
              href={hero.secondaryCtaUrl}
              className="rounded-full border-2 border-darkBlue px-12 py-6 text-darkBlue font-semibold text-center hover:bg-darkBlue hover:text-white transition-all"
            >
              {hero.secondaryCtaText}
            </a>
          )}
        </div>

        {/* HERO ICONS */}
        {heroIcons && heroIcons.length > 0 && (
          <motion.div
            variants={staggerContainer(0.15)}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {heroIcons.map((icon, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                {icon.icon?.asset?.url && (
                  <RemoteLottie src={icon.icon.asset.url} size={96} />
                )}

                <p className="mt-4 text-xl text-orange font-heading">
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
        )}
      </motion.div>
    </section>
  )
}
