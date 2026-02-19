'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

export default function ServiceFAQ({ faqs }: any) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mt-16 space-y-6">
      {faqs.map((faq: any, i: number) => {
        const isOpen = open === i

        return (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-2xl border border-darkBlue/10 p-6 transition hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between
                         text-left text-lg font-semibold
                         text-darkBlue"
            >
              <span>{faq.question}</span>

              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="ml-4 flex h-8 w-8 items-center
                           justify-center rounded-full
                           border border-darkBlue/20
                           text-xl leading-none"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
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
  )
}
