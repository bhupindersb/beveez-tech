'use client'

import { useState } from 'react'

interface Field {
  name: string
  type: string
  placeholder?: string
  required?: boolean
  label?: string
  options?: string[]
}

export default function LeadForm({
  title,
  subtitle,
  fields,
  formType,
}: {
  title: string
  subtitle?: string
  fields: Field[]
  formType: string
}) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot anti-spam
    if (formData.get('website_hidden')) {
      setLoading(false)
      return
    }

    const payload: Record<string, any> = {
      formType,
      plan: 'custom',
    }

    // Dynamically collect all form fields
    fields.forEach((field) => {
      payload[field.name] = formData.get(field.name)
    })

    try {
      const res = await fetch('/api/start-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Failed to submit form')
      }

      setSuccess(true)
      form.reset()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center">
        <h3 className="text-2xl font-bold text-darkBlue mb-4">
          Thank you!
        </h3>
        <p className="text-darkBlue/70">
          We’ve received your request and will respond within 24 hours.
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

        {/* Honeypot Field (hidden from users) */}
        <input
          type="text"
          name="website_hidden"
          style={{ display: 'none' }}
        />

        {fields.map((field, i) => {
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
                {field.options?.map((opt, idx) => (
                  <option key={idx} value={opt}>
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

        {error && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] py-4 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}