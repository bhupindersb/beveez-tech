import { PlanType } from '@/types/plan'

export default function ProjectForm({
  selectedPlan,
}: {
  selectedPlan: PlanType
}) {
  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-xl px-6">
        <h2 className="text-[32px] font-heading font-semibold text-darkBlue text-center">
          Tell Us About Your Project
        </h2>

        <p className="mt-4 text-center text-darkBlue/70">
          Selected plan: <strong className="capitalize">{selectedPlan}</strong>
        </p>

        <form className="mt-10 space-y-6">
          <input
            placeholder="Your Name"
            className="w-full rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Email Address"
            className="w-full rounded-xl border px-4 py-3"
          />

          <textarea
            placeholder="Briefly describe your project..."
            rows={5}
            className="w-full rounded-xl border px-4 py-3"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r
                       from-[#cf5a20] to-[#f68f1e]
                       py-4 text-white font-semibold"
          >
            Submit Project
          </button>
        </form>
      </div>
    </section>
  )
}
