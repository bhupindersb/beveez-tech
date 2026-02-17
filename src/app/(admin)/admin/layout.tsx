import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${poppins.className} min-h-screen bg-gray-100`}>

      {/* ADMIN HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO BLOCK */}
          <Link
            href="/admin"
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.png"
              alt="Beveez Tech"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div className="leading-tight">
              <div className="text-lg font-semibold text-gray-900">
                Beveez Tech
              </div>
              <div className="text-xs text-gray-500">
                Admin Dashboard
              </div>
            </div>
          </Link>

          {/* NAV */}
          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link
              href="/admin"
              className="hover:text-[#cf5a20] transition"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/leads"
              className="hover:text-[#cf5a20] transition"
            >
              Leads
            </Link>

            <form action="/admin/logout" method="POST">
              <button className="text-red-500 hover:text-red-600 transition">
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}
