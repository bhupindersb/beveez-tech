'use client'

import { motion } from 'framer-motion'
import { comparisonGroups } from './pricing/comparisonConfig'
import type { PricingPlan } from '@/types/pricing'

interface Props {
  plans: PricingPlan[]
}

export default function PricingComparison({ plans }: Props) {
  if (!plans || plans.length === 0) return null

  return (
    <section className="py-[100px] bg-[#fafafa]">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-4xl font-heading font-bold text-darkBlue"
        >
          Compare Plans
        </motion.h2>

        {/* Desktop table */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-[28px] bg-white shadow-xl">
            <table className="w-full border-collapse">
              {/* Header */}
              <thead>
                <tr className="bg-[#f5f7f9]">
                  <th className="p-6 text-left text-sm font-semibold text-darkBlue/70">
                    Features
                  </th>

                  {plans.map((plan, i) => (
                    <th
                      key={i}
                      className={`p-6 text-center font-heading text-lg
                        ${plan.highlighted ? 'bg-orange-50 text-darkOrange' : 'text-darkBlue'}
                      `}
                    >
                      {plan.title}
                      {plan.highlighted && (
                        <div className="mt-1 text-xs font-semibold uppercase tracking-wide">
                          Most Popular
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {comparisonGroups.map(group => (
                  <>
                    {/* Group title */}
                    <tr key={group.title}>
                      <td
                        colSpan={plans.length + 1}
                        className="bg-[#fafafa] px-6 py-4 text-sm font-semibold text-darkBlue"
                      >
                        {group.title}
                      </td>
                    </tr>

                    {group.items.map(item => (
                      <tr
                        key={item.key}
                        className="border-t border-gray-100"
                      >
                        <td className="px-6 py-4 text-sm text-darkBlue/80">
                          {item.label}
                        </td>

                        {plans.map((plan, idx) => {
                          const included = plan.includes?.[item.key as keyof typeof plan.includes]

                          return (
                            <td
                              key={idx}
                              className={`px-6 py-4 text-center
                                ${plan.highlighted ? 'bg-orange-50/40' : ''}
                              `}
                            >
                              {included ? (
                                <span className="text-xl text-green-600">✔</span>
                              ) : (
                                <span className="text-xl text-gray-300">✕</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="lg:hidden space-y-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-[28px] bg-white p-6 shadow-lg
                ${plan.highlighted ? 'ring-2 ring-darkOrange' : ''}
              `}
            >
              <h3 className="mb-4 text-xl font-heading font-semibold text-darkBlue">
                {plan.title}
              </h3>

              {comparisonGroups.map(group => (
                <div key={group.title} className="mb-4">
                  <p className="mb-2 text-sm font-semibold text-darkBlue">
                    {group.title}
                  </p>

                  <ul className="space-y-2 text-sm text-darkBlue/80">
                    {group.items.map(item => (
                      <li key={item.key} className="flex items-center gap-2">
                        {plan.includes?.[item.key as keyof typeof plan.includes] ? (
                          <span className="text-green-600">✔</span>
                        ) : (
                          <span className="text-gray-300">✕</span>
                        )}
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
