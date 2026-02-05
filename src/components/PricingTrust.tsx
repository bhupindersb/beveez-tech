'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function PricingTrust() {
  return (
    <section className="py-[80px] md:py-[120px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
        >
          {[
            {
              title: 'Clear Scope',
              text: 'No hidden costs. Everything documented before we start.',
            },
            {
              title: 'Performance First',
              text: 'Speed, SEO, and Core Web Vitals baked in.',
            },
            {
              title: 'Ownership',
              text: 'You fully own your code, assets, and data.',
            },
            {
              title: 'Post-Launch Support',
              text: 'We don’t disappear after delivery.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h4 className="font-semibold text-lg text-darkBlue">
                {item.title}
              </h4>
              <p className="mt-3 text-darkBlue/70">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
