import React from 'react'

interface Props {
  step: 1 | 2
  onStepChange?: React.Dispatch<React.SetStateAction<1 | 2>>
}

export default function StepIndicator({ step, onStepChange }: Props) {
  const isStep1Complete = step === 2

  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">

        {/* STEP 1 */}
        <button
          type="button"
          onClick={() => onStepChange?.(1)}
          className={`flex items-center gap-3 transition-all duration-300 ${
            step === 1 ? 'text-[#cf5a20]' : 'text-gray-400'
          }`}
        >
          <div
            className={`
              relative w-10 h-10 rounded-full flex items-center justify-center
              font-bold text-sm transition-all duration-300
              ${
                step === 1
                  ? 'bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] text-white shadow-lg scale-110 animate-pulse'
                  : isStep1Complete
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }
            `}
          >
            {isStep1Complete ? '✓' : '1'}
          </div>

          <span className="font-semibold tracking-wide">
            Choose Plan
          </span>
        </button>

        {/* CONNECTOR */}
        <div className="hidden md:block relative w-24 h-[3px] bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`
              absolute top-0 left-0 h-full rounded-full transition-all duration-500
              ${
                step === 2
                  ? 'w-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]'
                  : 'w-0'
              }
            `}
          />
        </div>

        {/* STEP 2 */}
        <button
          type="button"
          onClick={() => onStepChange?.(2)}
          className={`flex items-center gap-3 transition-all duration-300 ${
            step === 2 ? 'text-[#cf5a20]' : 'text-gray-400'
          }`}
        >
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              font-bold text-sm transition-all duration-300
              ${
                step === 2
                  ? 'bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] text-white shadow-lg scale-110 animate-pulse'
                  : 'bg-gray-200 text-gray-600'
              }
            `}
          >
            2
          </div>

          <span className="font-semibold tracking-wide">
            Project Details
          </span>
        </button>
      </div>
    </div>
  )
}
