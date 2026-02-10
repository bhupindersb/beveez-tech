'use client'

import { useState } from 'react'
import { PlanType } from './types'

import PlanSelector from '@/components/PlanSelector'

import StarterForm from './forms/StarterForm'
import GrowthForm from './forms/GrowthForm'
import PerformanceForm from './forms/PerformanceForm'
import CustomForm from './forms/CustomForm'

export default function StartProjectClient() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('starter')

  return (
    <section className="pb-[120px]">
      {/* PLAN SELECTOR */}
      <PlanSelector
        value={selectedPlan}
        onChange={setSelectedPlan}
      />

      {/* FORMS */}
      <div className="mt-12">
        {selectedPlan === 'starter' && <StarterForm />}
        {selectedPlan === 'growth' && <GrowthForm />}
        {selectedPlan === 'performance' && <PerformanceForm />}
        {selectedPlan === 'custom' && <CustomForm />}
      </div>
    </section>
  )
}
