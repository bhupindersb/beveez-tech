'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FeatureTooltip from './FeatureTooltip'

const FEATURES = [
  { name: 'Custom UI/UX Design', tip: 'Designed specifically for your brand and users.' },
  { name: 'Responsive Layout', tip: 'Optimized for mobile, tablet, and desktop.' },
  { name: 'SEO-Ready Structure', tip: 'Built with clean HTML & SEO best practices.' },
  { name: 'Performance Optimization', tip: 'Fast load times & Core Web Vitals.' },
  { name: 'CMS Integration', tip: 'Easily manage content without developers.' },
  { name: 'Post-Launch Support', tip: 'We help after launch, not disappear.' },
]

export default function PricingComparison({ plans }: { plans: any[] }) {
  const [active, setActive] = useState<number | null>(null)

  if (!plans?.length) return null

  return (
    <section className="py-[120px] bg-gray-50">
      <div className="mx-auto max-w-[1400px] px-6">

        <h2 className="text-center text-[40px] md:text-[56px]
                       font-heading font-bold text-darkBlue mb-16">
          Compare Plans
        </h2>

        {/* DESKTOP */}
        <div className="hidden md:block">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-[300px_repeat(3,1fr)]
                         items-center gap-6 mb-3 rounded-2xl
                         bg-white px-6 py-5 shadow"
            >
              <div className="font-medium text-darkBlue">
                {f.name}
                <FeatureTooltip text={f.tip} />
              </div>

              {plans.map((p, idx) => (
                <div key={idx} className="text-center">
                  {p.features?.includes(f.name) ? '✔️' : '—'}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="md:hidden space-y-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="rounded-2xl bg-white shadow">
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full px-6 py-4 text-left font-semibold text-darkBlue"
              >
                {f.name}
              </button>

              {active === i && (
                <div className="px-6 pb-4 space-y-2 text-sm">
                  <p className="text-darkBlue/70">{f.tip}</p>
                  {plans.map((p, idx) => (
                    <p key={idx}>
                      {p.title}: {p.features?.includes(f.name) ? 'Included' : '—'}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
