import { Suspense } from 'react'
import StartProjectClient from './StartProjectClient'
import Hero from './Hero'

export default function StartYourProjectPage() {
  return (
    <Suspense fallback={<div className="py-[200px] text-center">Loading...</div>}>
      <Hero />
      <StartProjectClient />
    </Suspense>
  )
}
