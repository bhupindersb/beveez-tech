import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { format } from 'path'

interface HeroProps {
  background?: any
  highlightImage?: any
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
  highlightImage,
  title,
  highlight,
  subtitle,
  primaryCtaText,
  primaryCtaUrl,
  secondaryCtaText,
  secondaryCtaUrl,
}: HeroProps) {
  return (
    <section
      className="relative min-h-[85vh] md:min-h-[720px] h-90vh
      flex items-center justify-center text-center
      px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Image (LCP Element) */}
      {background && (
        <Image
          src={urlFor(background)
            .width(1600)
            .quality(80)
            .format('webp')
            .url()}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 1600px"
          className="-z-10 absolute object-cover mix-blend-multiply"
        />
      )}

      <div className="relative max-w-[1280px] w-full md:px-6 pt-44">
        <h1
          className="font-heading font-semibold text-darkBlue leading-tight
          text-[26px] sm:text-[38px] md:text-[48px] lg:text-[60px] relative"
        >
          {title}

          {/* Decorative highlight background */}
          {highlightImage && (
            <Image
              src={urlFor(highlightImage)
                .width(900)
                .quality(80)
                .auto('format')
                .fit('max')
                .url()}
              alt=""
              width={900}
              height={180}
              priority={false}
              sizes="(max-width: 768px) 80vw, 900px"
              className="absolute mx-auto -z-10 -bottom-4 md:-bottom-10 left-4 md:left-12 right-0"
            />
          )}

          <span className="gradient-text bg-gradient-to-r from-[#2497c8] to-[#65c6db] bg-clip-text text-transparent block md:mt-12 mt-6">
            {highlight}
          </span>
        </h1>

        <p className="mt-8 md:mt-20 text-base sm:text-lg text-darkBlue">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
          {primaryCtaText && primaryCtaUrl && (
            <a
              href={primaryCtaUrl}
              className="rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
              px-12 py-8 text-white font-normal text-center
              transition-all hover:from-[#f68f1e] hover:to-[#cf5a20]"
            >
              {primaryCtaText}
            </a>
          )}

          {secondaryCtaText && secondaryCtaUrl && (
            <a
              href={secondaryCtaUrl}
              className="rounded-full border-2 border-darkBlue
              px-12 py-8 text-darkBlue font-normal text-center
              hover:bg-darkBlue hover:text-white transition-all"
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}