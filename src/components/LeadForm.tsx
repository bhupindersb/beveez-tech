'use client'

import { useState } from 'react'

export default function LeadForm({
  title,
  subtitle,
  fields,
  formType,
}: {
  title: string
  subtitle?: string
  fields: any[]
  formType: string
}) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      goals: formData.get('message'),
      details: null,
      plan: 'custom',
      formType,
      website: '',
    }

    await fetch('/api/start-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    setLoading(false)
    setSuccess(true)
    e.target.reset()
  }

  if (success) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center">
        <h3 className="text-2xl font-bold text-darkBlue mb-4">
          Thank you!
        </h3>
        <p className="text-darkBlue/70">
          We’ll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl">
      <h3 className="text-3xl font-bold text-darkBlue mb-4">
        {title}
      </h3>

      {subtitle && (
        <p className="mb-10 text-darkBlue/70">
          {subtitle}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field: any, i: number) => {
          if (field.type === 'textarea') {
            return (
              <textarea
                key={i}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-darkOrange"
              />
            )
          }

          if (field.type === 'select') {
            return (
              <select
                key={i}
                name={field.name}
                required={field.required}
                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-darkOrange"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt: string, i: number) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )
          }

          return (
            <input
              key={i}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-darkOrange"
            />
          )
        })}

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] py-4 text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}