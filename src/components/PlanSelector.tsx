'use client'

import { PlanType } from '@/app/start-your-project/types'
import { CheckCircle } from 'lucide-react'

interface Props {
  value: PlanType
  onChange: (value: PlanType) => void
}

const plans: {
  value: PlanType
  label: string
  description: string
  highlight?: boolean
}[] = [
  {
    value: 'starter',
    label: 'Starter Website',
    description: 'Perfect for small businesses',
  },
  {
    value: 'growth',
    label: 'Growth Website',
    description: 'Built to scale your brand',
    highlight: true,
  },
  {
    value: 'performance',
    label: 'Performance & Scale',
    description: 'High-performance architecture',
  },
  {
    value: 'custom',
    label: 'Custom Project',
    description: 'Tailored to your needs',
  },
]

export default function PlanSelector({ value, onChange }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-6">

      {plans.map((plan) => {
        const isSelected = value === plan.value

        return (
          <button
            key={plan.value}
            onClick={() => onChange(plan.value)}
            className={`
              relative p-6 rounded-2xl border transition-all duration-300
              text-left

              ${isSelected
                ? 'border-[#f68f1e] bg-[#fff7f2] shadow-lg scale-[1.02]'
                : 'border-[#e4eaec] bg-white hover:shadow-md hover:border-[#f68f1e]'
              }
            `}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-6 bg-gradient-to-r 
                               from-[#cf5a20] to-[#f68f1e] 
                               text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0f2e35]">
                {plan.label}
              </h3>

              {isSelected && (
                <CheckCircle className="text-[#f68f1e]" size={22} />
              )}
            </div>

            <p className="mt-2 text-sm text-[#6b7f85]">
              {plan.description}
            </p>
          </button>
        )
      })}

    </div>
  )
}
