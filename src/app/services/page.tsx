import { getServicesPage } from '@/sanity/lib/getServicesPage'
import { getSiteSettings } from '@/sanity/lib/getSiteSettings'
import ServicesClient from './ServicesClient'

export default async function ServicesPage() {
  const [data, siteSettings] = await Promise.all([
    getServicesPage(),
    getSiteSettings(),
  ])

  if (!data?.hero) {
    return (
      <div className="py-32 text-center text-gray-500">
        Services page content not found.
      </div>
    )
  }

  return (
    <ServicesClient
      data={data}
      siteSettings={siteSettings}
    />
  )
}
