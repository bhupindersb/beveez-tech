'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface Step {
  title: string
  description: string
}

interface Props {
  steps: Step[]
}

export default function PricingHowItWorks({ steps }: Props) {
  const reduceMotion = useReducedMotion()

  if (!steps || steps.length === 0) return null

  return (
    <section className="py-[80px] md:py-[120px] bg-white">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[1000px] px-6 text-center"
      >
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-[40px] md:text-[56px]
                     font-heading font-bold text-darkBlue"
        >
          How It Works
        </motion.h2>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-3xl border border-darkBlue/10
                         p-8 md:p-10 bg-white shadow-sm"
            >
              {/* Step Number */}
              <div
                className="mx-auto mb-6 flex h-12 w-12 items-center
                           justify-center rounded-full bg-orange
                           text-white font-semibold text-lg"
              >
                {i + 1}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-darkBlue">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-darkBlue/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Micro-copy */}
        <motion.p
          variants={fadeUp}
          className="mt-14 text-sm text-darkBlue/60"
        >
          No long-term contracts • Clear pricing • Human communication
        </motion.p>
      </motion.div>
    </section>
  )
}
