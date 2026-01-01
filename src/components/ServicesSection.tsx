import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export default function ServicesSection({
  services,
  section,
}: {
  services: any[]
  section: any
}) {
  return (
    <section className="pb-[120px]">

      {/* SECTION HEADER */}
      <div className="mx-auto max-w-[1280px] flex items-center grid grid-cols-1 md:grid-cols-4 gap-10 px-6 mb-16">
        <h2 className="md:col-span-3 text-[48px] md:text-[72px] font-bold font-heading text-darkBlue leading-none text-center md:text-left">
          {section?.heading}
        </h2>
        <p className="text-lg text-darkBlue text-center md:text-left">
          {section?.subText}
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="mx-auto w-[90%] max-w-[1760px] grid grid-cols-1 md:grid-cols-4 gap-[30px]">
        {services.map((service, index) => {
          const rowIndex = Math.floor(index / 2)
          const textFirst = rowIndex % 2 === 0

          const TextBox = (
            <div
              key={`${service._id}-text`}
              className="aspect-square bg-[#d9dde3] border border-gray-200 rounded-[40px] p-8 flex flex-col justify-between"
            >
              <h3 className="text-3xl font-heading text-darkOrange text-center md:text-left">
                {service.title}
              </h3>
              <p className="text-gray-600 mt-auto text-center md:text-left">
                {service.description}
              </p>
            </div>
          )

          const ImageBox = (
            <div
              key={`${service._id}-image`}
              className="aspect-square relative overflow-hidden bg-gray-100 rounded-[40px]"
            >
              {service.image && (
                <Image
                  src={urlFor(service.image).width(800).height(800).url()}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          )

          return textFirst ? (
            <>
              {TextBox}
              {ImageBox}
            </>
          ) : (
            <>
              {ImageBox}
              {TextBox}
            </>
          )
        })}
      </div>
    </section>
  )
}
