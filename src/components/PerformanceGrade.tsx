'use client'

interface Props {
  score: number
}

export default function PerformanceGrade({ score }: Props) {

  let grade = 'F'
  let label = 'Critical Performance Issues'
  let bgColor = '#ef4444' // red

  if (score >= 90) {
    grade = 'A'
    label = 'Excellent Performance'
    bgColor = '#22c55e' // green
  }
  else if (score >= 80) {
    grade = 'B'
    label = 'Good Performance'
    bgColor = '#4ade80' // light green
  }
  else if (score >= 70) {
    grade = 'C'
    label = 'Needs Optimization'
    bgColor = '#facc15' // yellow
  }
  else if (score >= 50) {
    grade = 'D'
    label = 'Poor Performance'
    bgColor = '#fb923c' // orange
  }

  return (

    <div className="bg-white rounded-2xl shadow-md p-8 text-center mt-10">

      <h3 className="text-lg font-semibold text-darkBlue mb-6">
        Performance Grade
      </h3>

      <div className="flex justify-center">

        <div
          style={{ backgroundColor: bgColor }}
          className="w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-bold"
        >
          {grade}
        </div>

      </div>

      <p className="mt-4 text-darkBlue/70">
        {label}
      </p>

      <p className="text-sm text-darkBlue/50 mt-2">
        Based on Lighthouse performance score
      </p>

    </div>

  )
}