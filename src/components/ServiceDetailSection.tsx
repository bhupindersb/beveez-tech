'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

/* ================= HELPERS ================= */

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

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
  index: number
  total: number
}

/* ================= COMPONENT ================= */

export default function ServiceDetailSection({
  data,
  index,
  total,
}: Props) {
  const reduceMotion = useReducedMotion()
  const id = slugify(data.heading)
  const includes = data.includes ?? []

  return (
    <>
      {/* ================= SECTION ================= */}
      <section
        id={id}
        className="pt-[80px] md:pt-[120px] scroll-mt-[120px]"
      >
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
              className="text-[48px] md:text-[72px]
                         font-semibold font-heading
                         text-darkBlue leading-none
                         md:col-span-3"
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
            {/* IMAGE */}
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

            {/* TEXT */}
            <motion.div
              variants={reduceMotion ? undefined : fadeUp}
              className="space-y-6"
            >
              {/* Description with paragraph spacing */}
              {data.description
                ?.split('\n\n')
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-darkBlue leading-relaxed"
                  >
                    {para}
                  </p>
                ))}

              {/* Includes */}
              {includes.length > 0 && (
                <>
                  <p className="text-orange font-semibold text-xl">
                    Includes
                  </p>

                  <ul className="space-y-3">
                    {includes.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                      >
                        <span
                          className="mt-2 h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              data.accent ?? '#f28f23',
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* CTA */}
              {data.ctaText && data.ctaUrl && (
                <a
                  href={data.ctaUrl}
                  className="inline-block mt-6 rounded-full
                             bg-gradient-to-r
                             from-[#cf5a20] to-[#f68f1e]
                             px-10 py-5 text-white font-semibold
                             transition hover:from-[#f68f1e] hover:to-[#cf5a20]"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      ;(window as any).gtag('event', 'service_cta_click', {
                        event_category: 'Services',
                        event_label: data.heading,
                        page_location: window.location.pathname,
                      })
                    }
                  }}
                >
                  {data.ctaText}
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= DIVIDER ================= */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="origin-left my-[120px] h-px w-full bg-darkBlue/10"
        />
      )}
    </>
  )
}
