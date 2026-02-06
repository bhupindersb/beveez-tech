'use client'

import { motion } from 'framer-motion'

interface Props {
  value: 'one-time' | 'monthly'
  onChange: (v: 'one-time' | 'monthly') => void
}

export default function PricingBillingToggle({ value, onChange }: Props) {
  return (
    <div className="flex justify-center mb-16">
      <div className="relative flex rounded-full bg-gray-200 p-1">
        {['one-time', 'monthly'].map(option => (
          <button
            key={option}
            onClick={() => onChange(option as any)}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition
              ${value === option ? 'text-white' : 'text-darkBlue'}
            `}
          >
            {option === 'one-time' ? 'One-time' : 'Monthly'}
          </button>
        ))}

        <motion.div
          layout
          className="absolute inset-y-1 w-1/2 rounded-full bg-darkBlue"
          style={{
            left: value === 'one-time' ? '4px' : '50%',
          }}
        />
      </div>
    </div>
  )
}
