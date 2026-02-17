'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate() {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error()

      setSuccess(true)
      setForm({
        name: '',
        email: '',
        company: '',
        message: '',
      })
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-[120px] pb-[80px] bg-gradient-to-b from-[#f7f9fc] to-white text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-5xl font-heading font-semibold text-darkBlue">
            Let’s Talk About Your Project
          </h1>

          <p className="mt-6 text-lg text-darkBlue/70">
            Whether you have a clear plan or just an idea, we’d love to hear from you.
            Fill out the form and we’ll get back within 24 hours.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-[120px]">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-10 rounded-3xl shadow-xl border"
          >
            <h2 className="text-2xl font-semibold mb-8 text-darkBlue">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                error={errors.name}
              />

              <Input
                placeholder="Your Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                error={errors.email}
              />

              <Input
                placeholder="Company (Optional)"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
              />

              <Textarea
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                error={errors.message}
              />

              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                           text-white py-4 rounded-full font-semibold
                           hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {success && (
                <p className="text-green-600 font-semibold mt-4">
                  Thank you! We’ll be in touch soon.
                </p>
              )}
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <div className="space-y-10">

            <div className="bg-white p-8 rounded-3xl shadow-xl border">
              <h3 className="text-xl font-semibold text-darkBlue mb-4">
                Direct Contact
              </h3>
              <p className="text-darkBlue/70">
                Email: hello@beveez.tech
              </p>
              <p className="text-darkBlue/70 mt-2">
                Based in India, working globally.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#cf5a20] to-[#f68f1e]
                            text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-semibold mb-4">
                Why Work With Us?
              </h3>
              <ul className="space-y-3 text-sm">
                <li>✓ Founder-led execution</li>
                <li>✓ Fast turnaround</li>
                <li>✓ Clear communication</li>
                <li>✓ Conversion-focused strategy</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

/* ===============================
   INPUT COMPONENTS
================================ */

function Input({
  placeholder,
  value,
  onChange,
  error,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl border px-6 py-4
          focus:outline-none focus:ring-2
          ${
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-200 focus:ring-orange-500'
          }`}
      />
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}

function Textarea({
  placeholder,
  value,
  onChange,
  error,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <textarea
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl border px-6 py-4
          focus:outline-none focus:ring-2
          ${
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-200 focus:ring-orange-500'
          }`}
      />
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}
