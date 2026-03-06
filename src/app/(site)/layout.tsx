import { getSiteSettings } from '@/sanity/lib/getSiteSettings'
import { getFooterSettings } from '@/sanity/lib/getFooterSettings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata = {
  title: {
    default: 'Beveez Tech — Web Design, Development & SEO for Startups',
    template: '%s | Beveez Tech',
  },
  description:
    'Beveez Tech helps startups, founders, and small businesses build fast, scalable websites optimized for SEO, performance, and conversions.',
  metadataBase: new URL('https://beveez.tech'),
  openGraph: {
    title:
      'Beveez Tech — Web Design, Development & SEO for Startups',
    description:
      'Modern web design and development for startups and founders worldwide. Fast, SEO-optimized, conversion-focused websites.',
    url: 'https://beveez.tech',
    siteName: 'Beveez Tech',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  const footerSettings = await getFooterSettings()

  return (
    <>
      {settings && <Navbar settings={settings} />}
      <GoogleAnalytics />
       <main>
        {children}
      </main>
      {footerSettings && <Footer data={footerSettings} />}
    </>
  )
}
