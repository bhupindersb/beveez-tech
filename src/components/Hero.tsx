import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
  background?: any
  title: string
  highlight: string
  subtitle: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
}

export default function Hero({
  background,
  title,
  highlight,
  subtitle,
  primaryCtaText,
  primaryCtaUrl,
  secondaryCtaText,
  secondaryCtaUrl,
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] md:min-h-[680px] flex items-center justify-center px-4 sm:px-6 overflow-hidden text-center">
      {background && (
        <Image
          src={urlFor(background).width(1600).quality(80).format('webp').url()}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 1600px"
          className="-z-10 absolute object-cover mix-blend-multiply"
        />
      )}

      <div className="relative max-w-[1280px] w-full md:px-6 pt-32 md:pt-36">
        <h1 className="font-heading font-semibold text-darkBlue leading-tight text-[28px] sm:text-[38px] md:text-[48px] lg:text-[60px]">
          {title}
          <span className="gradient-text bg-gradient-to-r from-[#2497c8] to-[#65c6db] bg-clip-text text-transparent block mt-4 md:mt-6">
            {highlight}
          </span>
        </h1>

        <p className="mx-auto mt-8 md:mt-10 max-w-5xl text-base sm:text-lg leading-relaxed text-darkBlue">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-5 justify-center">
          {primaryCtaText && primaryCtaUrl && (
            <a href={primaryCtaUrl} className="rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-10 md:px-12 py-6 md:py-7 text-white font-normal text-center transition-all hover:from-[#f68f1e] hover:to-[#cf5a20]">
              {primaryCtaText}
            </a>
          )}
          {secondaryCtaText && secondaryCtaUrl && (
            <a href={secondaryCtaUrl} className="rounded-full border-2 border-darkBlue px-10 md:px-12 py-6 md:py-7 text-darkBlue font-normal text-center hover:bg-darkBlue hover:text-white transition-all">
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
