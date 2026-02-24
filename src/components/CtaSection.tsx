import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export default function CtaSection({ data }: { data: any }) {
  if (!data) return null

  return (
    <section className="pt-0 pb-[60px] md:pb-[120px] px-[20px]">
      <div className="mx-auto w-full overflow-hidden rounded-[48px] relative">

        {/* Background Image */}
        {data?.backgroundImage?.asset && (
          <Image
            src={urlFor(data.backgroundImage)
              .width(2400)
              .height(1200)
              .url()}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-[120px]">
          {data.heading && (
            <h2 className="text-white text-[48px] md:text-[72px] font-heading font-bold leading-none max-w-4xl">
              {data.heading}
            </h2>
          )}

          {data.subText && (
            <p className="mt-6 max-w-2xl text-white/90 text-lg">
              {data.subText}
            </p>
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-6">
            {data.primaryCtaText && data.primaryCtaUrl && (
              <a
                href={
                  data.primaryCtaUrl.startsWith('/')
                    ? data.primaryCtaUrl
                    : `/${data.primaryCtaUrl}`
                }
                className="rounded-full bg-gradient-to-r
                          from-[#cf5a20] to-[#f68f1e]
                          px-12 py-8 font-normal text-white
                          transition hover:from-[#f68f1e] hover:to-[#cf5a20]"
              >
                {data.primaryCtaText}
              </a>
            )}

            {data.secondaryCtaText && data.secondaryCtaUrl && (
              <a
                href={data.secondaryCtaUrl}
                className="rounded-full
                           px-12 py-8 text-darkBlue font-normal text-center bg-white
                           hover:bg-darkBlue hover:text-white transition-all"
              >
                {data.secondaryCtaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
