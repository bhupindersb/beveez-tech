'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('h2, h3')
    ) as HTMLHeadingElement[]

    const items = elements.map((el) => ({
      id: el.id,
      text: el.innerText,
      level: Number(el.tagName.substring(1)),
    }))

    setHeadings(items)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  if (!headings.length) return null

  return (
    <aside className="hidden xl:block fixed right-10 top-[180px] w-[260px] text-sm bg-white rounded-lg shadow-lg p-6 border border-gray-200">

      <h4 className="font-semibold mb-4 text-darkBlue">
        On this page
      </h4>

      <ul className="space-y-2 border-l border-gray-200 pl-4">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`transition ${
              active === h.id
                ? 'text-darkOrange font-medium'
                : 'text-gray-500'
            }`}
            style={{
              marginLeft: h.level === 3 ? '12px' : 0,
            }}
          >
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}