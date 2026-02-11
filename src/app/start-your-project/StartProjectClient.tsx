'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PlanType } from './types'
import PlanSelector from '@/components/PlanSelector'
import StarterForm from './forms/StarterForm'
import GrowthForm from './forms/GrowthForm'
import PerformanceForm from './forms/PerformanceForm'
import CustomForm from './forms/CustomForm'


const VALID_PLANS: PlanType[] = [
  'starter',
  'growth',
  'performance',
  'custom',
]

export default function StartProjectClient() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan')

  const [selectedPlan, setSelectedPlan] = useState<PlanType>('starter')

  useEffect(() => {
    if (planParam && VALID_PLANS.includes(planParam as PlanType)) {
      setSelectedPlan(planParam as PlanType)
    }
  }, [planParam])

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