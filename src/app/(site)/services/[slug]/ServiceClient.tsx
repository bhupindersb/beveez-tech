'use client'

import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/CtaSection'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import ServiceFAQ from '@/components/ServiceFAQ'

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
      </section>

      {/* ================= PROBLEM ================= */}
      {data.problem?.content && (
        <motion.section
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 bg-white"
        >
          <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

            <motion.div variants={fadeUp}>
              <h2 className="text-4xl font-bold text-darkBlue mb-6">
                {data.problem.heading}
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {data.problem.content}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#f7f9fc] p-10 rounded-3xl shadow-lg"
            >
              <h3 className="font-semibold text-darkBlue mb-6">
                Slow websites hurt:
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li>• SEO rankings</li>
                <li>• Conversion rates</li>
                <li>• User trust</li>
                <li>• Ad performance</li>
              </ul>
            </motion.div>

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
              className="text-4xl font-bold text-darkBlue mb-14 text-center"
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
              className="text-4xl font-bold text-darkBlue mb-16 text-center"
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
              className="text-4xl font-bold text-darkBlue mb-14 text-center"
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
                className="text-4xl font-bold text-darkBlue mb-16 text-center"
            >
                Frequently Asked Questions
            </motion.h2>

            <ServiceFAQ faqs={data.faq} />

            </div>
        </motion.section>
        )}


      {/* ================= CTA ================= */}
      <CTASection data={data.ctaOverride ?? null} />
    </>
  )
}
