import Image from 'next/image'

interface Step {
  number?: number
  title: string
  description?: string
}

interface OurApproachProps {
  data: {
    heading: string
    subText?: string
    steps: Step[]
    visual?: {
      backgroundImage?: { asset?: { url?: string } }
      mainImage?: { asset?: { url?: string } }
      subText?: string
    }
  }
}

export default function OurApproach({ data }: OurApproachProps) {
  return (
    <section className="bg-darkBlue py-32 text-white">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="font-heading text-[36px] md:text-[48px] font-bold">
            {data.heading}
          </h2>

          {data.subText && (
            <p className="mt-4 text-white/80">
              {data.subText}
            </p>
          )}
        </div>

        {/* CONTENT */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT – STEPS */}
          <div className="space-y-6">
            {data.steps.map((step, i) => (
              <div
                key={i}
                className="max-w-[550px] w-full rounded-2xl bg-[#d55c1a] px-8 py-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold opacity-90">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/90">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT – VISUAL */}
          <div className="relative">

            {data.visual?.backgroundImage?.asset?.url && (
              <Image
                src={data.visual.backgroundImage.asset.url}
                alt=""
                fill
                className="object-cover opacity-30"
              />
            )}

            {data.visual?.mainImage?.asset?.url && (
              <Image
                src={data.visual.mainImage.asset.url}
                alt="Approach illustration"
                width={520}
                height={420}
                className="relative mx-auto"
              />
            )}

            {data.visual?.subText && (
              <p className="mt-6 text-sm text-white/80 max-w-[420px] mx-auto text-center">
                {data.visual.subText}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
