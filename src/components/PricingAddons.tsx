'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface Addon {
  title: string
  description?: string
  price?: string
}

export default function PricingAddons({ addons }: { addons: Addon[] }) {
  if (!addons?.length) return null

  return (
    <section className="py-[120px] bg-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="text-[48px] md:text-[64px] font-heading font-bold text-darkBlue mb-16">
          Optional Add-Ons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {addons.map((addon, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-8"
            >
              <h3 className="text-xl font-semibold text-darkBlue">
                {addon.title}
              </h3>

              {addon.description && (
                <p className="mt-3 text-darkBlue/70">
                  {addon.description}
                </p>
              )}

              {addon.price && (
                <p className="mt-6 text-2xl font-bold text-orange">
                  {addon.price}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
