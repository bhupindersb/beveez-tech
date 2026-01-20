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

interface WhoWeWorkWithProps {
  data: {
    headline: string
    description?: string
    sideNote?: string
    footerText?: string
    audiences: Audience[]
  }
}

export default function WhoWeWorkWithAbout({ data }: WhoWeWorkWithProps) {
  return (
    <section className="py-[60px] md:py-[120px]">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* HEADER */}
        <div className="mx-auto max-w-[1280px] flex items-center grid grid-cols-1 md:grid-cols-4 gap-10 px-6 mb-16">
          <div className='md:col-span-3'>
            <h2 className="text-[48px] md:text-[72px] font-bold font-heading text-darkBlue leading-none text-center md:text-left">
              {data.headline}
            </h2>

            {data.description && (
              <p className="mt-6 text-lg text-darkBlue text-center md:text-left">
                {data.description}
              </p>
            )}
          </div>

          {data.sideNote && (
            <p className="text-base text-darkBlue text-center md:text-left">
              {data.sideNote}
            </p>
          )}
        </div>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-[40px] bg-[#e5e9eb] p-10 text-left"
            >
              {item.icon?.asset?.url && (
                <Image
                  src={item.icon.asset.url}
                  alt={item.title}
                  width={200}
                  height={200}
                />
              )}

              <h3 className="mt-6 text-[30px] font-heading text-orange">
                {item.title}
              </h3>

              <p className="mt-3 text-darkBlue text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        {data.footerText && (
          <p className="mt-16 text-center text-darkBlue text-base">
            {data.footerText}
          </p>
        )}
      </div>
    </section>
  )
}
