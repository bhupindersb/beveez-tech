'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface Plan {
  title: string
  features?: string[] // this is "What's Included" from Sanity
}

interface Props {
  plans: Plan[]
}

/* =====================
   CONFIG
===================== */

const PLAN_ORDER = [
  'Starter Website Build',
  'Growth Website',
  'Performance & Scale',
]

const FEATURE_GROUPS = [
  {
    label: 'Design',
    features: [
      'Custom UI/UX Design',
      'Responsive Layout',
    ],
  },
  {
    label: 'SEO & Performance',
    features: [
      'SEO-Ready Structure',
      'Performance Optimization',
      'Advanced SEO Setup',
    ],
  },
  {
    label: 'CMS & Content',
    features: [
      'CMS Integration',
      'CMS Training',
    ],
  },
  {
    label: 'Scalability',
    features: [
      'Architecture Planning',
      'Growth & Traffic Readiness',
    ],
  },
  {
    label: 'Support',
    features: [
      'Post-Launch Support',
    ],
  },
]

/* =====================
   COMPONENT
===================== */

export default function PricingComparison({ plans }: Props) {
  // normalize plans by title
  const planMap = PLAN_ORDER.map(title =>
    plans.find(p => p.title === title)
  )

  const planFeatures = planMap.map(
    plan => plan?.features ?? []
  )

  // progressive inclusion logic
  const isIncluded = (feature: string, planIndex: number) => {
    for (let i = 0; i <= planIndex; i++) {
      if (planFeatures[i]?.includes(feature)) return true
    }
    return false
  }

  return (
    <section className="py-[120px] bg-gray-50">
      <div className="mx-auto max-w-[1400px] px-6">

        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[36px] md:text-[48px]
                     font-heading font-bold text-darkBlue mb-16"
        >
          Compare Plans
        </motion.h2>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-3xl bg-white shadow-xl">
          <table className="w-full border-collapse">

            {/* HEAD */}
            <thead>
              <tr className="bg-gray-100 text-darkBlue">
                <th className="p-6 text-left text-sm font-semibold">
                  Features
                </th>

                {PLAN_ORDER.map((title, idx) => (
                  <th
                    key={title}
                    className={`p-6 text-center text-sm font-semibold
                      ${idx === 1 ? 'bg-orange/10' : ''}
                    `}
                  >
                    {title}
                    {idx === 1 && (
                      <div className="mt-1 text-xs text-orange font-medium">
                        Most Popular
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {FEATURE_GROUPS.map(group => (
                <React.Fragment key={group.label}>
                  {/* GROUP HEADER */}
                  <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-gray-50"
                    >

                    <td
                      colSpan={4}
                      className="px-6 py-4 text-sm font-semibold
                                 text-darkBlue"
                    >
                      {group.label}
                    </td>
                  </motion.tr>

                  {/* FEATURES */}
                  {group.features.map(feature => (
                    <tr
                      key={feature}
                      className="border-t border-gray-100"
                    >
                      <td className="px-6 py-4 text-sm text-darkBlue/80">
                        {feature}
                      </td>

                      {PLAN_ORDER.map((_, planIndex) => (
                        <td
                          key={planIndex}
                          className="px-6 py-4 text-center"
                        >
                          {isIncluded(feature, planIndex) ? (
                            <span className="inline-flex h-6 w-6 items-center
                                             justify-center rounded-full
                                             bg-green-100 text-green-700">
                              ✓
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
