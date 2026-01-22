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
    <section className="py-[60px] md:py-[120px]">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        className="mx-auto max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-16 px-6"
      >
        {/* LEFT COLUMN */}
        <div>
          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="font-heading text-[48px] md:text-[64px] font-bold text-darkBluetext-[48px] md:text-[72px] font-heading font-bold text-darkBlue leading-none text-center md:text-left"
          >
            {data.heading}
          </motion.h2>

          <motion.ul
            variants={reduceMotion ? undefined : staggerContainer(0.08)}
            className="mt-6 space-y-2 text-darkBlue"
          >
            {data.points.map((point, i) => (
              <motion.li
                key={i}
                variants={reduceMotion ? undefined : fadeUp}
                className="flex gap-3 items-start justify-center md:justify-start text-center md:text-left"
              >
                <span className="text-darkBlue text-[24px] leading-none hidden md:block">»</span>
                {point}
              </motion.li>
            ))}
          </motion.ul>

          {data.description && (
            <motion.p
              variants={reduceMotion ? undefined : fadeUp}
              className="mt-6 text-lg text-darkBlue/80 max-w-[520px]"
            >
              {data.description}
            </motion.p>
          )}
        </div>

        {/* RIGHT COLUMN – TESTIMONIAL */}
        {data.testimonial?.quote && (
          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="bg-white rounded-[32px] p-10 md:p-20 shadow-sm"
          >
            <p className="text-2xl font-body text-gray-700 leading-relaxed">
              “{data.testimonial.quote}”
            </p>
            <div className="my-6 h-px bg-gray-200" />
            {data.testimonial.author && (
              <p className="font-normal text-lg text-darkBlue">
                — {data.testimonial.author}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
