'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

const items = [
  {
    title: 'Secure International Payments',
    text: 'Payments processed securely via Razorpay with international card support',
  },
  {
    title: 'USD Pricing Transparency',
    text: 'You see prices in USD — no hidden conversions or surprises',
  },
  {
    title: 'Trusted by Global Clients',
    text: 'Used by startups and businesses across multiple countries',
  },
  {
    title: 'Invoice & Payment Records',
    text: 'Clear invoices and payment confirmations for every transaction',
  },
]


export default function PricingTrust() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[120px] bg-gray-50">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[1100px] px-6 grid grid-cols-1 md:grid-cols-4 gap-10"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-3xl bg-white p-8 text-center shadow-sm"
          >
            <h3 className="text-lg font-semibold text-darkBlue">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-darkBlue/70">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
