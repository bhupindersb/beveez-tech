'use client'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

export function FormWrapper({ title, children }: WrapperProps) {
  return (
    <div className="max-w-3xl mx-auto mt-16 px-6">

      <div className="bg-white/90 backdrop-blur-md 
                      rounded-3xl shadow-xl 
                      border border-[#e4eaec] 
                      p-10">

        <h2 className="text-2xl font-bold text-[#0f2e35] mb-8">
          {title}
        </h2>

        <div className="space-y-6">
          {children}
        </div>

      </div>

    </div>
  )
}

export function Input({ label }: { label: string }) {
  return (
    <div>
        <input
            placeholder={label}
            className="w-full rounded-xl border border-[#dbe3e6] 
                    px-5 py-4 text-[#0f2e35]
                    bg-[#f9fbfc]
                    focus:outline-none
                    focus:border-[#f68f1e]
                    focus:ring-2 focus:ring-[#f68f1e]/20
                    transition-all"
        />
    </div>
  )
}

export function Textarea({ label }: { label: string }) {
  return (
    <textarea
      placeholder={label}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 h-32
                 focus:outline-none focus:ring-2 focus:ring-darkOrange/40"
    />
  )
}

export function Submit() {
  return (
    <button
        className="mt-6 bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                    text-white font-semibold
                    px-8 py-4 rounded-full
                    shadow-md
                    hover:shadow-xl
                    hover:scale-[1.02]
                    transition-all duration-300"
        >
        Submit Request
    </button>
  )
}
