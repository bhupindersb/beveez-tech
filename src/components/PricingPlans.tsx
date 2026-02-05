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
  ctaText?: string
  ctaUrl?: string
  highlighted?: boolean

  paymentProvider?: 'stripe' | 'razorpay' | 'paddle'
  paymentLink?: string
}

export default function PricingPlans({ plans }: { plans: Plan[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[120px] bg-gray-50">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`rounded-3xl p-10 shadow-lg bg-white
              ${plan.highlighted ? 'ring-2 ring-orange scale-[1.02]' : ''}
            `}
          >
            <h3 className="text-2xl font-heading font-semibold text-darkBlue">
              {plan.title}
            </h3>

            {plan.price && (
              <p className="mt-4 text-4xl font-bold text-darkBlue">
                {plan.price}
              </p>
            )}

            {plan.description && (
              <p className="mt-4 text-darkBlue/80">
                {plan.description}
              </p>
            )}

            {plan.features && (
              <ul className="mt-6 space-y-3">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-orange" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* PAYMENT CTA */}
            {plan.paymentProvider && plan.paymentLink && (
              <div className="mt-8 w-full">
                <PricingPayButton
                  provider={plan.paymentProvider}
                  paymentLink={plan.paymentLink}
                  ctaText={plan.ctaText ?? 'Get Started'}
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
