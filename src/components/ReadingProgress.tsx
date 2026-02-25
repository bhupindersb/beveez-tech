'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const progress = (scrollTop / height) * 100
      setWidth(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] z-50">
      <div
        className="h-full bg-darkOrange transition-all duration-200"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}