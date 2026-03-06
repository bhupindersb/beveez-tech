import PricingSection from './PricingSection'
import { getPricingSection } from '@/sanity/lib/getPricingSection'
import { getPricingPlans } from '@/sanity/lib/getPricingPlans'

export default async function PricingSectionWrapper() {
  const section = await getPricingSection()
  const plans = await getPricingPlans()

  return <PricingSection section={section} plans={plans} />
}