'use client'

import { Check, X } from 'lucide-react'

interface Plan {
  title: string
  highlighted?: boolean
  whatsIncluded?: string[]
}

/* -------------------------------------------
   FEATURE GROUP CONFIG
-------------------------------------------- */

const comparisonGroups = [
  {
    title: 'Design',
    features: [
      {
        label: 'Custom UI / UX Design',
        match: ['custom website design', 'ui', 'ux'],
      },
      {
        label: 'Responsive Layout',
        match: ['responsive', 'mobile-first'],
      },
    ],
  },
  {
    title: 'SEO & Performance',
    features: [
      {
        label: 'SEO-Ready Structure',
        match: ['seo'],
      },
      {
        label: 'Performance Optimization',
        match: ['performance', 'optimized'],
      },
    ],
  },
  {
    title: 'CMS & Content',
    features: [
      {
        label: 'CMS Integration',
        match: ['cms'],
      },
      {
        label: 'CMS Training',
        match: ['training'],
      },
    ],
  },
  {
    title: 'Support',
    features: [
      {
        label: 'Post-Launch Support',
        match: ['support', 'maintenance'],
      },
    ],
  },
]

/* -------------------------------------------
   HELPERS
-------------------------------------------- */

const normalize = (v: string) => v.toLowerCase()

const hasFeature = (
  included: string[] | undefined,
  matchTerms: string[]
) => {
  if (!included || included.length === 0) return false

  return included.some(item =>
    matchTerms.some(term =>
      normalize(item).includes(normalize(term))
    )
  )
}

/* -------------------------------------------
   COMPONENT
-------------------------------------------- */

export default function PricingComparison({
  plans,
}: {
  plans: Plan[]
}) {
  if (!plans || plans.length === 0) return null

  return (
    <section className="py-[120px] bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* HEADER */}
        <h2 className="text-center text-4xl md:text-5xl font-heading font-bold text-darkBlue mb-16">
          Compare Plans
        </h2>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-3xl bg-white shadow-xl">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `260px repeat(${plans.length}, minmax(200px, 1fr))`,
            }}
          >

            {/* TABLE HEADER */}
            <div className="sticky top-0 bg-gray-50 font-semibold text-sm text-gray-500 px-6 py-5">
              Features
            </div>

            {plans.map((plan, i) => (
              <div
                key={i}
                className={`sticky top-0 px-6 py-5 text-center font-heading font-semibold
                  ${plan.highlighted ? 'bg-orange-50 text-orange-600' : 'bg-gray-50'}
                `}
              >
                {plan.title}
              </div>
            ))}

            {/* TABLE BODY */}
            {comparisonGroups.map((group, gi) => (
              <div key={gi} className="contents">

                {/* GROUP TITLE */}
                <div className="col-span-full bg-gray-100 px-6 py-4 font-semibold text-darkBlue">
                  {group.title}
                </div>

                {/* FEATURES */}
                {group.features.map((feature, fi) => (
                  <div key={fi} className="contents">

                    {/* FEATURE LABEL */}
                    <div className="px-6 py-4 text-sm text-darkBlue border-t">
                      {feature.label}
                    </div>

                    {/* PLAN CELLS */}
                    {plans.map((plan, pi) => {
                      const included = hasFeature(
                        plan.whatsIncluded,
                        feature.match
                      )

                      return (
                        <div
                          key={pi}
                          className={`flex items-center justify-center border-t
                            ${plan.highlighted ? 'bg-orange-50/50' : ''}
                          `}
                        >
                          {included ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
