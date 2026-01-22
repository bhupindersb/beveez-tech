import { getAboutPage } from '@/sanity/lib/getAboutPage'
import { getSiteSettings } from '@/sanity/lib/getSiteSettings'
import AboutClient from './AboutClient'

export default async function AboutPage() {
  const [data, siteSettings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ])

  if (!data?.aboutHero) {
    return (
      <div className="py-32 text-center text-gray-500">
        About page content not found.
      </div>
    )
  }

  return <AboutClient data={data} siteSettings={siteSettings} />
}
