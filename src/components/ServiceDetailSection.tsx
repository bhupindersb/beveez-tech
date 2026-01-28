'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

/* ================= TYPES ================= */

interface ImageVisual {
  type: 'image'
  image: {
    asset?: { url?: string }
  }
}

export interface ServiceDetailData {
  heading: string
  subText?: string
  description?: string
  includes?: string[]
  ctaText?: string
  ctaUrl?: string
  accent?: string
  visual: ImageVisual
}

interface Props {
  data: ServiceDetailData
}

/* ================= COMPONENT ================= */

export default function ServiceDetailSection({ data }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[80px] md:py-[120px]">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* ================= HEADER ================= */}
        <motion.div
          variants={reduceMotion ? undefined : staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="text-[48px] md:text-[72px] font-bold font-heading text-darkBlue leading-none text-center md:text-left md:col-span-3"
          >
            {data.heading}
          </motion.h2>

          {data.subText && (
            <motion.p
              variants={reduceMotion ? undefined : fadeUp}
              className="text-darkBlue/80 text-base md:text-lg"
            >
              {data.subText}
            </motion.p>
          )}
        </motion.div>

        {/* ================= CONTENT ================= */}
        <motion.div
          variants={reduceMotion ? undefined : staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >

          {/* LEFT — IMAGE */}
          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="relative w-full aspect-[4/3]"
          >
            {data.visual?.image?.asset?.url && (
              <Image
                src={data.visual.image.asset.url}
                alt={data.heading}
                fill
                className="object-cover rounded-2xl shadow-lg"
              />
            )}
          </motion.div>

          {/* RIGHT — CONTENT */}
          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="space-y-6"
          >
            {data.description && (
              <p className="text-darkBlue text-lg leading-relaxed">
                {data.description}
              </p>
            )}

            {data.includes && data.includes.length > 0 && (
              <ul className="space-y-3">
                {data.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-darkBlue"
                  >
                    <span
                      className="mt-2 h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: data.accent ?? '#f28f23',
                      }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {data.ctaText && data.ctaUrl && (
              <a
                href={data.ctaUrl}
                className="inline-block mt-6 rounded-full
                           bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                           px-10 py-5 text-white font-semibold
                           transition hover:from-[#f68f1e] hover:to-[#cf5a20]"
              >
                {data.ctaText}
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
