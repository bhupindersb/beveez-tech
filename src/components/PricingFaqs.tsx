'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Faq {
  question: string
  answer: string
}

export default function PricingFaqs({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section className="py-[120px] bg-white">
      <div className="mx-auto max-w-[900px] px-6">
        
        {/* SECTION HEADER */}
        <div className="mb-16 text-center">
          <h2 className="text-[36px] md:text-[56px] font-heading font-bold text-darkBlue">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-darkBlue/70">
            Clear answers to help you move forward with confidence.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              defaultOpen={i < 2} // 🔥 first two open by default
            />
          ))}
        </div>

        {/* CTA BELOW FAQ */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-darkBlue/70">
            Still have questions?
          </p>
          <a
            href="/start-your-project"
            className="inline-block rounded-full
                       bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                       px-12 py-6 text-white font-semibold
                       transition hover:from-[#f68f1e] hover:to-[#cf5a20]"
          >
            Start a Conversation
          </a>
        </div>

      </div>
    </section>
  )
}

/* ================= ITEM ================= */

function FaqItem({
  faq,
  defaultOpen = false,
}: {
  faq: Faq
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className="rounded-2xl border border-darkBlue/10
                 bg-white shadow-sm overflow-hidden"
    >
      {/* QUESTION */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between
                   px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-darkBlue">
          {faq.question}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="ml-4 text-darkBlue"
        >
          <ChevronDown size={22} />
        </motion.span>
      </button>

      {/* ANSWER */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="px-6 pb-6"
          >
            <p className="text-darkBlue/80 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
