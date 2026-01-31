'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import RemoteLottie from '@/components/RemoteLottie'
import { fadeUp, staggerContainer } from '@/lib/motion'

/* ================= HELPERS ================= */

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/* ================= TYPES ================= */

interface HeroIcon {
  label: string
  description?: string
  icon?: {
    asset?: { url?: string }
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
  const icons = heroIcons ?? []

  return (
    <section className="relative overflow-hidden">
      {hero.backgroundImage?.asset?.url && (
        <Image
          src={hero.backgroundImage.asset.url}
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
        <motion.h1
          variants={fadeUp}
          className="font-heading font-bold text-darkBlue
                     text-[36px] sm:text-[48px]
                     md:text-[64px] lg:text-[72px]"
        >
          {hero.headline}
        </motion.h1>

        {hero.subText && (
          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg text-darkBlue/90
                       max-w-[680px] mx-auto"
          >
            {hero.subText}
          </motion.p>
        )}

        {/* HERO ICON LINKS */}
        {icons.length > 0 && (
          <motion.div
            variants={staggerContainer(0.15)}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {icons.map((icon, i) => {
              const anchor = slugify(icon.label)

              return (
                <motion.a
                  key={i}
                  variants={fadeUp}
                  href={`#${anchor}`}
                  className="flex flex-col items-center text-center group"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      ;(window as any).gtag('event', 'service_anchor_click', {
                        event_category: 'Services',
                        event_label: icon.label,
                        value: anchor,
                      })
                    }
                  }}
                >
                  {icon.icon?.asset?.url && (
                    <RemoteLottie
                      src={icon.icon.asset.url}
                      size={96}
                    />
                  )}

                  <p className="mt-4 font-semibold text-darkBlue
                                group-hover:text-orange transition">
                    {icon.label}
                  </p>

                  {icon.description && (
                    <p className="mt-1 text-sm text-darkBlue/70">
                      {icon.description}
                    </p>
                  )}
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
