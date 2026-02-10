'use client'

import { PlanType } from '@/lib/startProject/types'

interface Props {
  value: PlanType | null
  onChange: (plan: PlanType) => void
}

export default function PlanSelector({ value, onChange }: Props) {
  const plans: { id: PlanType; label: string }[] = [
    { id: 'starter', label: 'Starter Website' },
    { id: 'growth', label: 'Growth Website' },
    { id: 'performance', label: 'Performance & Scale' },
    { id: 'custom', label: 'Custom Project' },
  ]

  return (
    <div>
      <h2 className="text-3xl font-heading font-bold mb-6">
        Choose your plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => onChange(plan.id)}
            className={`rounded-2xl border p-6 text-left transition
              ${
                value === plan.id
                  ? 'border-orange bg-orange/5'
                  : 'border-gray-200 hover:border-orange'
              }
            `}
          >
            <p className="text-lg font-semibold">{plan.label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
