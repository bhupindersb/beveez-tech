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

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return (
    <div className="space-y-12">

      <h1 className="text-3xl font-semibold text-darkBlue">
        Dashboard Overview
      </h1>

      {/* Metric Cards */}
      <div className="grid md:grid-cols-4 gap-6">

        <DashboardCard title="Total Leads" value={totalLeads} color="purple" />
        <DashboardCard title="New Leads" value={newLeads} color="yellow" />
        <DashboardCard title="Contacted" value={contactedLeads} color="blue" />
        <DashboardCard title="Closed" value={closedLeads} color="green" />

      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border">
        <h2 className="text-lg font-semibold mb-6">Recent Leads</h2>

        <div className="space-y-4">
          {recentLeads.map((lead) => (
            <div key={lead.id} className="flex justify-between text-sm border-b pb-3">
              <span className="font-medium">{lead.name}</span>
              <span className="text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString('en-GB')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  color,
}: {
  title: string
  value: number
  color: 'purple' | 'yellow' | 'blue' | 'green'
}) {
  const colors = {
    purple: 'bg-purple-100 text-purple-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border p-8">
      <div className={`inline-block px-3 py-1 rounded-full text-xs ${colors[color]}`}>
        {title}
      </div>
      <div className="mt-6 text-4xl font-bold text-darkBlue">
        {value}
      </div>
    </div>
  )
}
