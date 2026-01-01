import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import AnimatedCounter from '@/components/AnimatedCounter'


export default function WhyChooseUs({ data }: { data: any }) {
  if (!data) return null

  return (
    <section className="relative pt-0 pb-[60px] md:py-[120px]">
      
      {/* GHOST HEADING */}
      <div className="absolute inset-x-0 -top-14 md:-top-10 text-center pointer-events-none">
        <h2 className="text-[50px] md:text-[150px] font-body font-medium text-white">
          {data.ghostHeading}
        </h2>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="rounded-[48px] bg-white p-12 md:p-16 shadow-lg">

          {/* ✅ HEADING SPANS BOTH COLUMNS */}
          <h3 className="mb-14 text-[48px] md:text-[72px] font-heading font-bold text-darkBlue leading-none text-center md:text-left">
            {data.heading}
          </h3>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* LEFT IMAGE */}
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden">
              {data.image && (
                <Image
                  src={urlFor(data.image).width(800).height(1000).url()}
                  alt={data.heading}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col justify-center">

              {/* BULLET POINTS */}
              <ul className="space-y-4 text-lg text-gray-700">
                {data.points?.map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-darkBlue text-[24px]">»</span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* STAT CARDS (STACKED) */}
                <div className="mt-10 space-y-8">
                {data.stats?.map((stat: any, i: number) => (
                    <div
                    key={i}
                    className="relative overflow-visible rounded-2xl bg-darkOrange px-8 py-8 text-white"
                    >
                    {/* ICON – TOP RIGHT, 50% OUT */}
                    {stat.icon?.asset?.url && (
                    <div className="absolute -top-6 -right-6 h-14 w-14">
                        <img
                        src={stat.icon.asset.url}
                        alt={stat.title}
                        className="h-full w-full object-contain"
                        />
                    </div>
                    )}


                    {/* GRID CONTENT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                        {/* LEFT: NUMBER + SUBTITLE */}
                        <div>
                        <div className="text-7xl font-bold leading-none">
                            <AnimatedCounter
                                value={stat.value}
                                suffix={stat.suffix}
                            />
                        </div>
                        <div className="mt-0 text-lg font-semibold">
                            {stat.title}
                        </div>
                        </div>

                        {/* RIGHT: DESCRIPTION */}
                        <p className="text-sm leading-relaxed opacity-90">
                        {stat.description}
                        </p>

                    </div>
                    </div>
                ))}
                </div>


            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
