import '../globals.css'
import { getSiteSettings } from '@/sanity/lib/getSiteSettings'
import { getFooterSettings } from '@/sanity/lib/getFooterSettings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: {
    default: 'Beveez Tech — Web Design, Development & SEO for Startups',
    template: '%s | Beveez Tech',
  },
  description:
    'Beveez Tech helps startups, founders, and small businesses build fast, scalable websites optimized for SEO, performance, and conversions.',
  metadataBase: new URL('https://beveez.tech'),
  openGraph: {
    title: 'Beveez Tech — Web Design, Development & SEO for Startups',
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
  icons: {
    icon: '/favicon-v2.png',
    apple: '/favicon-v2.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  const footerSettings = await getFooterSettings()

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Adobe Fonts – All Round Gothic */}
        <link rel="stylesheet" href="https://use.typekit.net/dco4nvv.css" />

        {/* Razorpay */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

      </head>

      <body className="antialiased font-body bg-[#f2f1f6]">
        {settings && <Navbar settings={settings} />}
        {children}
        {footerSettings && <Footer data={footerSettings} />}
      </body>
    </html>
  )
}
