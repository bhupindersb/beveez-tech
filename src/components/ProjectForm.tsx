'use client'

import { PlanType } from '@/lib/startProject/types'

interface Props {
  selectedPlan: PlanType | null
}

export default function ProjectForm({ selectedPlan }: Props) {
  if (!selectedPlan) {
    return (
      <p className="text-gray-500">
        Please select a plan to continue.
      </p>
    )
  }

  return (
    <div className="rounded-3xl border p-8">
      <h3 className="text-2xl font-heading font-semibold mb-4">
        Start your {selectedPlan} project
      </h3>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your name"
          className="w-full rounded-lg border px-4 py-3"
        />

        <input
          type="email"
          placeholder="Your email"
          className="w-full rounded-lg border px-4 py-3"
        />

        <textarea
          placeholder="Tell us about your project"
          rows={4}
          className="w-full rounded-lg border px-4 py-3"
        />

        <button
          type="submit"
          className="rounded-full bg-gradient-to-r
                     from-[#cf5a20] to-[#f68f1e]
                     px-10 py-4 text-white font-semibold"
        >
          Submit Request
        </button>
      </form>
    </div>
  )
}
