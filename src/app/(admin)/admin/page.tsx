import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (token !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const [
    totalLeads,
    newLeads,
    contactedLeads,
    closedLeads,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'new' } }),
    prisma.lead.count({ where: { status: 'contacted' } }),
    prisma.lead.count({ where: { status: 'closed' } }),
  ])

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-10">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={totalLeads} />
        <StatCard title="New" value={newLeads} color="orange" />
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
  color?: 'default' | 'orange' | 'blue' | 'green'
}) {
  const colors = {
    default: 'bg-white',
    orange: 'bg-orange-50 border-orange-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
  }

  return (
    <div
      className={`rounded-2xl p-6 border shadow-sm ${colors[color]}`}
    >
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold mt-2">
        {value}
      </div>
    </div>
  )
}
