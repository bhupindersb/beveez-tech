'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

/* ================= TYPES ================= */

interface HowItWorksStep {
  title: string
  description: string
}

interface Props {
  steps: HowItWorksStep[]
}

/* ================= COMPONENT ================= */

export default function PricingHowItWorks({ steps }: Props) {
  const reduceMotion = useReducedMotion()

  if (!steps || steps.length === 0) return null

  return (
    <section className="py-[120px] bg-white">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[1280px] px-6"
      >
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          className="mb-20 text-center max-w-[720px] mx-auto"
        >
          <h2 className="text-[40px] md:text-[64px] font-heading font-bold text-darkBlue leading-tight">
            How It Works
          </h2>

          <p className="mt-6 text-lg text-darkBlue/70">
            A simple, transparent process — no surprises.
          </p>
        </motion.div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative rounded-3xl border border-darkBlue/10
                         p-10 text-center md:text-left
                         transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* STEP NUMBER */}
              <div className="mb-6 flex justify-center md:justify-start">
                <span className="flex h-12 w-12 items-center justify-center
                                 rounded-full bg-darkBlue text-white
                                 font-heading text-lg font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-heading font-semibold text-darkBlue">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-4 text-darkBlue/80 leading-relaxed">
                {step.description}
              </p>

              {/* CONNECTOR (DESKTOP ONLY) */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:block absolute top-1/2 -right-6
                             h-px w-12 bg-darkBlue/20"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
