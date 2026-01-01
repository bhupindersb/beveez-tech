'use client'

import { useEffect, useState } from 'react'

interface CounterProps {
  value: number
  suffix?: string
}

export default function AnimatedCounter({ value, suffix }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 1200
    const increment = Math.ceil(end / (duration / 16))

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="flex items-start">
      {/* NUMBER */}
      <span className="text-[64px] leading-none font-bold text-white">
        {count}
      </span>

      {/* SUFFIX */}
      {suffix && (
        <span className="ml-1 text-[30px] font-semibold text-white translate-y-1">
          {suffix}
        </span>
      )}
    </div>
  )
}
