'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface Props {
  hero: {
    headline: string
    subText?: string
    backgroundImage?: {
      asset?: { url?: string }
    }
  }
}

export default function PricingHero({ hero }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      {hero.backgroundImage?.asset?.url && (
        <Image
          src={hero.backgroundImage.asset.url}
          alt=""
          fill
          priority
          className="object-cover"
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
        animate="visible"
        className="relative z-10 mx-auto max-w-[960px]
                   px-6 pt-[200px] pb-[140px] text-center"
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
            className="mt-8 text-lg text-darkBlue/90"
          >
            {hero.subText}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
