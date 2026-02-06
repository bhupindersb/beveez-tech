'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function PricingHowItWorks({
  steps,
}: {
  steps: string[]
}) {
  if (!steps || steps.length === 0) return null

  return (
    <section className="py-[120px] bg-gray-50">
      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[1000px] px-6"
      >
        <motion.h2
          variants={fadeUp}
          className="text-[48px] md:text-[64px] font-heading font-bold text-darkBlue text-center mb-16"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white font-bold">
                {i + 1}
              </div>
              <p className="text-darkBlue font-medium">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
