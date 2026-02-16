import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const totalLeads = await prisma.lead.count()

  const newLeads = await prisma.lead.count({
    where: { status: 'new' },
  })

  const closedLeads = await prisma.lead.count({
    where: { status: 'closed' },
  })

  const thisMonth = new Date()
  thisMonth.setDate(1)

  const leadsThisMonth = await prisma.lead.count({
    where: {
      createdAt: {
        gte: thisMonth,
      },
    },
  })

  const conversionRate =
    totalLeads === 0
      ? 0
      : Math.round((closedLeads / totalLeads) * 100)

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold text-darkBlue">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard label="Total Leads" value={totalLeads} />
        <StatCard label="New Leads" value={newLeads} />
        <StatCard label="This Month" value={leadsThisMonth} />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-3xl font-bold text-darkBlue mt-2">
        {value}
      </div>
    </div>
  )
}
