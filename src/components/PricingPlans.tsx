'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import PricingPayButton from '@/components/PricingPayButton'

interface Plan {
  title: string
  description?: string
  price?: string
  bestFor?: string
  features?: string[]
  highlighted?: boolean

  paymentProvider?: 'stripe' | 'razorpay' | 'paddle'
  paymentLink?: string
  ctaText?: string
}

export default function PricingPlans({ plans }: { plans: Plan[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="pb-[120px]">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto w-[90%] max-w-[1760px]
                   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                   gap-10 px-6"
      >
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`rounded-[40px] bg-white p-10
                        flex flex-col
                        shadow-lg transition
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
            {plan.price && (
              <div className="text-6xl font-heading font-normal text-darkBlue">
                {plan.price}
              </div>
            )}

            {/* PAYMENT CTA */}
            {plan.paymentProvider && plan.paymentLink && (
              <div className="mt-6">
                <PricingPayButton
                  provider={plan.paymentProvider}
                  paymentLink={plan.paymentLink}
                  ctaText={plan.ctaText ?? 'Get Started'}
                />
              </div>
            )}

            {/* FEATURES */}
            {plan.features && plan.features.length > 0 && (
              <div className="mt-8">
                <p className="mb-4 font-semibold text-darkBlue">
                  What’s included?
                </p>
                <ul className="space-y-3 text-darkBlue/80">
                  {plan.features.map((item, idx) => (
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
