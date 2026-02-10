import { PlanType } from '@/types/plan'

interface Props {
  selected: PlanType | null
  onSelect: (plan: PlanType) => void
}

export default function PlanSelector({ selected, onSelect }: Props) {
  const plans: { id: PlanType; title: string; desc: string }[] = [
    {
      id: 'starter',
      title: 'Starter Website',
      desc: 'For small businesses and first launches',
    },
    {
      id: 'growth',
      title: 'Growth Website',
      desc: 'For scaling brands and lead generation',
    },
    {
      id: 'performance',
      title: 'Performance & Scale',
      desc: 'For high-traffic and custom platforms',
    },
  ]

  return (
    <section className="py-[100px] bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-center text-[32px] md:text-[40px] font-heading font-semibold text-darkBlue">
          Choose Your Project Type
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => {
            const active = selected === plan.id

            return (
              <button
                key={plan.id}
                onClick={() => onSelect(plan.id)}
                className={`rounded-3xl p-8 text-left border transition
                  ${
                    active
                      ? 'border-orange ring-2 ring-orange scale-[1.02]'
                      : 'border-gray-200 hover:border-orange'
                  }
                `}
              >
                <h3 className="text-xl font-heading font-semibold text-darkBlue">
                  {plan.title}
                </h3>

                <p className="mt-3 text-darkBlue/70">
                  {plan.desc}
                </p>

                {active && (
                  <p className="mt-4 text-sm font-semibold text-orange">
                    Selected
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
