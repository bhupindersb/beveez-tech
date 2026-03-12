'use client'

import { useState } from 'react'

export default function FreeAuditPage() {

  const [url, setUrl] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function runAudit(e:any) {

    e.preventDefault()

    if (!url) return

    setLoading(true)

    try {

      const res = await fetch('/api/pagespeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await res.json()

      setScore(data.score)

    } catch (err) {

      console.error(err)
      alert('Unable to analyze the website.')

    }

    setLoading(false)

  }


  async function submitAudit(e:any) {

    e.preventDefault()

    const form = e.target

    setSubmitting(true)

    const payload = {

      formType: 'free-audit',

      name: form.name.value,
      email: form.email.value,
      company: '',
      goals: '',
      plan: '',
      details: form.website.value

    }

    try {

      const res = await fetch('/api/start-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()

      console.log(result)

      if (res.ok) {

        alert('Audit request received. We will send your report within 24 hours.')

        form.reset()
        setScore(null)

      } else {

        alert(result.error || 'Server error occurred.')

      }

    } catch (error) {

      console.error(error)

      alert('Network error. Please try again.')

    }

    setSubmitting(false)

  }


  return (

    <main className="bg-[#f2f1f6] py-24 px-6">

      <div className="max-w-[900px] mx-auto">

        <h1 className="text-5xl font-heading font-bold text-center text-darkBlue">
          Free Website Performance Audit
        </h1>

        <p className="text-center mt-6 text-lg text-darkBlue/80">
          Discover what is slowing down your website and how to improve
          Core Web Vitals, SEO and loading speed.
        </p>



        {/* SPEED TEST */}

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
              onChange={(e)=>setUrl(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              className="bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
              text-white px-6 py-3 rounded-xl"
            >
              Test Speed
            </button>

          </form>


          {loading && (
            <p className="text-center mt-6">Analyzing website...</p>
          )}


          {score !== null && (

            <div className="mt-10 text-center">

              <p className="text-lg">Performance Score</p>

              <div className="text-6xl font-bold text-orange">
                {score}
              </div>

              <p className="mt-4 text-darkBlue/70">
                Get a full performance audit and improvement plan below.
              </p>

            </div>

          )}

        </div>



        {/* FORM */}

        <div className="bg-white mt-20 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-center text-darkBlue">
            Request Full Audit
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
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="website"
              required
              placeholder="Website URL"
              className="w-full border rounded-xl px-4 py-3"
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

        </div>



        {/* TRUST */}

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">

          <div>
            <p className="text-3xl font-bold text-darkBlue">20+</p>
            <p className="text-darkBlue/70">
              Years Experience
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-darkBlue">90+</p>
            <p className="text-darkBlue/70">
              PageSpeed Optimizations
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