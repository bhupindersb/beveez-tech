'use client'

import { useState } from 'react'

interface Faq {
  question: string
  answer: string
}

export default function PricingFaqs({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)

  if (!faqs?.length) return null

  return (
    <section className="py-[120px] bg-gray-50">
      <div className="mx-auto max-w-[960px] px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-darkBlue">
          Pricing FAQs
        </h2>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-darkBlue/10 bg-white"
            >
              <button
                className="w-full p-6 text-left font-semibold text-darkBlue"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.question}
              </button>

              {open === i && (
                <div className="px-6 pb-6 text-darkBlue/80">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
