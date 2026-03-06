import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export default function TrustSection({ data }: any) {
  if (!data || !data.items?.length) return null

  return (
    <section className="py-[60px] md:py-[120px]">
      <div className="mx-auto max-w-[1280px] w-90% px-6 text-center">

        {/* Heading with Icon */}
        <div className="flex flex-col max-w-[500px] py-2 mx-auto items-center gap-4 md:flex-row md:justify-center rounded-full bg-[#efd9cb]">

          {data.headingIcon && (
            <Image
              src={urlFor(data.headingIcon).width(96).format('webp').url()}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12"
            />
          )}

          <h2 className="font-body text-normal text-darkOrange md:text-normal">
            {data.heading}
          </h2>

        </div>

        {/* Trust Items */}
        <div className="mt-16 grid grid-cols-2 gap-12 md:grid-cols-4">

          {data.items.map((item: any, i: number) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 text-center"
            >

              {item.icon && (
                <div className="trust-icon">
                  <Image
                    src={urlFor(item.icon).width(280).format('webp').url()}
                    alt={item.title || ''}
                    width={140}
                    height={140}
                    className="mix-blend-multiply"
                  />
                </div>
              )}

              <p className="text-[22px] font-heading font-demi text-darkBlue">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}