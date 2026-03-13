'use client'

import { useEffect, useState } from 'react'

interface Props {
  score: number
  label: string
}

export default function ScoreGauge({ score, label }: Props) {

  const [displayScore, setDisplayScore] = useState(0)

  const radius = 48
  const circumference = 2 * Math.PI * radius
  const progress = circumference - (displayScore / 100) * circumference

  let color = '#22c55e'

  if (score < 50) color = '#ef4444'
  else if (score < 90) color = '#f59e0b'

  useEffect(() => {

    let current = 0

    const interval = setInterval(() => {

      current += 2

      if (current >= score) {
        current = score
        clearInterval(interval)
      }

      setDisplayScore(current)

    }, 15)

    return () => clearInterval(interval)

  }, [score])

  return (

    <div className="flex flex-col items-center">

      <svg width="130" height="130">

        {/* background ring */}
        <circle
          cx="65"
          cy="65"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />

        {/* progress ring */}
        <circle
          cx="65"
          cy="65"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />

        {/* score text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-xl font-bold fill-darkBlue"
        >
          {displayScore}
        </text>

      </svg>

      <p className="mt-3 text-sm text-darkBlue/70">
        {label}
      </p>

    </div>

  )
}