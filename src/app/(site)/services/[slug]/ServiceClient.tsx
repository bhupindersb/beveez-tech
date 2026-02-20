'use client'

import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/CtaSection'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import ServiceFAQ from '@/components/ServiceFAQ'
import { PortableText } from '@portabletext/react'
import { useEffect, useState } from 'react'

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const numeric = parseInt(value.replace(/\D/g, ''))
    let start = 0
    const duration = 1200
    const increment = numeric / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= numeric) {
        setCount(numeric)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return <>{value.includes('%') ? `${count}%` : value.includes('+') ? `${count}+` : count}</>
}


export default function ServiceClient({ data }: any) {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden text-center">

        {data.hero?.backgroundImage?.asset?.url && (
          <Image
            src={data.hero.backgroundImage.asset.url}
            alt=""
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-[40%]
                        bg-gradient-to-t from-[#f28f23]/50 to-transparent" />

        <div className="absolute left-1/2 top-[45%]
                        h-[700px] w-[700px]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-full bg-[#7becff]/50 blur-[250px]" />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-[960px]
                     px-6 pt-[200px] pb-[140px]"
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading font-bold text-darkBlue
                       leading-tight
                       text-[36px] sm:text-[48px]
                       md:text-[64px] lg:text-[72px]"
          >
            {data.hero?.headline}
          </motion.h1>

          {data.hero?.subText && (
            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg text-darkBlue/90 max-w-2xl mx-auto"
            >
              {data.hero.subText}
            </motion.p>
          )}

          <motion.div variants={fadeUp}>
            <Link
              href="/start-your-project"
              className="inline-block mt-12
                         bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                         text-white px-10 py-4 rounded-full
                         font-semibold shadow-xl
                         hover:scale-105 transition"
            >
              Get Performance Audit
            </Link>
          </motion.div>
        </motion.div>
        {data.heroMetrics?.length > 0 && (
        <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-[900px] mx-auto"
        >
            {data.heroMetrics.map((metric: any, i: number) => (
            <div
                key={i}
                className="bg-white/60 backdrop-blur-md
                        rounded-2xl py-8 shadow-lg"
            >
                <div className="text-4xl font-bold text-orange-500">
                <AnimatedCounter value={metric.value} />
                </div>
                <div className="mt-2 text-sm text-darkBlue/70">
                {metric.label}
                </div>
            </div>
            ))}
        </motion.div>
        )}

      </section>

      {/* ================= PROBLEM ================= */}
        {data.problem?.content && (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-28 bg-white"
        >
            <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

            <motion.div variants={fadeUp}>
                <h2 className="text-4xl font-bold text-darkBlue mb-8">
                {data.problem.heading}
                </h2>

                <div className="prose prose-lg max-w-none text-darkBlue/80">
                <PortableText value={data.problem.content} />
                </div>
            </motion.div>

            {data.problem.impactPoints?.length > 0 && (
                <motion.div
                variants={fadeUp}
                className="bg-gradient-to-br from-[#f7f9fc] to-white
                            p-10 rounded-3xl shadow-xl"
                >
                <h3 className="font-semibold text-darkBlue mb-6 text-lg">
                    Slow websites hurt:
                </h3>

                <ul className="space-y-4">
                    {data.problem.impactPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-darkBlue/80">
                        <span className="h-2 w-2 bg-orange-500 rounded-full" />
                        {point}
                    </li>
                    ))}
                </ul>
                </motion.div>
            )}

            </div>
        </motion.section>
        )}

      {/* ================= WHAT WE DO ================= */}
      {data.whatWeDo?.length > 0 && (
        <motion.section
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 bg-[#f7f9fc]"
        >
          <div className="max-w-[1100px] mx-auto px-6">

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold font-headingtext-darkBlue mb-14 text-center"
            >
              What We Do
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.whatWeDo.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white p-8 rounded-3xl shadow-md
                             hover:shadow-xl hover:-translate-y-2
                             transition duration-300"
                >
                  <div className="text-[#cf5a20] text-xl mb-4">✓</div>
                  <p className="text-darkBlue font-medium">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.section>
      )}

      {/* ================= PROCESS ================= */}
      {data.process?.length > 0 && (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-28 bg-white"
        >
            <div className="max-w-[1000px] mx-auto px-6">

            <motion.h2
                variants={fadeUp}
                className="text-4xl font-bold text-center text-darkBlue mb-20"
            >
                Our Process
            </motion.h2>

            <div className="relative">

                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-orange-200 -translate-x-1/2" />

                {data.process.map((step: string, i: number) => (
                <motion.div
                    key={i}
                    variants={fadeUp}
                    className={`relative mb-16 flex ${
                    i % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                >
                    <div className="w-full md:w-1/2 px-6">
                    <div className="bg-[#f7f9fc] p-8 rounded-3xl shadow-lg">
                        <div className="text-orange-500 font-bold mb-2">
                        Step {i + 1}
                        </div>
                        <div className="text-darkBlue">
                        {step}
                        </div>
                    </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-8
                                    h-5 w-5 rounded-full bg-orange-500" />
                </motion.div>
                ))}
            </div>

            </div>
        </motion.section>
      )}


      {/* ================= DELIVERABLES ================= */}
      {data.deliverables?.length > 0 && (
        <motion.section
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 bg-[#f7f9fc]"
        >
          <div className="max-w-[1100px] mx-auto px-6">

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold font-heading text-darkBlue mb-14 text-center"
            >
              What You’ll Get
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {data.deliverables.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white p-8 rounded-3xl shadow-md border border-gray-100"
                >
                  ✓ {item}
                </motion.div>
              ))}
            </div>

          </div>
        </motion.section>
      )}

      {data.comparison && (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-28 bg-[#f7f9fc]"
        >
            <div className="max-w-[1100px] mx-auto px-6">

            <motion.h2
                variants={fadeUp}
                className="text-4xl font-bold text-center text-darkBlue mb-16"
            >
                {data.comparison.heading}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12">

                <motion.div
                variants={fadeUp}
                className="bg-white p-10 rounded-3xl shadow-lg border border-red-100"
                >
                <h3 className="text-red-500 font-semibold mb-6">Before</h3>
                <ul className="space-y-3">
                    {data.comparison.beforePoints.map((point: string, i: number) => (
                    <li key={i} className="flex gap-3 text-darkBlue/80">
                        <span>❌</span> {point}
                    </li>
                    ))}
                </ul>
                </motion.div>

                <motion.div
                variants={fadeUp}
                className="bg-white p-10 rounded-3xl shadow-lg border border-green-100"
                >
                <h3 className="text-green-600 font-semibold mb-6">After</h3>
                <ul className="space-y-3">
                    {data.comparison.afterPoints.map((point: string, i: number) => (
                    <li key={i} className="flex gap-3 text-darkBlue/80">
                        <span>✅</span> {point}
                    </li>
                    ))}
                </ul>
                </motion.div>

            </div>

            </div>
        </motion.section>
      )}


        {/* ================= FAQ ================= */}
        {data.faq?.length > 0 && (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-24 bg-white"
        >
            <div className="max-w-[900px] mx-auto px-6">

            <motion.h2
                variants={fadeUp}
                className="text-4xl font-bold font-heading text-darkBlue mb-16 text-center"
            >
                Frequently Asked Questions
            </motion.h2>

            <ServiceFAQ faqs={data.faq} />

            </div>
        </motion.section>
        )}

        {data.testimonial?.quote && (
            <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="py-28 bg-white text-center"
            >
                <motion.p
                variants={fadeUp}
                className="text-2xl italic text-darkBlue max-w-[800px] mx-auto"
                >
                “{data.testimonial.quote}”
                </motion.p>

                {data.testimonial.author && (
                <motion.div
                    variants={fadeUp}
                    className="mt-6 font-semibold text-darkBlue"
                >
                    — {data.testimonial.author}
                </motion.div>
                )}
            </motion.section>
        )}


      {/* ================= CTA ================= */}
      <CTASection data={data.ctaOverride ?? null} />
    </>
  )
}
