'use client'

interface Props {
  score: number
  label: string
}

export default function ScoreGauge({ score, label }: Props) {

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const progress = circumference - (score / 100) * circumference

  let color = '#22c55e'

  if (score < 50) color = '#ef4444'
  else if (score < 90) color = '#f59e0b'

  return (

    <div className="flex flex-col items-center">

      <svg width="120" height="120">

        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-xl font-bold fill-darkBlue"
        >
          {score}
        </text>

      </svg>

      <p className="mt-2 text-sm text-darkBlue/70">
        {label}
      </p>

    </div>
  )
}