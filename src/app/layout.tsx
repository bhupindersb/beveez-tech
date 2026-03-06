import './globals.css'
import { Poppins } from 'next/font/google'
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
        {/* Preconnect to Adobe Font servers */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />

        {/* Preload Adobe font CSS */}
        <link
          rel="preload"
          href="https://use.typekit.net/dco4nvv.css"
          as="style"
        />

        {/* Load Adobe Fonts non-blocking */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/dco4nvv.css"
          media="print"
          onLoad={(e) => {
            const target = e.currentTarget
            target.media = 'all'
          }}
        />

        {/* Fallback for no JS */}
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/dco4nvv.css" />
        </noscript>

        {/* Schema Markup */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>

      <body className="antialiased bg-[#f2f1f6] font-body">
        {children}
      </body>
    </html>
  )
}