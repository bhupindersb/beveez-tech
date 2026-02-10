'use client'

import { useState } from 'react'
import ProjectHero from '@/components/ProjectHero'
import PlanSelector from '@/components/PlanSelector'
import ProjectForm from '@/components/ProjectForm'
import WhatHappensNext from '@/components/WhatHappensNext'
import FinalCTA from '@/components/FinalCTA'

import { PlanType } from '@/types/plan'

export default function StartProjectClient() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)

  return (
    <>
      <ProjectHero />

      <PlanSelector
        selected={selectedPlan}
        onSelect={setSelectedPlan}
      />

      {selectedPlan && (
        <ProjectForm selectedPlan={selectedPlan} />
      )}

      <WhatHappensNext />

      <FinalCTA />
    </>
  )
}
