import { getServiceBySlug } from '@/sanity/lib/getServiceBySlug'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: any) {
  const data = await getServiceBySlug(params.slug)

  if (!data) return {}

  return {
    title: data?.seo?.seoTitle || data.title,
    description: data?.seo?.seoDescription,
  }
}

export default async function ServicePage({ params }: any) {
  const data = await getServiceBySlug(params.slug)

  if (!data) return notFound()

  return (
    <>

      {/* HERO */}
      <section className="relative overflow-hidden text-center py-[160px]">
        {data.hero?.backgroundImage?.asset?.url && (
          <Image
            src={data.hero.backgroundImage.asset.url}
            alt=""
            fill
            className="object-cover"
          />
        )}

        <div className="relative z-10 max-w-[900px] mx-auto px-6">
          <h1 className="text-[42px] md:text-[64px] font-bold text-darkBlue">
            {data.hero?.headline}
          </h1>

          {data.hero?.subText && (
            <p className="mt-6 text-lg text-darkBlue/80">
              {data.hero.subText}
            </p>
          )}
        </div>
      </section>

      {/* PROBLEM */}
      {data.problem?.content && (
        <section className="py-20 bg-white">
          <div className="max-w-[900px] mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-6">
              {data.problem.heading}
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {data.problem.content}
            </p>
          </div>
        </section>
      )}

      {/* WHAT WE DO */}
      {data.whatWeDo?.length > 0 && (
        <section className="py-20 bg-[#f7f9fc]">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10">
              What We Do
            </h2>

            <ul className="grid md:grid-cols-2 gap-6">
              {data.whatWeDo.map((item: string, i: number) => (
                <li key={i} className="bg-white p-6 rounded-2xl shadow">
                  ✓ {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {data.process?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10">
              Our Process
            </h2>

            <ol className="space-y-6">
              {data.process.map((step: string, i: number) => (
                <li key={i} className="border-l-4 border-orange-500 pl-6">
                  {i + 1}. {step}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* DELIVERABLES */}
      {data.deliverables?.length > 0 && (
        <section className="py-20 bg-[#f7f9fc]">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10">
              What You’ll Get
            </h2>

            <ul className="grid md:grid-cols-2 gap-6">
              {data.deliverables.map((item: string, i: number) => (
                <li key={i} className="bg-white p-6 rounded-2xl shadow">
                  ✓ {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faq?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10">
              FAQs
            </h2>

            <div className="space-y-8">
              {data.faq.map((item: any, i: number) => (
                <div key={i}>
                  <h3 className="font-semibold mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {data.cta && (
        <section className="py-24 bg-darkBlue text-white text-center">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-3xl font-bold">
              {data.cta.heading}
            </h2>

            {data.cta.subText && (
              <p className="mt-6 text-white/80">
                {data.cta.subText}
              </p>
            )}

            {data.cta.buttonText && (
              <Link
                href={`/${data.cta.buttonUrl}`}
                className="inline-block mt-8 bg-orange-500 px-8 py-4 rounded-full font-semibold"
              >
                {data.cta.buttonText}
              </Link>
            )}
          </div>
        </section>
      )}

    </>
  )
}
