interface OurApproachStep {
  number?: number
  title: string
  description?: string
}

interface OurApproachData {
  heading: string
  subText?: string
  steps?: OurApproachStep[]
  visual?: {
    backgroundImage?: {
      asset?: { url?: string }
    }
    mainImage?: {
      asset?: { url?: string }
    }
    subText?: string
  }
}

interface OurApproachProps {
  data: OurApproachData
}

export default function OurApproach({ data }: OurApproachProps) {
  if (!data?.steps || data.steps.length === 0) return null

  return (
    <section className="py-32">
      <div className="mx-auto max-w-[1280px] px-6">

        <h2 className="font-heading text-[48px] font-bold text-darkBlue">
          {data.heading}
        </h2>

        {data.subText && (
          <p className="mt-4 max-w-[640px] text-darkBlue/80">
            {data.subText}
          </p>
        )}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT COLUMN – STEPS */}
          <div className="space-y-8">
            {data.steps.map((step, i) => (
              <div
                key={i}
                className="max-w-[550px] rounded-3xl bg-orange px-8 py-10 text-white"
              >
                {step.number !== undefined && (
                  <div className="text-4xl font-bold opacity-60">
                    {step.number}
                  </div>
                )}

                <h3 className="mt-2 text-xl font-semibold">
                  {step.title}
                </h3>

                {step.description && (
                  <p className="mt-2 text-white/90">
                    {step.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN – VISUAL */}
          {data.visual && (
            <div className="relative">
              {data.visual.backgroundImage?.asset?.url && (
                <img
                  src={data.visual.backgroundImage.asset.url}
                  className="absolute inset-0 h-full w-full object-cover rounded-3xl"
                />
              )}

              {data.visual.mainImage?.asset?.url && (
                <img
                  src={data.visual.mainImage.asset.url}
                  className="relative z-10 mx-auto"
                />
              )}

              {data.visual.subText && (
                <p className="mt-6 text-darkBlue/70">
                  {data.visual.subText}
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
