'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

export default function PricingGuarantee() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[120px] bg-white">
      <motion.div
        variants={reduceMotion ? undefined : fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[1000px] w-full px-6"
      >
        <div className="rounded-3xl bg-darkBlue p-12 text-center">
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-white">
                No-Risk. Clear Process. Real Results.
            </h2>

            <ul className="mt-8 space-y-3 text-white/80">
                <li>• Clear scope, timeline & deliverables before payment</li>
                <li>• No hidden costs or surprise upsells</li>
                <li>• Pay only for what’s agreed</li>
                <li>• Post-launch support available if needed</li>
            </ul>
            <p className="mt-6 text-sm text-white/60">
                All payments are processed securely via Razorpay. International cards supported.
            </p>
        </div>
      </motion.div>
    </section>
  )
}
