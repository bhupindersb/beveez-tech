import Image from 'next/image'
import { getAboutPage } from '@/sanity/lib/getAboutPage'

interface AboutValueItem {
  title: string
  description: string
  icon?: {
    asset?: {
      url?: string
    }
  }
}

interface AboutHero {
  headline: string
  subText?: string
  ctaText?: string
  ctaUrl?: string
  backgroundImage?: {
    asset?: {
      url?: string
    }
  }
}

interface AboutPageData {
  aboutHero?: AboutHero
  values?: AboutValueItem[]
}

export default async function AboutPage() {
  const data = (await getAboutPage()) as AboutPageData

  if (!data?.aboutHero) {
    return (
      <div className="py-32 text-center text-gray-500">
        About page content not found.
      </div>
    )
  }

  const hero = data.aboutHero

  return (
    <section className="relative overflow-hidden">

      {/* BACKGROUND IMAGE */}
      {hero.backgroundImage?.asset?.url && (
        <Image
          src={hero.backgroundImage.asset.url}
          alt="About background"
          fill
          className="object-cover"
          priority
        />
      )}

      {/* ORANGE GRADIENT */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]
                   bg-gradient-to-t from-[#f28f23]/50 to-transparent
                   z-10"
      />

      {/* BLUE BLUR CIRCLE */}
      <div
        className="pointer-events-none absolute left-1/2 top-[45%]
                   h-[700px] w-[700px]
                   -translate-x-1/2 -translate-y-1/2
                   rounded-full bg-[#7becff]/50
                   blur-[250px]
                   z-20"
      />

      {/* CONTENT */}
      <div className="relative z-30 mx-auto max-w-[1280px] px-6 pt-[180px] pb-[140px] text-center">

        <h1 className="text-[48px] md:text-[64px] font-heading font-bold text-darkBlue">
          {hero.headline}
        </h1>

        {hero.subText && (
          <p className="mx-auto mt-6 max-w-[720px] text-lg text-darkBlue/80">
            {hero.subText}
          </p>
        )}

        {hero.ctaText && hero.ctaUrl && (
          <a
            href={hero.ctaUrl}
            className="inline-block mt-10 rounded-full
                       bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                       px-10 py-4 font-semibold text-white
                       transition hover:opacity-90"
          >
            {hero.ctaText}
          </a>
        )}

        {/* VALUE BOXES */}
        {data.values && data.values.length > 0 && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">

            {data.values.map((item, i) => {
              const offset =
                i === 1 || i === 2 ? 'md:translate-y-[80px]' : ''

              return (
                <div
                  key={i}
                  className={`rounded-3xl bg-white p-8 text-left shadow-md transition-transform ${offset}`}
                >
                  {item.icon?.asset?.url && (
                    <Image
                      src={item.icon.asset.url}
                      alt={item.title}
                      width={56}
                      height={56}
                    />
                  )}

                  <h3 className="mt-6 text-xl font-semibold text-darkBlue">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
