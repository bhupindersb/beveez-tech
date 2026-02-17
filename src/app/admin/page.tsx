import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (token !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const totalLeads = await prisma.lead.count()

  const newLeads = await prisma.lead.count({
    where: { status: 'new' },
  })

  const contactedLeads = await prisma.lead.count({
    where: { status: 'contacted' },
  })

  const closedLeads = await prisma.lead.count({
    where: { status: 'closed' },
  })

  return (
    <div>
      <h1 className="text-3xl font-semibold text-darkBlue mb-12">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={totalLeads} />
        <StatCard title="New" value={newLeads} color="yellow" />
        <StatCard title="Contacted" value={contactedLeads} color="blue" />
        <StatCard title="Closed" value={closedLeads} color="green" />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  color = 'default',
}: {
  title: string
  value: number
  color?: string
}) {
  const colorMap: Record<string, string> = {
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    default: 'bg-gray-100 text-gray-700',
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border">
      <div className="text-sm text-gray-500 mb-3">
        {title}
      </div>
      <div
        className={`inline-block px-4 py-2 rounded-full text-2xl font-bold ${colorMap[color]}`}
      >
        {value}
      </div>
    </div>
  )
}
