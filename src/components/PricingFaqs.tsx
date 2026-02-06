'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

/* ================= TYPES ================= */

interface FAQ {
  question: string
  answer: string
  highlighted?: boolean
}

interface Props {
  faqs: FAQ[]
}

/* ================= HELPERS ================= */

function buildFaqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/* ================= COMPONENT ================= */

export default function PricingFaqs({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="pb-[60px] md:pb-[120px] bg-white">
      {/* SEO – FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema(faqs)),
        }}
      />

      <motion.div
        variants={reduceMotion ? undefined : staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-[900px] px-6"
      >
        {/* HEADER */}
        <motion.h2
          variants={fadeUp}
          className="text-center text-[40px] md:text-[64px]
                     font-heading font-bold text-darkBlue"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-center text-darkBlue/70"
        >
          Everything you need to know before getting started.
        </motion.p>

        {/* FAQ LIST */}
        <div className="mt-16 space-y-6">
          {faqs.map((faq, i) => {
            const isOpen = open === i

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`rounded-2xl border p-6 transition
                  ${
                    faq.highlighted
                      ? 'border-orange bg-orange/5 shadow-md'
                      : 'border-darkBlue/10'
                  }
                `}
              >
                {/* BADGE */}
                {faq.highlighted && (
                  <span className="mb-3 inline-block rounded-full
                                   bg-orange px-4 py-1 text-xs
                                   font-semibold text-white">
                    Most Asked
                  </span>
                )}

                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(isOpen ? null : i)

                    if (
                      typeof window !== 'undefined' &&
                      (window as any).gtag
                    ) {
                      ;(window as any).gtag('event', 'faq_open', {
                        event_category: 'Pricing FAQ',
                        event_label: faq.question,
                        page_location: window.location.pathname,
                      })
                    }
                  }}
                  className="flex w-full items-center justify-between
                             text-left text-lg font-semibold
                             text-darkBlue"
                >
                  <span>{faq.question}</span>

                  {/* PLUS / MINUS ICON */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="ml-4 flex h-8 w-8 items-center
                               justify-center rounded-full
                               border border-darkBlue/20
                               text-xl leading-none"
                  >
                    +
                  </motion.span>
                </button>

                {/* ANSWER */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: 'easeInOut',
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 text-darkBlue/80 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
