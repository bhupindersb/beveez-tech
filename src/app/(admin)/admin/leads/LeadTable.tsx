'use client'

import { useState, useMemo, useEffect } from 'react'

interface Note {
  id: string
  text: string
  createdAt: string
}

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
  notes?: Note[]
}

export default function LeadTable({ leads }: { leads: Lead[] }) {
  const [data, setData] = useState(leads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [noteInput, setNoteInput] = useState('')
  const [loadingNote, setLoadingNote] = useState(false)

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedLead(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  async function addNote() {
    if (!noteInput.trim() || !selectedLead) return

    setLoadingNote(true)

    const res = await fetch('/api/admin/add-lead-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: selectedLead.id,
        text: noteInput,
      }),
    })

    const newNote = await res.json()

    const updatedLead = {
      ...selectedLead,
      notes: [newNote, ...(selectedLead.notes || [])],
    }

    setData((prev) =>
      prev.map((lead) =>
        lead.id === selectedLead.id ? updatedLead : lead
      )
    )

    setSelectedLead(updatedLead)
    setNoteInput('')
    setLoadingNote(false)
  }

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Form</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">{lead.name}</td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">{lead.formType}</td>
                <td className="px-6 py-4">{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <div
          onClick={() => setSelectedLead(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold mb-6">Lead Details</h2>

            <div className="space-y-3 text-sm mb-6">
              <div><strong>Name:</strong> {selectedLead.name}</div>
              <div><strong>Email:</strong> {selectedLead.email}</div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Internal Notes</h3>

              <div className="space-y-3 mb-4">
                {selectedLead.notes?.map((note) => (
                  <div
                    key={note.id}
                    className="bg-gray-100 p-3 rounded text-sm"
                  >
                    {note.text}
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(note.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="border rounded px-3 py-2 text-sm w-full"
                  placeholder="Add note..."
                />
                <button
                  onClick={addNote}
                  disabled={loadingNote}
                  className="bg-orange-500 text-white px-4 rounded"
                >
                  {loadingNote ? 'Saving...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}