import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">

      {/* ADMIN HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="text-xl font-bold text-darkBlue">
            Beveez Tech Admin
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/admin" className="hover:text-[#cf5a20] transition">
              Dashboard
            </Link>

            <Link href="/admin/leads" className="hover:text-[#cf5a20] transition">
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

      {/* PAGE CONTENT */}
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}
