'use client'

import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/CtaSection'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import ServiceFAQ from '@/components/ServiceFAQ'
import { PortableText } from '@portabletext/react'
import { useEffect, useState } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'

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

const portableComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-darkBlue/80">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 text-darkBlue/80">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-darkBlue/80">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-darkBlue">
        {children}
      </strong>
    ),
  },
}



export default function ServiceClient({ data }: any) {
    const timelineRef = useRef(null)
    const [progressValue, setProgressValue] = useState(0)

    const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
    const progressPercent = useTransform(scrollYProgress, v =>
    Math.round(v * 100)
    )

    useMotionValueEvent(progressPercent, 'change', (latest) => {
        setProgressValue(latest)
    })


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
            className="object-contain !h-auto"
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
                     px-6 pt-[180px] pb-[120px]"
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

            {data.hero?.primaryCtaText && data.hero?.primaryCtaUrl && (
            <motion.div variants={fadeUp}
             className="mt-[80px]">
                <Link
                href={`/${data.hero.primaryCtaUrl.replace(/^\//, '')}`}
                className="rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-12 py-8 text-white font-normal text-center transition-all hover:from-[#f68f1e] hover:to-[#cf5a20]"
                >
                {data.hero.primaryCtaText}
                </Link>
            </motion.div>
            )}

        </motion.div>
        {data.heroMetrics?.length > 0 && (
        <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pb-12 max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
            {data.heroMetrics.map((metric: any, i: number) => (
            <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-darkBlue/5 text-center hover:shadow-2xl transition"
            >
                {/* ICON */}
                {metric.icon?.asset?.url && (
                <div className="mb-5 flex justify-center">
                    <Image
                    src={metric.icon.asset.url}
                    alt={metric.label}
                    width={48}
                    height={48}
                    className="object-contain"
                    />
                </div>
                )}

                {/* VALUE */}
                <div className="text-2xl font-bold text-orange-600">
                {metric.value}
                </div>

                {/* LABEL */}
                <div className="mt-2 text-xs tracking-wider uppercase text-darkBlue/60">
                {metric.label}
                </div>
            </motion.div>
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
                <h2 className="text-4xl font-bold font-heading text-darkBlue mb-8">
                {data.problem.heading}
                </h2>

                <div className="prose prose-lg max-w-none text-darkBlue/80">
                <PortableText
                    value={data.problem.content}
                    components={portableComponents}
                />

                </div>
            </motion.div>

            {data.problem.impactPoints?.length > 0 && (
                <motion.div
                variants={fadeUp}
                className="bg-gradient-to-br from-[#f7f9fc] to-white
                            p-10 rounded-3xl shadow-xl"
                >
                <h3 className="font-semibold  text-darkBlue mb-6 text-lg">
                    Slow websites hurt:
                </h3>

                <ul className="space-y-4">
                    {data.problem.impactPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-darkBlue/80">
                        <span className="h-2 w-2 bg-darkOrange rounded-full" />
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
              className="text-4xl font-bold font-heading text-darkBlue mb-14 text-center"
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
            ref={timelineRef}
            className="py-28 bg-white"
        >
            <div className="max-w-[1100px] mx-auto px-6">

            <h2 className="text-4xl font-bold text-center text-darkBlue mb-10">
                Our Process
            </h2>

            {/* Scroll Progress */}
            <motion.div className="flex justify-center mb-12">
                <motion.div className="px-6 py-2 rounded-full bg-darkOrange text-white text-sm font-semibold shadow-lg">
                    <motion.span>{progressPercent}</motion.span>%
                </motion.div>
            </motion.div>

            <div className="relative pt-8">

                {/* Base Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-black/10 -translate-x-1/2 rounded-full" />

                {/* Animated Gradient Line */}
                <motion.div
                style={{ height: lineHeight }}
                className="
                    absolute
                    left-1/2
                    top-0
                    w-[3px]
                    -translate-x-1/2
                    origin-top
                    rounded-full
                    bg-gradient-to-b
                    from-darkOrange
                    via-orange-400
                    to-yellow-400
                "
                />

                {data.process.map((step: string, i: number) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`relative mb-20 flex ${
                    i % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                >
                    <div className="w-full md:w-[48%] px-4">
                    <div className="bg-[#f7f9fc] p-8 rounded-3xl shadow-lg border border-darkBlue/5 hover:shadow-xl transition">
                        <div className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">
                        Phase {i + 1}
                        </div>
                        <div className="text-darkBlue text-lg">
                        {step}
                        </div>
                    </div>
                    </div>

                    {/* Glowing Circle */}
                    <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="
                        absolute
                        left-1/2
                        -translate-x-1/2
                        top-8
                        h-6 w-6
                        rounded-full
                        bg-white
                        border-4 border-darkOrange
                        z-10
                    "
                    >
                    <motion.div
                        className="absolute inset-0 rounded-full bg-darkOrange"
                        animate={{
                        boxShadow: [
                            '0 0 0px rgba(255,140,0,0)',
                            '0 0 20px rgba(255,140,0,0.6)',
                            '0 0 0px rgba(255,140,0,0)',
                        ],
                        }}
                        transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        }}
                    />
                    </motion.div>
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
                className="text-4xl font-bold font-heading text-center text-darkBlue mb-16"
            >
                {data.comparison.heading}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12">

                {/* BEFORE */}
                <motion.div
                variants={fadeUp}
                className="bg-white p-10 rounded-3xl shadow-xl border border-red-100"
                >
                <div className="inline-block mb-6 bg-red-500 text-white text-xs px-4 py-1 rounded-full">
                    Before
                </div>

                <ul className="space-y-4">
                    {data.comparison.beforePoints.map((point: string, i: number) => (
                    <li key={i} className="flex gap-4 text-darkBlue/80">
                        <span className="text-red-500 text-lg">✕</span>
                        {point}
                    </li>
                    ))}
                </ul>
                </motion.div>

                {/* AFTER */}
                <motion.div
                variants={fadeUp}
                className="bg-white p-10 rounded-3xl shadow-2xl border border-green-100"
                >
                <div className="inline-block mb-6 bg-green-600 text-white text-xs px-4 py-1 rounded-full">
                    After
                </div>

                <ul className="space-y-4">
                    {data.comparison.afterPoints.map((point: string, i: number) => (
                    <li key={i} className="flex gap-4 text-darkBlue">
                        <span className="text-green-600 text-lg">✓</span>
                        {point}
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
