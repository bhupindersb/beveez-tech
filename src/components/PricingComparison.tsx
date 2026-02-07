'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Plan {
  title: string
  features?: string[]
  highlighted?: boolean
}

export default function PricingComparison({ plans }: { plans: Plan[] }) {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  // 🔑 Build master feature list from ALL plans
  const allFeatures = Array.from(
    new Set(plans.flatMap(p => p.features ?? []))
  )

  return (
    <section className="py-[80px] bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-6 overflow-x-auto">

        {/* STICKY HEADER */}
        <div className="sticky top-0 z-10 bg-gray-50">
          <div
            className="grid"
            style={{ gridTemplateColumns: `240px repeat(${plans.length}, 1fr)` }}
          >
            <div />
            {plans.map((plan, colIndex) => (
              <div
                key={colIndex}
                onMouseEnter={() => setHoveredCol(colIndex)}
                onMouseLeave={() => setHoveredCol(null)}
                className={`py-6 text-center font-heading font-semibold transition
                  ${hoveredCol === colIndex ? 'bg-white shadow-md rounded-t-2xl' : ''}
                `}
              >
                {plan.title}
              </div>
            ))}
          </div>
        </div>

        {/* TABLE BODY */}
        <div
          className="grid"
          style={{ gridTemplateColumns: `240px repeat(${plans.length}, 1fr)` }}
        >
          {allFeatures.map((feature, rowIndex) => (
            <div key={rowIndex} className="contents">
              {/* FEATURE LABEL */}
              <div className="py-4 pr-6 text-sm text-darkBlue/80">
                {feature}
              </div>

              {/* PLAN CELLS */}
              {plans.map((plan, colIndex) => {
                const hasFeature = plan.features?.includes(feature)

                return (
                  <div
                    key={colIndex}
                    onMouseEnter={() => setHoveredCol(colIndex)}
                    onMouseLeave={() => setHoveredCol(null)}
                    className={`py-4 flex justify-center items-center transition
                      ${hoveredCol === colIndex ? 'bg-white' : ''}
                    `}
                  >
                    {hasFeature ? (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="text-green-500 text-xl"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <span className="text-gray-300 text-lg">–</span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* UPGRADE CALLOUT */}
        {plans.length >= 2 && (
          <div className="mt-10 text-center">
            <div className="inline-block rounded-2xl bg-orange/10 px-6 py-4 text-sm text-darkBlue">
              <strong>Upgrade anytime:</strong> Starter → Growth → Performance  
              without rebuilding your website
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
