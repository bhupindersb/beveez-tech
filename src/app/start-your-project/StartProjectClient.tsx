'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlanType } from './types'

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

  const [selectedPlan, setSelectedPlan] = useState<PlanType>('starter')
  const [step, setStep] = useState<1 | 2>(1)

  useEffect(() => {
    if (planParam && VALID_PLANS.includes(planParam as PlanType)) {
      setSelectedPlan(planParam as PlanType)
    }
  }, [planParam])

  const planInfo = PLAN_DATA[selectedPlan]

  return (
    <>
      {/* ===============================
          HERO SECTION
      ================================ */}
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

      {/* ===============================
          STEP INDICATOR
      ================================ */}
      <div className="max-w-[900px] mx-auto px-6">
        <StepIndicator 
            step={step}
            onStepChange={setStep}
        />
      </div>

      {/* ===============================
          CONTENT AREA
      ================================ */}
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

                  <div className="space-y-6">
                    <Input placeholder="Your name" />
                    <Input placeholder="Your email" />
                    <Input placeholder="Business / Brand name" />
                    <Input placeholder="Project goals" />
                    <Textarea placeholder="Tell us more about your project..." />
                  </div>

                  <button
                    className="mt-10 bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                               text-white px-10 py-4 rounded-full font-semibold
                               hover:opacity-90 transition"
                  >
                    Submit Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE - SUMMARY */}
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
   STEP INDICATOR
================================ */

function StepIndicator({ step, onStepChange }: { step: 1 | 2; onStepChange: (step: 1 | 2) => void }) {
  return (
    <div className="flex items-center justify-center gap-8 mb-16 mt-12">
      <StepItem number={1} label="Choose Plan" active={step === 1} />
      <div className="w-20 h-[2px] bg-gray-300" />
      <StepItem number={2} label="Project Details" active={step === 2} />
    </div>
  )
}

function StepItem({
  number,
  label,
  active,
}: {
  number: number
  label: string
  active: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
        ${active ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'}`}
      >
        {number}
      </div>
      <span className={`font-medium ${active ? 'text-orange-600' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  )
}

/* ===============================
   INPUTS
================================ */

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-2xl border border-gray-200 px-6 py-4
                 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  )
}

function Textarea({ placeholder }: { placeholder: string }) {
  return (
    <textarea
      placeholder={placeholder}
      rows={5}
      className="w-full rounded-2xl border border-gray-200 px-6 py-4
                 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  )
}
