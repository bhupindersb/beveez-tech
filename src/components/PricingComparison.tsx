'use client'

interface Plan {
  title: string
  features?: string[]
}

export default function PricingComparison({
  plans,
}: {
  plans: Plan[]
}) {
  return (
    <section className="py-[120px] bg-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="text-[40px] md:text-[64px] font-heading font-bold text-darkBlue text-center mb-16">
          Compare Plans
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 border-b">Features</th>
                {plans.map((plan, i) => (
                  <th key={i} className="text-center p-4 border-b">
                    {plan.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from(
                new Set(plans.flatMap(p => p.features ?? []))
              ).map((feature, i) => (
                <tr key={i}>
                  <td className="p-4 border-b text-darkBlue">
                    {feature}
                  </td>
                  {plans.map((plan, j) => (
                    <td
                      key={j}
                      className="p-4 border-b text-center"
                    >
                      {plan.features?.includes(feature) ? '✔' : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
