import Image from 'next/image'

interface Audience {
  title: string
  description: string
  icon?: {
    asset?: {
      url?: string
    }
  }
}

interface Props {
  data: {
    headline: string
    description?: string
    sideNote?: string
    footerText?: string
    audiences: Audience[]
  }
}

export default function WhoWeWorkWithAbout({ data }: Props) {
  if (!data) return null

  return (
    <section className="py-32">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* HEADER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-[36px] md:text-[48px] font-bold text-darkBlue">
              {data.headline}
            </h2>

            {data.description && (
              <p className="mt-6 max-w-[520px] text-darkBlue/80">
                {data.description}
              </p>
            )}
          </div>

          {data.sideNote && (
            <p className="md:mt-4 max-w-[420px] text-darkBlue/70">
              {data.sideNote}
            </p>
          )}
        </div>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-[32px] bg-[#e9ecef] p-10 text-left"
            >
              {item.icon?.asset?.url && (
                <Image
                  src={item.icon.asset.url}
                  alt={item.title}
                  width={96}
                  height={96}
                />
              )}

              <h3 className="mt-6 text-xl font-semibold text-orange">
                {item.title}
              </h3>

              <p className="mt-3 text-darkBlue/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER LINE */}
        {data.footerText && (
          <p className="mt-16 text-center text-darkBlue/70">
            {data.footerText}
          </p>
        )}
      </div>
    </section>
  )
}
