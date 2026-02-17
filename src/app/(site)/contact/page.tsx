import ContactHero from '@/components/ContactHero'
import { getContactPage } from '@/sanity/lib/getContactPage'
import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPage()

  return {
    title: data?.seo?.metaTitle || 'Contact | Beveez Tech',
    description:
      data?.seo?.metaDescription ||
      'Contact Beveez Tech for website design, development and SEO services.',
  }
}

export default async function ContactPage() {
  const data = await getContactPage()

  return (
    <>
      {/* HERO */}
      {data?.hero && <ContactHero hero={data.hero} />}

      {/* MAIN SECTION */}
      <section id="contact-form" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE - FORM */}
          <div>
            <h2 className="text-3xl font-heading font-semibold text-darkBlue mb-8">
              Send Us a Message
            </h2>

            <ContactForm />
          </div>

          {/* RIGHT SIDE - TRUST */}
          <div className="space-y-10">

            {/* TRUST POINTS */}
            {data?.trustPoints && (
              <div className="bg-[#f7f9fc] p-8 rounded-3xl shadow-sm">
                <h3 className="font-semibold text-lg text-darkBlue mb-6">
                  Why Work With Us
                </h3>

                <ul className="space-y-4 text-darkBlue/80">
                  {data.trustPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#cf5a20]">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* TESTIMONIAL */}
            {data?.testimonial && (
              <div className="bg-gradient-to-br from-[#fff6f0] to-[#ffe8d6]
                              p-8 rounded-3xl shadow-lg">
                <p className="italic text-darkBlue">
                  "{data.testimonial.quote}"
                </p>

                <div className="mt-4 font-semibold text-darkBlue">
                  — {data.testimonial.author}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
    </>
  )
}
