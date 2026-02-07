'use client'

import { Check, X } from 'lucide-react'
import { comparisonGroups } from './comparisonConfig'

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '')

interface Plan {
  title: string
  whatsIncluded?: string[]
  highlighted?: boolean
}

export default function PricingComparison({ plans }: { plans: Plan[] }) {
  return (
    <section className="py-[80px] md:py-[120px] bg-gray-50">
      <div className="mx-auto max-w-[1400px] px-6">
        <h2 className="text-center text-3xl md:text-4xl font-heading font-bold text-darkBlue mb-14">
          Compare Plans
        </h2>

        <div className="overflow-x-auto">
          <div className="rounded-[32px] bg-white shadow-xl">
            <table className="w-full border-collapse">
              {/* HEADER */}
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-6 text-left text-sm font-semibold text-gray-500">
                    Features
                  </th>

                  {plans.map((plan, i) => (
                    <th
                      key={i}
                      className="p-6 text-center text-sm font-semibold text-darkBlue"
                    >
                      {plan.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonGroups.map((group, gi) => (
                  <tr key={gi}>
                    <td colSpan={plans.length + 1}>
                      <div className="px-6 py-4 font-semibold text-darkBlue bg-gray-50">
                        {group.title}
                      </div>

                      {group.features.map((feature, fi) => (
                        <div
                          key={fi}
                          className="grid grid-cols-[1fr_repeat(4,1fr)]
                                     border-t border-gray-100"
                        >
                          {/* FEATURE NAME */}
                          <div className="px-6 py-4 text-sm text-darkBlue">
                            {feature}
                          </div>

                          {/* PLAN CELLS */}
                          {plans.map((plan, pi) => {
                            const hasFeature =
                              plan.whatsIncluded?.some(item =>
                                normalize(item).includes(normalize(feature))
                              )

                            return (
                              <div
                                key={pi}
                                className="flex items-center justify-center py-4"
                              >
                                {hasFeature ? (
                                  <Check className="h-5 w-5 text-green-600" />
                                ) : (
                                  <X className="h-5 w-5 text-gray-300" />
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
