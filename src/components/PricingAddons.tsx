'use client'

interface Addon {
  title: string
  description?: string
  price?: string
}

export default function PricingAddons({ addons }: { addons: Addon[] }) {
  if (!addons?.length) return null

  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-[960px] px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-darkBlue">
          Optional Add-Ons
        </h2>

        <div className="mt-8 space-y-6">
          {addons.map((addon, i) => (
            <div
              key={i}
              className="rounded-xl border border-darkBlue/10 p-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-darkBlue">
                  {addon.title}
                </h3>
                {addon.price && (
                  <span className="text-orange font-semibold">
                    {addon.price}
                  </span>
                )}
              </div>

              {addon.description && (
                <p className="mt-2 text-darkBlue/70">
                  {addon.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
