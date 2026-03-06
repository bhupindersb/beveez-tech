import './globals.css'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import OrganizationSchema from '@/components/schema/OrganizationSchema'
import WebsiteSchema from '@/components/schema/WebsiteSchema'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
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
        {/* Preconnect Adobe font servers */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />

        {/* Schema Markup */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>

      <body className="antialiased bg-[#f2f1f6] font-body">

        {/* Load Adobe Fonts non-blocking */}
        <Script
          src="https://use.typekit.net/dco4nvv.js"
          strategy="afterInteractive"
        />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}