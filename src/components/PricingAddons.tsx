'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface Addon {
  title: string
  description?: string
  price?: string
  ctaText?: string
  ctaUrl?: string
}

export default function PricingAddons({ addons }: { addons: Addon[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[120px] bg-white">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* SECTION HEADER */}
        <motion.div
          variants={reduceMotion ? undefined : staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[40px] md:text-[64px] font-heading font-bold text-darkBlue"
          >
            Optional Add-ons
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-darkBlue/70 max-w-[700px] mx-auto"
          >
            Enhance your plan with optional upgrades — only if you need them.
          </motion.p>
        </motion.div>

        {/* ADDON CARDS */}
        <motion.div
          variants={reduceMotion ? undefined : staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {addons.map((addon, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-3xl bg-[#f2f1f6] p-10 shadow-md flex flex-col"
            >
              <h3 className="text-2xl font-heading font-semibold text-darkBlue">
                {addon.title}
              </h3>

              {addon.price && (
                <p className="mt-4 text-3xl font-normal text-darkBlue">
                  {addon.price}
                </p>
              )}

              {addon.description && (
                <p className="mt-4 text-darkBlue/80 flex-grow">
                  {addon.description}
                </p>
              )}

              {addon.ctaText && addon.ctaUrl && (
                <a
                  href={addon.ctaUrl}
                  className="mt-8 inline-block rounded-full
                             bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                             px-8 py-4 text-white font-semibold text-center
                             transition hover:from-[#f68f1e] hover:to-[#cf5a20]"
                >
                  {addon.ctaText}
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
