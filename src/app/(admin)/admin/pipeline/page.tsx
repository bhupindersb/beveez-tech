import { prisma } from '@/lib/prisma'

export default async function Pipeline() {
  const leads = await prisma.lead.findMany()

  const columns = {
    new: leads.filter(l => l.status === 'new'),
    contacted: leads.filter(l => l.status === 'contacted'),
    closed: leads.filter(l => l.status === 'closed'),
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">

      {Object.entries(columns).map(([status, items]) => (
        <div key={status} className="bg-gray-50 p-6 rounded-3xl">

          <h2 className="font-semibold mb-4 capitalize">
            {status}
          </h2>

          <div className="space-y-4">
            {items.map((lead) => (
              <div
                key={lead.id}
                className="bg-white p-4 rounded-xl shadow"
              >
                <div className="font-medium">
                  {lead.name}
                </div>
                <div className="text-sm text-gray-500">
                  {lead.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  )
}
