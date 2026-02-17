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

export default function LeadTable({
  leads,
}: {
  leads: Lead[]
}) {
  const [data, setData] = useState(leads)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  async function updateStatus(id: string, status: string) {
    try {
      setLoadingId(id)

      await fetch('/api/admin/update-lead-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })

      setData((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status } : lead
        )
      )
    } catch (error) {
      console.error('Failed to update status', error)
    } finally {
      setLoadingId(null)
    }
  }

  function getStatusClasses(status: string) {
    switch (status) {
      case 'new':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'contacted':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'closed':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  // Filter logic
  const filteredData = useMemo(() => {
    return data.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        (lead.company &&
          lead.company.toLowerCase().includes(search.toLowerCase()))

      const matchesStatus =
        statusFilter === 'all' || lead.status === statusFilter

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
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">

      {/* FILTER BAR */}
      <div className="p-6 border-b bg-gray-50 flex flex-wrap gap-4 items-center">

        <input
          type="text"
          placeholder="Search name, email or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-72"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {(search || statusFilter !== 'all' || fromDate || toDate) && (
          <button
            onClick={() => {
              setSearch('')
              setStatusFilter('all')
              setFromDate('')
              setToDate('')
            }}
            className="text-xs text-red-500 hover:text-red-600"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-left text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((lead) => (
              <tr
                key={lead.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-darkBlue">
                  {lead.name}
                  {lead.company && (
                    <div className="text-xs text-gray-500 mt-1">
                      {lead.company}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {lead.email}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                    {lead.plan}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full border ${getStatusClasses(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>

                    <select
                      value={lead.status}
                      disabled={loadingId === lead.id}
                      onChange={(e) =>
                        updateStatus(lead.id, e.target.value)
                      }
                      className="border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-400"
                >
                  No leads match your filters.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}
