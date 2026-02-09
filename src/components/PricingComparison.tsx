'use client'

import { motion } from 'framer-motion'

interface Plan {
  title: string
  features?: string[]
}

interface Props {
  plans: Plan[]
}

/**
 * Assumptions:
 * plans[0] = Starter Website
 * plans[1] = Growth Website (Best Value)
 * plans[2] = Performance & Scale
 */

const BEST_VALUE_INDEX = 1

export default function PricingComparison({ plans }: Props) {
  if (!plans || plans.length < 3) return null

  // Build inherited feature sets
  const starter = plans[0].features ?? []
  const growth = [...new Set([...starter, ...(plans[1].features ?? [])])]
  const performance = [...new Set([...growth, ...(plans[2].features ?? [])])]

  const featureRows = [
    { label: 'Starter Website Build', includedFrom: 0 },
    { label: 'Growth Website Build', includedFrom: 1 },
    { label: 'Performance & Scale Build', includedFrom: 2 },
  ]

  const plansFeatures = [starter, growth, performance]

  return (
    <section className="py-[120px] bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-darkBlue">
            Compare Plans
          </h2>
          <p className="mt-4 text-darkBlue/70">
            All plans build on each other — upgrade anytime as you grow.
          </p>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden lg:block overflow-hidden rounded-3xl bg-white shadow-xl">
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-gray-200">
            <div className="p-6" />

            {plans.slice(0, 3).map((plan, i) => {
              const isBest = i === BEST_VALUE_INDEX

              return (
                <div
                  key={i}
                  className={`relative p-6 text-center font-heading font-semibold
                    transition
                    ${isBest ? 'bg-orange/10 scale-[1.02]' : ''}
                  `}
                >
                  {isBest && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2
                                     rounded-full bg-orange px-4 py-1
                                     text-xs font-bold text-white shadow">
                      Best Value
                    </span>
                  )}

                  {plan.title}

                  {i > 0 && (
                    <p className="mt-1 text-xs text-orange font-semibold">
                      Everything in {plans[i - 1].title} +
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {/* Rows */}
          {featureRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-4 border-t border-gray-100"
            >
              {/* Feature label */}
              <div className="p-6 font-medium text-darkBlue">
                {row.label}
              </div>

              {[0, 1, 2].map(planIndex => {
                const included = planIndex >= row.includedFrom
                const isBest = planIndex === BEST_VALUE_INDEX

                return (
                  <div
                    key={planIndex}
                    className={`p-6 flex justify-center
                      ${isBest ? 'bg-orange/10' : ''}
                    `}
                  >
                    {included && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="text-green-600 text-xl font-bold"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}

          {/* Upgrade Callouts */}
          <div className="grid grid-cols-4 border-t border-gray-200 bg-gray-50">
            <div />

            <div className="p-6 text-center text-sm text-darkBlue/60">
              Good for starting out
            </div>

            <div className="p-6 text-center text-sm font-semibold text-orange">
              Most clients upgrade to this 🚀
            </div>

            <div className="p-6 text-center text-sm text-darkBlue/60">
              Built for scale & performance
            </div>
          </div>
        </div>

        {/* ================= MOBILE SLIDER ================= */}
        <div className="lg:hidden mt-16 overflow-x-auto flex gap-6 snap-x snap-mandatory pb-6">
          {[0, 1, 2].map(planIndex => {
            const isBest = planIndex === BEST_VALUE_INDEX

            return (
              <div
                key={planIndex}
                className={`snap-center min-w-[85%] rounded-3xl p-6 shadow-xl
                  ${isBest ? 'bg-orange/10 scale-[1.03]' : 'bg-white'}
                `}
              >
                <h3 className="text-xl font-heading font-bold text-center">
                  {plans[planIndex].title}
                </h3>

                {isBest && (
                  <p className="mt-2 text-xs text-orange font-bold text-center">
                    Most Popular Choice
                  </p>
                )}

                <ul className="mt-6 space-y-4">
                  {featureRows.map((row, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {planIndex >= row.includedFrom ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-300">–</span>
                      )}
                      <span className="text-sm">{row.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
