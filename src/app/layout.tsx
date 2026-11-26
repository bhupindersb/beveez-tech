import './globals.css'
import { Poppins, Comfortaa } from 'next/font/google'
import OrganizationSchema from '@/components/schema/OrganizationSchema'
import WebsiteSchema from '@/components/schema/WebsiteSchema'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-comfortaa',
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
    <html
      lang="en"
      className={`${poppins.variable} ${comfortaa.variable}`}
    >
      <head>
        {/* Schema Markup */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>

      <body className="antialiased bg-[#f2f1f6] font-body">
        {children}
        {process.env.VERCEL_ENV === 'preview' && <script async src="https://beveez-ai-git-feat-dashboard-guida-9078b5-bhupindersbs-projects.vercel.app/ansivra-widget.js" data-assistant="ba85f93f-392f-4f17-87ac-88de9d471981" />}
      </body>
    </html>
  )
}