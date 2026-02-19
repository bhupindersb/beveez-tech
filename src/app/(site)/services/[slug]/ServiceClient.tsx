'use client'

import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/CtaSection'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import ServiceFAQ from '@/components/ServiceFAQ'
import { PortableText } from '@portabletext/react'


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
        <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap justify-center gap-8 text-darkBlue/70"
            >
            <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">+40%</div>
                <div className="text-sm">Faster Load Time</div>
            </div>

            <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">+25%</div>
                <div className="text-sm">Conversion Lift</div>
            </div>

            <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">90+</div>
                <div className="text-sm">Core Web Vitals</div>
            </div>
        </motion.div>

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
          className="py-24 bg-white"
        >
          <div className="max-w-[900px] mx-auto px-6">

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold font-heading text-darkBlue mb-16 text-center"
            >
              Our Process
            </motion.h2>

            <div className="relative border-l-2 border-orange-400 pl-10 space-y-12">
              {data.process.map((step: string, i: number) => (
                <motion.div key={i} variants={fadeUp} className="relative">
                  <div className="absolute -left-[22px] top-2 h-4 w-4 
                                  rounded-full bg-orange-500" />
                  <p className="text-darkBlue font-medium">
                    {step}
                  </p>
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

      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-28 bg-white"
        >
        <div className="max-w-[1000px] mx-auto px-6 text-center">

            <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-darkBlue mb-16"
            >
            Before vs After Optimization
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-10">

            <motion.div
                variants={fadeUp}
                className="bg-red-50 p-10 rounded-3xl border border-red-100"
            >
                <h3 className="font-semibold text-red-600 mb-6">Before</h3>
                <ul className="space-y-3 text-darkBlue/70">
                <li>❌ 4–6s load time</li>
                <li>❌ Poor Core Web Vitals</li>
                <li>❌ High bounce rate</li>
                <li>❌ SEO penalties</li>
                </ul>
            </motion.div>

            <motion.div
                variants={fadeUp}
                className="bg-green-50 p-10 rounded-3xl border border-green-100"
            >
                <h3 className="font-semibold text-green-600 mb-6">After</h3>
                <ul className="space-y-3 text-darkBlue/70">
                <li>✅ 1.5–2s load time</li>
                <li>✅ Passing Core Web Vitals</li>
                <li>✅ Better rankings</li>
                <li>✅ Higher conversions</li>
                </ul>
            </motion.div>

            </div>
        </div>
        </motion.section>


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

        <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-28 bg-[#f7f9fc]"
        >
        <div className="max-w-[800px] mx-auto px-6 text-center">

            <motion.p
            variants={fadeUp}
            className="text-2xl italic text-darkBlue"
            >
            “Our website load time dropped from 5 seconds to under 2 seconds.
            Conversions increased by 32% in 3 months.”
            </motion.p>

            <motion.div
            variants={fadeUp}
            className="mt-6 font-semibold text-darkBlue"
            >
            — SaaS Founder, UK
            </motion.div>

        </div>
        </motion.section>
        


      {/* ================= CTA ================= */}
      <CTASection data={data.ctaOverride ?? null} />
    </>
  )
}
