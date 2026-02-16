'use client'

import { useState } from 'react'

interface Lead {
  id: string
  createdAt: string
  name: string
  email: string
  company?: string | null
  plan: string
  status: string
}

export default function LeadTable({
  leads,
}: {
  leads: Lead[]
}) {
  const [data, setData] = useState(leads)

  async function updateStatus(id: string, status: string) {
    await fetch('/api/update-lead-status', {
      method: 'POST',
      body: JSON.stringify({ id, status }),
    })

    setData((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      )
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {data.map((lead) => (
            <tr
              key={lead.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4">{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.plan}</td>

              <td>
                <select
                  value={lead.status}
                  onChange={(e) =>
                    updateStatus(
                      lead.id,
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-2 py-1"
                >
                  <option value="new">
                    New
                  </option>
                  <option value="contacted">
                    Contacted
                  </option>
                  <option value="closed">
                    Closed
                  </option>
                </select>
              </td>

              <td>
                {new Date(
                  lead.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
