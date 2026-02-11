interface Props {
  step: 1 | 2
}

export default function StepIndicator({ step }: Props) {
  return (
    <div className="flex items-center justify-center gap-6 mb-16">
      <div className={`flex items-center gap-3 ${step === 1 ? 'text-orange-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold 
          ${step === 1 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
          1
        </div>
        <span className="font-medium">Choose Plan</span>
      </div>

      <div className="w-16 h-[2px] bg-gray-300" />

      <div className={`flex items-center gap-3 ${step === 2 ? 'text-orange-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold 
          ${step === 2 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
          2
        </div>
        <span className="font-medium">Project Details</span>
      </div>
    </div>
  )
}
