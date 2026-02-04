'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface PricingPlan {
  title: string
  description?: string
  price?: string
  features?: string[]
  ctaText?: string
  ctaUrl?: string
  highlighted?: boolean
}

export default function PricingPlans({ plans }: { plans: PricingPlan[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="pb-[120px]">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[1280px] px-6
                   grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`relative rounded-3xl p-8
              ${plan.highlighted
                ? 'bg-darkBlue text-white scale-[1.03]'
                : 'bg-white text-darkBlue'}
              shadow-xl`}
          >
            {plan.highlighted && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2
                               rounded-full bg-orange px-4 py-1
                               text-sm font-semibold text-white">
                Most Popular
              </span>
            )}

            <h3 className="text-2xl font-heading font-semibold">
              {plan.title}
            </h3>

            {plan.description && (
              <p className={`mt-3 text-sm
                ${plan.highlighted ? 'text-white/80' : 'text-darkBlue/70'}`}>
                {plan.description}
              </p>
            )}

            {plan.price && (
              <p className="mt-6 text-4xl font-bold">
                {plan.price}
              </p>
            )}

            {plan.features && plan.features.length > 0 && (
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="mt-2 h-2 w-2 rounded-full bg-orange" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {plan.ctaText && plan.ctaUrl && (
              <a
                href={plan.ctaUrl}
                className={`mt-8 inline-block w-full text-center
                  rounded-full px-8 py-4 font-semibold transition
                  ${plan.highlighted
                    ? 'bg-orange text-white hover:opacity-90'
                    : 'bg-darkBlue text-white hover:bg-darkBlue/90'}`}
              >
                {plan.ctaText}
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
