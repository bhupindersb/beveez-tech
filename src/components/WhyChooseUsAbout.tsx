'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface WhyChooseUsAboutProps {
  data: {
    heading: string
    points: string[]
    description?: string
    testimonial?: {
      quote?: string
      author?: string
    }
  }
}

export default function WhyChooseUsAbout({ data }: WhyChooseUsAboutProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-32 bg-[#f7f9fa]">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 md:grid-cols-2 gap-16"
      >
        {/* LEFT COLUMN */}
        <div>
          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="font-heading text-[48px] md:text-[64px] font-bold text-darkBlue"
          >
            {data.heading}
          </motion.h2>

          {data.description && (
            <motion.p
              variants={reduceMotion ? undefined : fadeUp}
              className="mt-6 text-lg text-darkBlue/80 max-w-[520px]"
            >
              {data.description}
            </motion.p>
          )}

          <motion.ul
            variants={reduceMotion ? undefined : staggerContainer(0.08)}
            className="mt-8 space-y-4"
          >
            {data.points.map((point, i) => (
              <motion.li
                key={i}
                variants={reduceMotion ? undefined : fadeUp}
                className="text-darkBlue text-base flex items-start gap-3"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-orange" />
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT COLUMN – TESTIMONIAL */}
        {data.testimonial?.quote && (
          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="rounded-3xl bg-white p-10 shadow-lg self-center"
          >
            <p className="text-xl text-darkBlue italic leading-relaxed">
              “{data.testimonial.quote}”
            </p>

            {data.testimonial.author && (
              <p className="mt-6 font-semibold text-darkBlue">
                — {data.testimonial.author}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
