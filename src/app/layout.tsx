import './globals.css'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import OrganizationSchema from '@/components/schema/OrganizationSchema'
import WebsiteSchema from '@/components/schema/WebsiteSchema'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Beveez Tech',
  description: 'High-performance websites & digital systems.',
  icons: {
    icon: '/favicon-v2.png',
    shortcut: '/favicon-v2.png',
    apple: '/favicon-v2.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Adobe Fonts */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/dco4nvv.css"
        />

        {/* Schema Markup */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>

      <body className="antialiased bg-[#f2f1f6] font-body">
        {/* Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  )
}