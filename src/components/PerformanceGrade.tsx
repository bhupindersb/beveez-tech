'use client'

interface Props {
  score: number
}

export default function PerformanceGrade({ score }: Props) {

  let grade = 'F'
  let label = 'Critical Performance Issues'
  let colorClass = 'bg-red-500'

  if (score >= 90) {
    grade = 'A'
    label = 'Excellent Performance'
    colorClass = 'bg-green-500'
  } 
  else if (score >= 80) {
    grade = 'B'
    label = 'Good Performance'
    colorClass = 'bg-green-400'
  } 
  else if (score >= 70) {
    grade = 'C'
    label = 'Needs Optimization'
    colorClass = 'bg-yellow-400'
  } 
  else if (score >= 50) {
    grade = 'D'
    label = 'Poor Performance'
    colorClass = 'bg-orange-400'
  }

  return (

    <div className="bg-white rounded-2xl shadow-md p-8 text-center mt-10">

      <h3 className="text-lg font-semibold text-darkBlue mb-6">
        Performance Grade
      </h3>

      <div className="flex justify-center">

        <div
          className={`w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-bold ${colorClass}`}
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