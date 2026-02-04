'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface Props {
  headline: string
  subText?: string
}

export default function PricingHero({ headline, subText }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-[160px] pb-[120px]">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer()}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-[900px] px-6 text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-heading font-bold text-darkBlue
                     text-[36px] sm:text-[48px]
                     md:text-[64px]"
        >
          {headline}
        </motion.h1>

        {subText && (
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-darkBlue/80"
          >
            {subText}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
