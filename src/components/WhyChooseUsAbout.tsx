'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface WhyChooseUsProps {
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

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[100px] md:py-[140px]">
      <motion.div
        variants={reduceMotion ? undefined : staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 md:grid-cols-2 gap-20"
      >
        {/* LEFT COLUMN */}
        <div>
          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="font-heading text-[40px] md:text-[64px] font-bold text-darkBlue leading-tight"
          >
            {data.heading}
          </motion.h2>

          <motion.ul
            variants={reduceMotion ? undefined : staggerContainer(0.08)}
            className="mt-10 space-y-4"
          >
            {data.points.map((point, i) => (
              <motion.li
                key={i}
                variants={reduceMotion ? undefined : fadeUp}
                className="flex items-start gap-3 text-darkBlue text-base"
              >
                <span className="mt-[3px] text-xl">»</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>

          {data.description && (
            <motion.p
              variants={reduceMotion ? undefined : fadeUp}
              className="mt-10 max-w-[520px] text-darkBlue/80"
            >
              {data.description}
            </motion.p>
          )}
        </div>

        {/* RIGHT COLUMN – TESTIMONIAL */}
        {data.testimonial?.quote && (
          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="flex flex-col justify-center"
          >
            <blockquote className="text-[20px] md:text-[22px] leading-relaxed text-darkBlue/70">
              “{data.testimonial.quote}”
            </blockquote>

            <div className="mt-8 h-px w-full bg-darkBlue/20" />

            {data.testimonial.author && (
              <p className="mt-4 text-darkBlue font-medium">
                {data.testimonial.author}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
