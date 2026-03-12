'use client'

import { useState } from 'react'

export default function FreeAuditPage() {
  const [url, setUrl] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  async function runAudit(e: any) {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch('/api/pagespeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()

      setScore(data.score)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  async function submitAudit(e: any) {
    e.preventDefault()

    const form = e.target

    const data = {
      formType: 'free-audit',
      name: form.name.value,
      email: form.email.value,
      company: '',
      goals: '',
      details: form.website.value,
    }

    await fetch('/api/start-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    alert('Audit request received. We will contact you within 24 hours.')
  }

  return (
    <main className="bg-[#f2f1f6] py-24 px-6">

      <div className="max-w-[900px] mx-auto">

        <h1 className="text-5xl font-heading font-bold text-center text-darkBlue">
          Free Website Performance Audit
        </h1>

        <p className="text-center mt-6 text-lg text-darkBlue/80">
          Discover what is slowing down your website and how to improve
          your Core Web Vitals and SEO.
        </p>

        {/* QUICK SPEED TEST */}

        <div className="bg-white mt-16 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-darkBlue text-center">
            Run Instant Speed Test
          </h2>

          <form
            onSubmit={runAudit}
            className="mt-8 flex gap-4"
          >

            <input
              type="url"
              required
              placeholder="Enter your website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              className="bg-orange text-white px-6 rounded-xl"
            >
              Test
            </button>

          </form>

          {loading && (
            <p className="text-center mt-6">Analyzing website...</p>
          )}

          {score !== null && (
            <div className="mt-8 text-center">

              <p className="text-lg">
                Performance Score
              </p>

              <div className="text-5xl font-bold text-orange">
                {score}
              </div>

              <p className="mt-3 text-darkBlue/70">
                Want a full audit and improvement plan?
              </p>

            </div>
          )}

        </div>

        {/* AUDIT FORM */}

        <div className="bg-white mt-16 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-center text-darkBlue">
            Request Full Audit
          </h2>

          <form
            onSubmit={submitAudit}
            className="mt-10 space-y-6 max-w-[600px] mx-auto"
          >

            <input
              name="name"
              required
              placeholder="Your Name"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="website"
              required
              placeholder="Website URL"
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              className="w-full bg-gradient-to-r
              from-[#cf5a20] to-[#f68f1e]
              py-4 text-white rounded-full"
            >
              Request Free Audit
            </button>

          </form>

        </div>

      </div>

    </main>
  )
}