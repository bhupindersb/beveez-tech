import { getServiceBySlug, getAllServiceSlugs } from '@/sanity/lib/getServiceBySlug'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CTASection from '@/components/CtaSection'

interface CTAData {
  heading?: string
  subText?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
}

interface SiteSettings {
  cta: CTAData
}


export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()

  return slugs.map((slug: string) => ({
    slug,
  }))
}

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
        <section className="relative overflow-hidden py-[180px] text-center bg-gradient-to-b from-white to-[#f7f9fc]">

        {/* Soft background glow */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] 
                        -translate-x-1/2 -translate-y-1/2 
                        rounded-full bg-[#7becff]/30 blur-[200px]" />

        <div className="relative z-10 max-w-[900px] mx-auto px-6">
            <h1 className="text-[42px] md:text-[64px] lg:text-[72px] 
                        font-bold leading-tight text-darkBlue">
            {data.hero?.headline}
            </h1>

            {data.hero?.subText && (
            <p className="mt-8 text-lg text-darkBlue/80 max-w-2xl mx-auto">
                {data.hero.subText}
            </p>
            )}

            <Link
            href="/start-your-project"
            className="inline-block mt-10 bg-gradient-to-r 
                        from-[#cf5a20] to-[#f68f1e]
                        text-white px-10 py-4 rounded-full 
                        font-semibold shadow-lg hover:scale-105 
                        transition"
            >
            Get Performance Audit
            </Link>
        </div>
        </section>


        {/* PROBLEM */}
        {data.problem?.content && (
        <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

            <div>
                <h2 className="text-4xl font-bold text-darkBlue mb-6">
                {data.problem.heading}
                </h2>

                <p className="text-gray-600 whitespace-pre-line">
                {data.problem.content}
                </p>
            </div>

            <div className="bg-[#f7f9fc] p-10 rounded-3xl shadow-lg">
                <h3 className="font-semibold text-darkBlue mb-6">
                Slow websites hurt:
                </h3>

                <ul className="space-y-4 text-gray-600">
                <li>• SEO rankings</li>
                <li>• Conversion rates</li>
                <li>• User trust</li>
                <li>• Ad performance</li>
                </ul>
            </div>

            </div>
        </section>
        )}

        {/* WHAT WE DO */}
        {data.whatWeDo?.length > 0 && (
        <section className="py-24 bg-[#f7f9fc]">
            <div className="max-w-[1100px] mx-auto px-6">

            <h2 className="text-4xl font-bold text-darkBlue mb-14 text-center">
                What We Do
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.whatWeDo.map((item: string, i: number) => (
                <div
                    key={i}
                    className="bg-white p-8 rounded-3xl shadow-md 
                            hover:shadow-xl hover:-translate-y-2 
                            transition duration-300"
                >
                    <div className="text-[#cf5a20] text-xl mb-4">✓</div>
                    <p className="text-darkBlue font-medium">
                    {item}
                    </p>
                </div>
                ))}
            </div>

            </div>
        </section>
        )}

        {/* PROCESS */}
        {data.process?.length > 0 && (
        <section className="py-24 bg-white">
            <div className="max-w-[900px] mx-auto px-6">

            <h2 className="text-4xl font-bold text-darkBlue mb-16 text-center">
                Our Process
            </h2>

            <div className="relative border-l-2 border-orange-400 pl-10 space-y-12">
                {data.process.map((step: string, i: number) => (
                <div key={i} className="relative">
                    <div className="absolute -left-[22px] top-2 h-4 w-4 
                                    rounded-full bg-orange-500" />
                    <p className="text-darkBlue font-medium">
                    {step}
                    </p>
                </div>
                ))}
            </div>

            </div>
        </section>
        )}

        {/* DELIVERABLES */}
        {data.deliverables?.length > 0 && (
        <section className="py-24 bg-[#f7f9fc]">
            <div className="max-w-[1100px] mx-auto px-6">

            <h2 className="text-4xl font-bold text-darkBlue mb-14 text-center">
                What You’ll Get
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
                {data.deliverables.map((item: string, i: number) => (
                <div
                    key={i}
                    className="bg-white p-8 rounded-3xl shadow-md 
                            border border-gray-100"
                >
                    <p className="text-darkBlue font-medium">
                    ✓ {item}
                    </p>
                </div>
                ))}
            </div>

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

    <CTASection data={data.ctaOverride} />

    </>
  )
}
