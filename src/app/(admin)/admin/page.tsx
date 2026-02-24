import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (token !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      notes: true,
    },
  })

  const totalLeads = leads.length
  const newLeads = leads.filter((l) => l.status === 'new').length
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length
  const closedLeads = leads.filter((l) => l.status === 'closed').length

  return (
    <>
      <h1 className="text-3xl font-semibold text-darkBlue mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Leads</p>
          <p className="text-2xl font-bold">{totalLeads}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">New</p>
          <p className="text-2xl font-bold">{newLeads}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Contacted</p>
          <p className="text-2xl font-bold">{contactedLeads}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Closed</p>
          <p className="text-2xl font-bold">{closedLeads}</p>
        </div>
      </div>
    </>
  )
}