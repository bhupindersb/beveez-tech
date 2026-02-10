'use client'

import { useState } from 'react'
import { PlanType } from '@/lib/startProject/types'
import PlanSelector from '@/components/PlanSelector'
import ProjectForm from '@/components/ProjectForm'

export default function StartProjectClient() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)

  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-[960px] px-6 space-y-16">
        <PlanSelector
          value={selectedPlan}
          onChange={setSelectedPlan}
        />

        <ProjectForm selectedPlan={selectedPlan} />
      </div>
    </section>
  )
}
