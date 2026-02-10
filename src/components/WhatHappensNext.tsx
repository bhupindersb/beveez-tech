export default function WhatHappensNext() {
  const steps = [
    'We review your details',
    'We clarify scope & requirements',
    'We propose next steps',
  ]

  return (
    <section className="py-[100px] bg-gray-50">
      <div className="mx-auto max-w-[1000px] px-6">
        <h2 className="text-center text-[32px] font-heading font-semibold text-darkBlue">
          What Happens Next
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-8 text-center shadow"
            >
              <div className="mb-4 text-orange font-bold text-xl">
                {i + 1}
              </div>
              <p className="text-darkBlue">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
