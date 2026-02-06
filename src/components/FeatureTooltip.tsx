'use client'

import { useState } from 'react'

export default function FeatureTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)

  return (
    <span className="relative inline-block">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="ml-2 inline-flex h-4 w-4 items-center justify-center
                   rounded-full border text-xs text-darkBlue"
      >
        ?
      </button>

      {open && (
        <div className="absolute z-50 top-6 left-1/2 -translate-x-1/2
                        w-64 rounded-lg bg-darkBlue px-4 py-3 text-xs text-white shadow-lg">
          {text}
        </div>
      )}
    </span>
  )
}
