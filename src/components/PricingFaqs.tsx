'use client'

import { useState } from 'react'

interface Faq {
  question: string
  answer: string
}

export default function PricingFaqs({ faqs }: { faqs: Faq[] }) {
  if (!faqs?.length) return null

  return (
    <section className="py-[120px] bg-gray-50">
      <div className="mx-auto max-w-[900px] px-6">
        <h2 className="text-[48px] font-heading font-bold text-darkBlue mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl bg-white border p-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="font-semibold text-darkBlue">
          {faq.question}
        </span>
        <span>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <p className="mt-4 text-darkBlue/70">
          {faq.answer}
        </p>
      )}
    </div>
  )
}
