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
 * Expected order:
 * 0 → Starter Website Build
 * 1 → Growth Website
 * 2 → Performance & Scale
 */

export default function PricingComparison({ plans }: Props) {
  if (!plans || plans.length < 3) return null

  const starterFeatures = plans[0].features ?? []
  const growthFeatures = [...new Set([...starterFeatures, ...(plans[1].features ?? [])])]
  const performanceFeatures = [...new Set([...growthFeatures, ...(plans[2].features ?? [])])]

  // All unique features (row source)
  const allFeatures = Array.from(
    new Set([...starterFeatures, ...growthFeatures, ...performanceFeatures])
  )

  const isIncluded = (planIndex: number, feature: string) => {
    if (planIndex === 0) return starterFeatures.includes(feature)
    if (planIndex === 1) return growthFeatures.includes(feature)
    return performanceFeatures.includes(feature)
  }

  return (
    <section className="py-[120px] bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-darkBlue">
            Compare Plans
          </h2>
          <p className="mt-4 text-darkBlue/70">
            All plans build on each other — upgrade anytime as you grow.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* Column headers */}
          <div className="grid grid-cols-4 border-b border-gray-200">
            <div className="p-6 font-medium text-darkBlue/70">
              Features
            </div>

            {plans.slice(0, 3).map((plan, i) => (
              <div
                key={i}
                className={`relative p-6 text-center font-heading font-semibold
                  ${i === 1 ? 'bg-orange/10 scale-[1.02]' : ''}
                `}
              >
                {i === 1 && (
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
            ))}
          </div>

          {/* Feature rows */}
          {allFeatures.map((feature, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-4 border-t border-gray-100"
            >
              {/* Feature name */}
              <div className="p-6 text-darkBlue">
                {feature}
              </div>

              {[0, 1, 2].map(planIndex => (
                <div
                  key={planIndex}
                  className={`p-6 flex justify-center
                    ${planIndex === 1 ? 'bg-orange/10' : ''}
                  `}
                >
                  {isIncluded(planIndex, feature) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260 }}
                      className="text-green-600 text-xl font-bold"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Footer messaging */}
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
      </div>
    </section>
  )
}
