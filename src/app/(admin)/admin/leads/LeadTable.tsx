'use client'

import { useState, useMemo, useEffect } from 'react'

interface Lead {
  id: string
  createdAt: string
  formattedDate: string
  name: string
  email: string
  company?: string | null
  plan: string
  status: string
  formType: string
  website?: string | null
  goals?: string | null
  details?: string | null
}

function getRelativeTime(dateString: string) {
  const now = new Date().getTime()
  const date = new Date(dateString).getTime()
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`

  return ''
}

export default function LeadTable({ leads }: { leads: Lead[] }) {
  const [data, setData] = useState(leads)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // ESC key close
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedLead(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

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

      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status })
      }
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
    <>
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
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Form Type</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium">
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
                    <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
                      {lead.formType.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                      {lead.plan}
                    </span>
                  </td>

                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex flex-col">
                      <span>{lead.formattedDate}</span>
                      <span className="text-xs text-gray-400">
                        {getRelativeTime(lead.createdAt)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selectedLead && (
        <div
          onClick={() => setSelectedLead(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative animate-[fadeIn_0.2s_ease-out]"
          >
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Lead Details
            </h2>

            <div className="space-y-4 text-sm">
              <div><strong>Name:</strong> {selectedLead.name}</div>

              <div className="flex items-center gap-3">
                <strong>Email:</strong> {selectedLead.email}
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(selectedLead.email)
                  }
                  className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                >
                  Copy
                </button>
              </div>

              {selectedLead.company && (
                <div><strong>Company:</strong> {selectedLead.company}</div>
              )}

              {selectedLead.website && (
                <div>
                  <strong>Website:</strong>{' '}
                  <a
                    href={selectedLead.website}
                    target="_blank"
                    className="text-orange-600 underline"
                  >
                    Visit Site
                  </a>
                </div>
              )}

              {selectedLead.goals && (
                <div>
                  <strong>Goals:</strong>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                    {selectedLead.goals}
                  </div>
                </div>
              )}

              {selectedLead.details && (
                <div>
                  <strong>Details:</strong>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                    {selectedLead.details}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t text-xs text-gray-400">
                Created: {selectedLead.formattedDate}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}