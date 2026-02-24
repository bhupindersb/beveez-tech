'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlanType } from './types'
import StepIndicator from '@/components/StepIndicator'
import { FromTo } from 'sanity'

/* ===============================
   CONFIG
================================ */

const VALID_PLANS: PlanType[] = [
  'starter',
  'growth',
  'performance',
  'custom',
]

const PLAN_DATA = {
  starter: {
    title: 'Starter Website',
    price: '$999+',
    timeline: '2–3 Weeks',
    features: ['Custom Design', 'Responsive Layout', 'CMS Setup'],
  },
  growth: {
    title: 'Growth Website',
    price: '$1499+',
    timeline: '3–5 Weeks',
    features: [
      'Everything in Starter',
      'Advanced SEO Structure',
      'Conversion Optimization',
    ],
  },
  performance: {
    title: 'Performance & Scale',
    price: '$2499+',
    timeline: '4–6 Weeks',
    features: [
      'Everything in Growth',
      'Performance Optimization',
      'Scalable Architecture',
    ],
  },
  custom: {
    title: 'Custom Project',
    price: 'Custom Quote',
    timeline: 'Depends on Scope',
    features: [
      'Fully Tailored Solution',
      'Strategic Planning',
      'Flexible Delivery Model',
    ],
  },
}

/* ===============================
   MAIN COMPONENT
================================ */

export default function StartProjectClient() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan')

  const [selectedPlan, setSelectedPlan] =
    useState<PlanType>('starter')

  const [step, setStep] = useState<1 | 2>(1)

  const [form, setForm] = useState({
  name: '',
  email: '',
  company: '',
  goals: '',
  details: '',
  website: '' // honeypot
})


  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    if (
      planParam &&
      VALID_PLANS.includes(planParam as PlanType)
    ) {
      setSelectedPlan(planParam as PlanType)
    }
  }, [planParam])

  const planInfo = PLAN_DATA[selectedPlan]

  /* ===============================
     VALIDATION
  ================================ */

  function validate() {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* ===============================
     SUBMIT HANDLER
  ================================ */

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setApiError(null)
    setSuccess(false)

    if (!validate()) return

    try {
      setLoading(true)

      const res = await fetch('/api/start-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          plan: selectedPlan,
          FromType: 'start-project',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSuccess(true)
      setForm({
        name: '',
        email: '',
        company: '',
        goals: '',
        details: '',
        website: '',
      })

    } catch (err: any) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-[120px] pb-[80px] bg-gradient-to-b from-[#f7f9fc] to-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-5xl font-heading font-semibold text-darkBlue">
            Let’s Build Something That Moves Your Business Forward
          </h1>

          <p className="mt-6 text-lg text-darkBlue/70 max-w-2xl mx-auto">
            Choose a plan and tell us about your goals — we’ll tailor everything around your vision.
          </p>

          <div className="flex justify-center gap-8 mt-10 text-sm text-darkBlue/70">
            <span>✓ Transparent Pricing</span>
            <span>✓ Clear Timeline</span>
            <span>✓ Direct Founder Communication</span>
          </div>
        </div>
      </section>

      {/* STEP INDICATOR */}
      <div className="max-w-[900px] mx-auto px-6">
        <StepIndicator step={step} onStepChange={setStep} />
      </div>

      {/* CONTENT */}
      <section className="pb-[120px]">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[2fr_1fr] gap-16">

          {/* LEFT SIDE */}
          <div>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-heading mb-10 text-darkBlue">
                    Choose your plan
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {VALID_PLANS.map((plan) => {
                      const info = PLAN_DATA[plan]
                      const isActive = selectedPlan === plan

                      return (
                        <div
                          key={plan}
                          onClick={() => setSelectedPlan(plan)}
                          className={`
                            cursor-pointer rounded-3xl p-8 border transition-all duration-300
                            ${
                              isActive
                                ? 'border-[#cf5a20] bg-gradient-to-br from-[#fff6f0] to-[#ffe8d6] shadow-xl scale-[1.02]'
                                : 'border-gray-200 bg-white hover:shadow-lg hover:-translate-y-1'
                            }
                          `}
                        >
                          <h3 className="text-xl font-semibold text-darkBlue">
                            {info.title}
                          </h3>

                          <div className="mt-4 text-2xl font-bold text-darkBlue">
                            {info.price}
                          </div>

                          <div className="mt-4 text-sm text-darkBlue/70">
                            Delivery: {info.timeline}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="mt-12 bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                               text-white px-10 py-4 rounded-full font-semibold
                               hover:opacity-90 transition"
                  >
                    Continue →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-heading mb-10 text-darkBlue">
                    Tell us about your project
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      placeholder="Your name"
                      value={form.name}
                      onChange={(v) =>
                        setForm({ ...form, name: v })
                      }
                      error={errors.name}
                    />

                    <Input
                      placeholder="Your email"
                      value={form.email}
                      onChange={(v) =>
                        setForm({ ...form, email: v })
                      }
                      error={errors.email}
                    />

                    <Input
                      placeholder="Business / Brand name"
                      value={form.company}
                      onChange={(v) =>
                        setForm({ ...form, company: v })
                      }
                    />

                    <Input
                      placeholder="Project goals"
                      value={form.goals}
                      onChange={(v) =>
                        setForm({ ...form, goals: v })
                      }
                    />

                    <Textarea
                      placeholder="Tell us more about your project..."
                      value={form.details}
                      onChange={(v) =>
                        setForm({ ...form, details: v })
                      }
                    />

                    <input
                      type="text"
                      style={{ display: 'none' }}
                      value={form.website}
                      onChange={(e) =>
                        setForm({ ...form, website: e.target.value })
                      }
                    />

                    <button
                      disabled={loading}
                      className="mt-6 bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                                 text-white px-10 py-4 rounded-full font-semibold
                                 hover:opacity-90 transition disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Submit Request'}
                    </button>

                    {success && (
                      <div className="p-5 bg-green-50 border border-green-200 text-green-700 rounded-2xl">
                        🎉 Thank you! We'll get back to you within 24 hours.
                      </div>
                    )}

                    {apiError && (
                      <div className="p-5 bg-red-50 border border-red-200 text-red-600 rounded-2xl">
                        {apiError}
                      </div>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:block">
            <div className="sticky top-28 bg-white rounded-3xl p-8 shadow-xl border">
              <h3 className="text-xl font-semibold text-darkBlue">
                {planInfo.title}
              </h3>

              <div className="mt-4 text-3xl font-bold text-darkBlue">
                {planInfo.price}
              </div>

              <div className="mt-4">
                <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                  Estimated {planInfo.timeline}
                </span>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-darkBlue/70">
                {planInfo.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>

              <div className="mt-10 p-6 bg-gray-50 rounded-2xl text-sm">
                <p className="italic">
                  “They exceeded expectations in every project.”
                </p>
                <div className="mt-2 font-semibold text-darkBlue">
                  — SaaS Founder
                </div>
              </div>
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
  value?: string
  onChange?: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full rounded-2xl border px-6 py-4
          focus:outline-none focus:ring-2
          ${
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-200 focus:ring-orange-500'
          }`}
      />
      {error && (
        <p className="text-sm text-red-500 mt-2">
          {error}
        </p>
      )}
    </div>
  )
}

function Textarea({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value?: string
  onChange?: (v: string) => void
}) {
  return (
    <textarea
      placeholder={placeholder}
      rows={5}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full rounded-2xl border border-gray-200 px-6 py-4
                 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  )
}
