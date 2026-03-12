'use client'

import { useState } from 'react'

export default function FreeAuditPage() {

  const [url, setUrl] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function runAudit(e: any) {

    e.preventDefault()

    if (!url) return

    setLoading(true)
    setScore(null)

    try {

      const res = await fetch('/api/pagespeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await res.json()

      if (data.score) {
        setScore(data.score)
      } else {
        setMessage('Unable to analyze this website.')
      }

    } catch (err) {

      console.error(err)
      setMessage('Audit failed. Please try again.')

    }

    setLoading(false)
  }


  async function submitAudit(e: any) {

    e.preventDefault()

    const form = e.target

    setSubmitting(true)
    setMessage(null)

    const payload = {

      formType: 'free-audit',

      name: form.name.value,
      email: form.email.value,

      company: '',
      goals: '',
      details: form.website.value,
      plan: '',

      website_hidden: '' // honeypot field expected by your API

    }

    try {

      const res = await fetch('/api/start-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()

      if (result.success) {

        setMessage('✅ Audit request received. We will send your report within 24 hours.')

        form.reset()
        setScore(null)

      } else {

        setMessage('❌ Something went wrong. Please try again.')

      }

    } catch (err) {

      console.error(err)
      setMessage('❌ Something went wrong. Please try again.')

    }

    setSubmitting(false)
  }


  return (

    <main className="bg-[#f2f1f6] py-24 px-6">

      <div className="max-w-[900px] mx-auto">


        {/* HERO */}

        <div className="text-center">

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-darkBlue">

            Free Website Performance Audit

          </h1>

          <p className="mt-6 text-lg text-darkBlue/80 max-w-[650px] mx-auto">

            Instantly check your website speed and get a detailed audit
            showing how to improve your Core Web Vitals and SEO.

          </p>

        </div>



        {/* SPEED TEST TOOL */}

        <div className="bg-white mt-16 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-darkBlue text-center">

            Instant Website Speed Test

          </h2>


          <form
            onSubmit={runAudit}
            className="mt-8 flex flex-col md:flex-row gap-4"
          >

            <input
              type="url"
              required
              placeholder="https://yourwebsite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
            />

            <button
              className="bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
              text-white px-6 py-3 rounded-xl"
            >
              Test Speed
            </button>

          </form>


          {loading && (

            <p className="text-center mt-6">

              Running performance analysis...

            </p>

          )}


          {score !== null && (

            <div className="mt-10 text-center">

              <p className="text-lg text-darkBlue">

                Performance Score

              </p>

              <div className="text-6xl font-bold text-orange mt-2">

                {score}

              </div>

              <p className="mt-4 text-darkBlue/70">

                Request a full audit to improve this score.

              </p>

            </div>

          )}

        </div>



        {/* AUDIT FORM */}

        <div className="bg-white mt-20 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-center text-darkBlue">

            Request Your Free Audit

          </h2>

          <p className="text-center text-darkBlue/70 mt-2">

            Limited to 5 audits per week.

          </p>


          <form
            onSubmit={submitAudit}
            className="mt-10 space-y-6 max-w-[600px] mx-auto"
          >

            <input
              name="name"
              required
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              name="website"
              required
              placeholder="Website URL"
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* honeypot spam field */}

            <input
              type="text"
              name="website_hidden"
              className="hidden"
            />


            <button
              disabled={submitting}
              className="w-full rounded-full
              bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
              py-4 text-white font-semibold"
            >

              {submitting ? 'Submitting...' : 'Request Free Audit'}

            </button>

          </form>


          {message && (

            <p className="text-center mt-6 text-darkBlue">

              {message}

            </p>

          )}

        </div>



        {/* TRUST SIGNALS */}

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">

          <div>

            <p className="text-3xl font-bold text-darkBlue">

              20+

            </p>

            <p className="text-darkBlue/70">

              Years Web Development Experience

            </p>

          </div>

          <div>

            <p className="text-3xl font-bold text-darkBlue">

              90+

            </p>

            <p className="text-darkBlue/70">

              PageSpeed Optimization Results

            </p>

          </div>

          <div>

            <p className="text-3xl font-bold text-darkBlue">

              Core Web Vitals

            </p>

            <p className="text-darkBlue/70">

              Performance Specialist

            </p>

          </div>

        </div>

      </div>

    </main>

  )
}