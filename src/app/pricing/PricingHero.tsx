'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface Props {
  hero: {
    headline: string
    subText?: string
  }
}

export default function PricingHero({ hero }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="pt-[200px] pb-[120px] text-center">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer()}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-[900px] px-6"
      >
        <motion.h1
          variants={fadeUp}
          className="text-[40px] md:text-[72px] font-heading font-bold text-darkBlue leading-tight"
        >
          {hero.headline}
        </motion.h1>

        {hero.subText && (
          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg text-darkBlue/80"
          >
            {hero.subText}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
