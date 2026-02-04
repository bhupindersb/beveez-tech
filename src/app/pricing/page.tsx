import { getPricingPage } from '@/sanity/lib/getPricingPage'
import { getSiteSettings } from '@/sanity/lib/getSiteSettings'
import PricingClient from './PricingClient'

export default async function PricingPage() {
  const [data, siteSettings] = await Promise.all([
    getPricingPage(),
    getSiteSettings(),
  ])

  if (!data?.pricingPage) {
    return (
      <div className="py-32 text-center text-gray-500">
        Pricing page content not found.
      </div>
    )
  }

  return (
    <PricingClient
      data={data.pricingPage}
      ctaOverride={data.ctaOverride}
      siteSettings={siteSettings}
    />
  )
}
