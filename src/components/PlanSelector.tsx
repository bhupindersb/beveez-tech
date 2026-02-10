'use client'

import { PlanType } from '@/app/start-your-project/types'

interface Props {
  value: PlanType
  onChange: (plan: PlanType) => void
}

const plans: { id: PlanType; label: string }[] = [
  { id: 'starter', label: 'Starter Website' },
  { id: 'growth', label: 'Growth Website' },
  { id: 'performance', label: 'Performance & Scale' },
  { id: 'custom', label: 'Custom Project' },
]

export default function PlanSelector({ value, onChange }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-2xl font-heading font-semibold mb-6">
        Choose your plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map(plan => {
          const active = value === plan.id

          return (
            <button
              key={plan.id}
              onClick={() => onChange(plan.id)}
              className={`rounded-2xl border p-6 text-left transition
                ${
                  active
                    ? 'border-darkOrange bg-orange-50'
                    : 'border-gray-200 hover:border-darkOrange/50'
                }
              `}
            >
              <span className="text-lg font-semibold text-darkBlue">
                {plan.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
