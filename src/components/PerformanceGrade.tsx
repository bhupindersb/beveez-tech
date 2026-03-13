'use client'

interface Props {
  score: number
}

export default function PerformanceGrade({ score }: Props) {

  let grade = 'F'
  let color = 'bg-red-500'
  let label = 'Critical Performance Issues'

  if (score >= 90) {
    grade = 'A'
    color = 'bg-green-500'
    label = 'Excellent Performance'
  } else if (score >= 80) {
    grade = 'B'
    color = 'bg-green-300'
    label = 'Good Performance'
  } else if (score >= 70) {
    grade = 'C'
    color = 'bg-yellow-400'
    label = 'Needs Optimization'
  } else if (score >= 50) {
    grade = 'D'
    color = 'bg-orange-400'
    label = 'Poor Performance'
  }

  return (

    <div className="bg-white rounded-2xl shadow-md p-8 text-center mt-10">

      <h3 className="text-lg font-semibold text-darkBlue mb-6">
        Performance Grade
      </h3>

      <div
        className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-3xl font-bold ${color}`}
      >
        {grade}
      </div>

      <p className="mt-4 text-darkBlue/70">
        {label}
      </p>

    </div>

  )
}