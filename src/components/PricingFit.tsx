'use client'

export default function PricingFit() {
  return (
    <section className="py-[80px] md:py-[120px] bg-[#0c1a2a] text-white">
      <div className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-3xl font-heading font-semibold mb-6">
            This is for you if…
          </h3>
          <ul className="space-y-4 text-white/80">
            <li>• You care about quality & long-term growth</li>
            <li>• You want SEO and performance done right</li>
            <li>• You prefer clarity over chaos</li>
            <li>• You’re building something serious</li>
          </ul>
        </div>

        <div>
          <h3 className="text-3xl font-heading font-semibold mb-6">
            This is NOT for you if…
          </h3>
          <ul className="space-y-4 text-white/60">
            <li>• You want the cheapest possible option</li>
            <li>• You’re not ready to invest in quality</li>
            <li>• You expect instant results with no effort</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
