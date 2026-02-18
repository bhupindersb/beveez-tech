import { getContactPage } from '@/sanity/lib/getContactPage'
import ContactHero from '@/components/ContactHero'
import ContactForm from '@/components/ContactForm'
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
      {data.contactHero && <ContactHero hero={data.contactHero} />}

      {/* TRUST STRIP */}
      {data?.contactTrustPoints?.length > 0 && (
        <section className="py-12 bg-white border-y">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-sm text-gray-600 text-center">
              {data.contactTrustPoints.map((point: string, i: number) => (
                <div
                  key={i}
                  className="font-medium min-w-[250px]"
                >
                  ✓ {point}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FORM SECTION */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-semibold text-darkBlue mb-8 text-center">
              Tell Us About Your Project
            </h2>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      {data?.contactTestimonial?.quote && (
        <section className="py-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <p className="text-2xl italic text-darkBlue leading-relaxed">
              “{data.contactTestimonial.quote}”
            </p>

            {data.contactTestimonial.author && (
              <div className="mt-6 font-semibold text-darkBlue">
                — {data.contactTestimonial.author}
              </div>
            )}
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
