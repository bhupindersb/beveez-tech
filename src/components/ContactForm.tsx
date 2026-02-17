'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    await fetch('/api/start-project', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        goals: formData.get('message'),
        plan: 'custom',
      }),
    })

    setLoading(false)
    setSuccess(true)
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        name="name"
        placeholder="Your Name"
        required
        className="w-full border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500"
      />

      <input
        name="email"
        placeholder="Your Email"
        type="email"
        required
        className="w-full border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500"
      />

      <input
        name="company"
        placeholder="Company (Optional)"
        className="w-full border rounded-2xl px-6 py-4"
      />

      <textarea
        name="message"
        placeholder="Tell us about your project"
        rows={5}
        required
        className="w-full border rounded-2xl px-6 py-4"
      />

      <button
        disabled={loading}
        className="bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                   text-white px-10 py-4 rounded-full font-semibold
                   hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {success && (
        <p className="text-green-600 font-semibold">
          Message sent successfully!
        </p>
      )}
    </form>
  )
}
