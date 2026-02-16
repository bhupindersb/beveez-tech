import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP BAR */}
      <header className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-darkBlue">
            Beveez Tech Admin
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/admin" className="hover:text-[#cf5a20]">
              Dashboard
            </Link>
            <Link href="/admin/leads" className="hover:text-[#cf5a20]">
              Leads
            </Link>
            <form action="/admin/logout" method="POST">
              <button className="text-red-500 hover:text-red-600">
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
