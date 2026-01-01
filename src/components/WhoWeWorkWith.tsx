export default function WhoWeWorkWith({ data }: { data: any }) {
  if (!data) return null

  return (
    <section className="pb-[120px]">
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">

        {/* LEFT COLUMN */}
        <div>
          <h2 className="text-[48px] md:text-[72px] font-heading font-bold text-darkBlue leading-none text-center md:text-left">
            {data.heading}
          </h2>

          <p className="mt-6 text-darkOrange font-semibold text-lg text-center md:text-left">
            {data.intro}
          </p>

          <ul className="mt-6 space-y-2 text-darkBlue">
            {data.points?.map((point: string, i: number) => (
              <li key={i} className="flex gap-3 items-start justify-center md:justify-start text-center md:text-left">
                <span className="text-darkBlue text-[24px] leading-none hidden md:block">»</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {data.closingNote && (
            <p className="mt-8 text-gray-600 text-center md:text-left">
              {data.closingNote}
            </p>
          )}
        </div>

        {/* RIGHT COLUMN – TESTIMONIAL */}
        <div className="bg-white rounded-[32px] p-10 md:p-20 shadow-sm">
          <p className="text-2xl font-body text-gray-700 leading-relaxed">
            “{data.testimonialText}”
          </p>

          <div className="my-6 h-px bg-gray-200" />

          <p className="font-normal text-lg text-darkBlue">
            {data.testimonialAuthor}
          </p>
        </div>

      </div>
    </section>
  )
}
