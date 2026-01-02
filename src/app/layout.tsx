import './globals.css'
import { getSiteSettings } from '../sanity/lib/getSiteSettings'
import Navbar from '@/components/Navbar'
import { Poppins } from 'next/font/google'

import Footer from '@/components/Footer'
import { getFooterSettings } from '@/sanity/lib/getFooterSettings'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

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
        <link rel="stylesheet" href="https://use.typekit.net/dco4nvv.css" />
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
