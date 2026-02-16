import { prisma } from '@/lib/prisma'
import { Lead } from '@prisma/client'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const leads: Lead[] = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  })
  
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-10">
          Leads Dashboard
        </h1>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
                
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {lead.plan}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-600',
    contacted: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-green-100 text-green-700',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || 'bg-gray-100'
      }`}
    >
      {status}
    </span>
  )
}
