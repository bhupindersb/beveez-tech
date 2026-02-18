import { getContactPage } from '@/sanity/lib/getContactPage'
import ContactHero from '@/components/ContactHero'
import Script from 'next/script'

export async function generateMetadata() {
  const data = await getContactPage()

  return {
    title: data?.seo?.seoTitle || 'Contact | Beveez Tech',
    description:
      data?.seo?.seoDescription ||
      'Contact Beveez Tech to discuss your web design, development, or SEO project.',
  }
}

export default async function ContactPage() {
  const data = await getContactPage()

  if (!data) return null

  return (
    <>
      {/* HERO (SAFE RENDER) */}
      {data.hero && <ContactHero hero={data.hero} />}

      {/* TRUST STRIP */}
      {data?.trustPoints?.length > 0 && (
        <section className="py-10 bg-white border-y">
          <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-3 gap-6 text-center text-sm text-gray-600">
            {data.trustPoints.map((point: string, i: number) => (
              <div key={i} className="font-medium">
                ✓ {point}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FORM SECTION */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-semibold text-darkBlue mb-6">
              Tell Us About Your Project
            </h2>

            <p className="text-gray-600">
              Please use the Start Your Project form to get in touch.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      {data?.testimonial?.quote && (
        <section className="py-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <p className="text-xl italic text-darkBlue">
              “{data.testimonial.quote}”
            </p>
            <div className="mt-4 font-semibold text-darkBlue">
              — {data.testimonial.author}
            </div>
          </div>
        </section>
      )}

      {/* STRUCTURED DATA */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "url": "https://beveez.tech/contact",
            "name": data.title || 'Contact',
            "description":
              data?.seo?.seoDescription ||
              'Contact Beveez Tech to start your project.',
          }),
        }}
      />
    </>
  )
}
