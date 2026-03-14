import Link from 'next/link'

export default function PricingSection({
  section,
  plans,
}: {
  section: any
  plans: any[]
}) {
  if (!section || !plans?.length) return null

  return (
    <section className="pb-[120px]">

      {/* HEADER ROW */}
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 gap-10 px-6 mb-20 md:grid-cols-[15%_50%_35%] flex items-center">
        
        {/* BADGE */}
        <div className="flex justify-center md:justify-start">
          <span className="inline-block rounded-lg bg-white border px-5 py-3 text-base">
            {section.badgeText}
          </span>
        </div>

        {/* HEADING */}
        <h2 className="text-[48px] md:text-[72px] font-heading font-bold text-darkBlue leading-none text-center md:text-left">
          {section.heading}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-center md:text-left">
          {section.description}
        </p>
      </div>

      {/* PRICING CARDS */}
      <div className="mx-auto w-[90%] max-w-[1760px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="rounded-[40px] bg-white p-10 flex flex-col items-center md:items-start"
          >
            {/* DOT */}
            <span className="mb-4 block h-2 w-2 rounded-full bg-darkOrange" />

            {/* TITLE */}
            <h3 className="text-2xl font-semibold font-heading text-darkBlue text-center md:text-left">
              {plan.title}
            </h3>

            <p className="mt-3 text-gray-600 text-center md:text-left">
              {plan.description}
            </p>

            <div className="my-6 h-[2px] bg-darkOrange w-full" />

            {/* PRICE */}
            <div className="text-6xl font-normal font-heading text-darkBlue">
              {plan.price}
            </div>

            {/* CTA */}
            {plan.ctaText && (
              <Link
                href={plan.paymentLink || '#'}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-12 py-8 text-white font-normal text-center transition-all hover:from-[#f68f1e] hover:to-[#cf5a20]"
              >
                {plan.ctaText}
              </Link>
            )}

            {/* FEATURES */}
            <div className="mt-8">
              <p className="mb-4 font-semibold text-darkBlue text-center md:text-left">
                What’s included?
              </p>
              <ul className="space-y-3 text-gray-600">
                {plan.features?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] text-center md:text-left">
                    <span className="text-darkOrange text-[24px] leading-none">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
