'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

const rows = [
  { label: 'USD Pricing (Global Clients)', beveez: true, others: false },
  { label: 'International Payments Enabled', beveez: true, others: 'partial' },
  { label: 'Clear Scope & Deliverables', beveez: true, others: false },
  { label: 'Direct Developer Access', beveez: true, others: false },
  { label: 'No Long-Term Lock-in', beveez: true, others: false },
  { label: 'Performance & SEO Focus', beveez: true, others: 'partial' },
]


export default function PricingComparison() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[120px] bg-white">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[900px] px-6"
      >
        <motion.h2
          variants={fadeUp}
          className="text-[40px] md:text-[56px] font-heading font-bold text-darkBlue text-center"
        >
          Why Clients Choose Beveez Tech
        </motion.h2>

        <div className="mt-12 overflow-hidden rounded-3xl border border-darkBlue/10">
          <div className="grid grid-cols-3 bg-gray-50 px-6 py-4 text-sm font-semibold text-darkBlue">
            <div />
            <div className="text-center">Beveez Tech</div>
            <div className="text-center">Typical Agencies</div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="grid grid-cols-3 items-center px-6 py-4 border-t border-darkBlue/10"
            >
              <div className="text-darkBlue">{row.label}</div>

              <div className="text-center text-orange font-semibold">✓</div>

              <div className="text-center text-gray-400">
                {row.others === 'partial' ? '◐' : '✕'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
