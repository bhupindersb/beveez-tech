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
    <section className="pt-[180px] pb-[120px] text-center">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer()}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-[960px] px-6"
      >
        <motion.h1
          variants={fadeUp}
          className="font-heading text-[36px] sm:text-[48px] md:text-[64px]
                     font-bold text-darkBlue"
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
