'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import Link from 'next/link'

interface Plan {
  title: string
  description?: string
  price?: string
  bestFor?: string
  features?: string[]
  highlighted?: boolean
  ctaText?: string
  ctaUrl?: string

  monthlyPrice?: string
}

interface Props {
  plans: Plan[]
  billing?: 'one-time' | 'monthly'
}

export default function PricingPlans({
  plans,
  billing = 'one-time',
}: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[60px] md:py-[120px]">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto w-[90%] max-w-[1760px]
                   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                   gap-10 px-6"
      >
        {plans.map((plan, i) => {
          const features = plan.features ?? []

          const displayPrice =
            billing === 'monthly' && plan.monthlyPrice
              ? plan.monthlyPrice
              : plan.price

          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`rounded-[40px] bg-white p-10
                          flex flex-col shadow-lg transition
                          ${
                            plan.highlighted
                              ? 'ring-2 ring-orange scale-[1.03]'
                              : ''
                          }`}
            >
              {/* DOT */}
              <span className="mb-4 block h-2 w-2 rounded-full bg-darkOrange" />

              {/* TITLE */}
              <h3 className="text-2xl font-semibold font-heading text-darkBlue">
                {plan.title}
              </h3>

              {/* BEST FOR */}
              {plan.bestFor && (
                <p className="mt-1 text-sm text-darkBlue/60">
                  Best for: {plan.bestFor}
                </p>
              )}

              {/* DESCRIPTION */}
              {plan.description && (
                <p className="mt-4 text-darkBlue/80">
                  {plan.description}
                </p>
              )}

              {/* DIVIDER */}
              <div className="my-6 h-[2px] w-full bg-darkOrange/40" />

              {/* PRICE */}
              {displayPrice && (
                <div className="text-6xl font-heading font-normal text-darkBlue">
                  {displayPrice}
                  {billing === 'monthly' && (
                    <span className="ml-2 text-base text-darkBlue/60">
                      /month
                    </span>
                  )}
                </div>
              )}

              {/* FEATURES */}
              const features = plan.features ?? []

              {features.length > 0 && (
                <div className="mt-8">
                  <p className="mb-4 font-semibold text-darkBlue">
                    What’s included?
                  </p>
                  <ul className="space-y-3 text-darkBlue/80">
                    {features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[14px]"
                      >
                        <span className="text-darkOrange text-[22px] leading-none">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <Link
                href={plan.ctaUrl ?? '/start-your-project'}
                className="mt-8 inline-block w-full text-center rounded-full
                           bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                           px-8 py-4 text-white font-semibold
                           hover:from-[#f68f1e] hover:to-[#cf5a20] transition"
              >
                {plan.ctaText ?? 'Start Your Project'}
              </Link>

              <p className="mt-4 text-xs text-center text-gray-400">
                Prices are indicative. Final invoice shared after scope confirmation.
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
