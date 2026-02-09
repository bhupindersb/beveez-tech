'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Plan {
  title: string
}

interface Feature {
  label: string
  minPlanIndex: number
}

interface Props {
  plans: Plan[]
}

/* ===============================
   FEATURES (INHERITANCE MODEL)
================================ */
const FEATURES: Feature[] = [
  { label: 'Custom UI / UX Design', minPlanIndex: 0 },
  { label: 'Mobile Responsive Design', minPlanIndex: 0 },
  { label: 'SEO-Ready Site Structure', minPlanIndex: 0 },
  { label: 'CMS Integration', minPlanIndex: 0 },

  { label: 'Advanced SEO Setup', minPlanIndex: 1 },
  { label: 'Conversion-Focused Layout', minPlanIndex: 1 },
  { label: 'Speed Optimization', minPlanIndex: 1 },

  { label: 'Scalable Architecture', minPlanIndex: 2 },
  { label: 'Performance Audits', minPlanIndex: 2 },
  { label: 'Future-Ready Expansion Setup', minPlanIndex: 2 },
]

export default function PricingComparison({ plans }: Props) {
  const [activeCol, setActiveCol] = useState<number | null>(null)

  if (!plans || plans.length < 3) return null

  return (
    <section className="py-[100px] bg-gray-50">
      <div className="mx-auto max-w-[1400px] px-6">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-darkBlue">
            Compare Plans
          </h2>
          <p className="mt-4 text-darkBlue/70 max-w-2xl mx-auto">
            Every plan includes everything from the previous one — no confusion, no trade-offs.
          </p>
        </div>

        {/* SCROLL WRAPPER */}
        <div className="overflow-x-auto snap-x snap-mandatory">
          <div className="min-w-[900px] rounded-3xl bg-white shadow-xl">

            {/* HEADER ROW */}
            <div className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-6 font-semibold text-darkBlue">
                Features
              </div>

              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveCol(i)}
                  onMouseLeave={() => setActiveCol(null)}
                  onClick={() => setActiveCol(i)}
                  className={`p-6 text-center font-heading font-semibold
                    snap-center cursor-pointer transition
                    ${activeCol === i ? 'bg-orange/10 shadow-inner' : ''}
                    ${i === 1 ? 'bg-orange/5' : ''}
                    ${i === 2 ? 'bg-orange/10' : ''}
                  `}
                >
                  {plans[i].title}

                  {i === 1 && (
                    <p className="mt-1 text-xs text-orange font-semibold">
                      Everything in Starter +
                    </p>
                  )}
                  {i === 2 && (
                    <p className="mt-1 text-xs text-orange font-semibold">
                      Everything in Growth +
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* FEATURE ROWS */}
            {FEATURES.map((feature, rowIndex) => (
              <motion.div
                key={rowIndex}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-4 border-b border-gray-100 last:border-none"
              >
                {/* FEATURE LABEL */}
                <div className="p-6 text-darkBlue">
                  {feature.label}
                </div>

                {/* PLAN CELLS */}
                {[0, 1, 2].map(planIndex => {
                  const included = planIndex >= feature.minPlanIndex

                  return (
                    <div
                      key={planIndex}
                      className={`p-6 flex justify-center items-center transition
                        ${activeCol === planIndex ? 'bg-orange/10' : ''}
                        ${planIndex === 1 ? 'bg-orange/5' : ''}
                        ${planIndex === 2 ? 'bg-orange/10' : ''}
                      `}
                    >
                      {included && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 260 }}
                          className="text-2xl text-green-600"
                        >
                          ✓
                        </motion.span>
                      )}
                    </div>
                  )
                })}
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE HINT */}
        <p className="mt-6 text-center text-sm text-gray-500 md:hidden">
          Swipe horizontally to compare plans →
        </p>
      </div>
    </section>
  )
}
