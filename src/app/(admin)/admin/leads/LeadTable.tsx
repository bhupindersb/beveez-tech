'use client'

import { useState, useMemo } from 'react'

interface Lead {
  id: string
  createdAt: string
  name: string
  email: string
  company?: string | null
  plan: string
  status: string
}

export default function LeadTable({ leads }: { leads: Lead[] }) {
  const [data, setData] = useState(leads)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/update-lead-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })

    setData(prev =>
      prev.map(lead =>
        lead.id === id ? { ...lead, status } : lead
      )
    )
  }

  const filteredLeads = useMemo(() => {
    return data.filter(lead => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' ||
        lead.status === statusFilter

      const leadDate = new Date(lead.createdAt)

      const matchesFrom =
        !fromDate || leadDate >= new Date(fromDate)

      const matchesTo =
        !toDate || leadDate <= new Date(toDate)

      return (
        matchesSearch &&
        matchesStatus &&
        matchesFrom &&
        matchesTo
      )
    })
  }, [data, search, statusFilter, fromDate, toDate])

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg text-sm"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg text-sm"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border px-4 py-2 rounded-lg text-sm"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border px-4 py-2 rounded-lg text-sm"
        />
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="text-left bg-gray-50">
          <tr>
            <th className="p-4">Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="py-4 font-medium">
                {lead.name}
              </td>

              <td>{lead.email}</td>

              <td>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                  {lead.plan}
                </span>
              </td>

              <td>
                <select
                  value={lead.status}
                  onChange={(e) =>
                    updateStatus(lead.id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
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
