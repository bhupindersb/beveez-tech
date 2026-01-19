import Image from 'next/image'
import { getAboutPage } from '@/sanity/lib/getAboutPage'

interface AboutValueItem {
  title: string
  description: string
  icon?: {
    asset?: {
      url: string
    }
  }
}

interface AboutPageData {
  hero: {
    headline: string
    subText?: string
    ctaText?: string
    ctaUrl?: string
    backgroundImage: {
      asset: {
        url: string
      }
    }
  }
  values?: AboutValueItem[]
}


export default async function AboutPage() {
  const data = (await getAboutPage()) as AboutPageData

  if (!data || !data.hero) {
    return (
      <div className="py-32 text-center text-gray-500">
        About page content not found.
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden">

      {/* BACKGROUND IMAGE */}
      {data.hero.backgroundImage?.asset?.url && (
        <Image
            src={data.hero.backgroundImage.asset.url}
            alt="About background"
            fill
            className="object-cover"
            priority
        />
    )}


      {/* ORANGE GRADIENT */}
      <div className="absolute inset-x-0 bottom-0 h-[40%]
                      bg-gradient-to-t from-[#f28f23]/50 to-transparent
                      -z-20" />

      {/* BLUE BLUR CIRCLE */}
      <div className="absolute left-1/2 top-[45%]
                      h-[700px] w-[700px]
                      -translate-x-1/2 -translate-y-1/2
                      rounded-full bg-[#7becff]/50
                      blur-[250px]
                      -z-10" />

      {/* CONTENT */}
      <div className="relative mx-auto max-w-[1280px] px-6 pt-[180px] pb-[140px] text-center">

        <h1 className="text-[48px] md:text-[64px] font-heading font-bold text-darkBlue">
          {data.hero.headline}
        </h1>

        <p className="mx-auto mt-6 max-w-[720px] text-lg text-darkBlue/80">
          {data.hero.subText}
        </p>

        {data.hero.ctaText && (
          <a
            href={data.hero.ctaUrl}
            className="inline-block mt-10 rounded-full
                       bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                       px-10 py-4 font-semibold text-white
                       transition hover:opacity-90"
          >
            {data.hero.ctaText}
          </a>
        )}

        {/* VALUE BOXES */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
            {data.values?.map((item: AboutValueItem, i: number) => (
                <div
                key={i}
                className={`rounded-3xl bg-white p-8 text-left shadow-md
                    ${i === 1 || i === 2 ? 'md:translate-y-[80px]' : ''}
                    md:translate-y-0`}
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
            ))}
        </div>


      </div>
    </section>
  )
}
