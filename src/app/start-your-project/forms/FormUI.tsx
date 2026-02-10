'use client'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

export function FormWrapper({ title, children }: WrapperProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 mt-10">
      <h3 className="text-2xl font-heading font-semibold mb-6 text-darkBlue">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export function Input({ label }: { label: string }) {
  return (
    <input
      placeholder={label}
      className="w-full rounded-xl border border-gray-300 px-4 py-3
                 focus:outline-none focus:ring-2 focus:ring-darkOrange/40"
    />
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
      type="submit"
      className="mt-6 rounded-full bg-darkOrange px-8 py-4
                 text-white font-semibold hover:bg-darkOrange/90 transition"
    >
      Submit Request
    </button>
  )
}
