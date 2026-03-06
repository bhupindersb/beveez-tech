export const revalidate = 86400

import Hero from '@/components/Hero'
import TrustSection from '@/components/TrustSection'
import ServicesSection from '@/components/ServicesSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import WhoWeWorkWith from '@/components/WhoWeWorkWith'
import PricingSection from '@/components/PricingSection'
import CtaSection from '@/components/CtaSection'
import BlogSection from '@/components/BlogSection'

import { Metadata } from 'next'

import { getPageSeo } from '@/sanity/lib/getPageSeo'
import { getHomepageData } from '@/sanity/lib/getHomepageData'


export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo('home')
  const seo = page?.seo

  return {
    title:
      seo?.seoTitle ||
      'Beveez Tech — Web Design, Development & SEO for Startups',
    description:
      seo?.seoDescription ||
      'Beveez Tech helps startups, founders, and small businesses build fast, scalable websites.',
    metadataBase: new URL('https://beveez.tech'),

    openGraph: {
      title: seo?.seoTitle,
      description: seo?.seoDescription,
      images: seo?.seoImage?.asset?.url
        ? [
            {
              url: seo.seoImage.asset.url,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      url: 'https://www.beveez.tech',
      siteName: 'Beveez Tech',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: seo?.seoTitle,
      description: seo?.seoDescription,
      images: seo?.seoImage?.asset?.url
        ? [seo.seoImage.asset.url]
        : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  }
}


export default async function Home() {
  const data = await getHomepageData()

  const page = data?.page
  const trust = data?.trust
  const services = data?.services
  const servicesSection = data?.servicesSection
  const whyChooseUs = data?.whyChooseUs
  const whoWeWorkWith = data?.whoWeWorkWith
  const pricingSection = data?.pricingSection
  const pricingPlans = data?.pricingPlans
  const ctaSection = data?.ctaSection
  const blogs = data?.blogs

  if (!page) {
    return <div>Homepage content not found</div>
  }

  return (
    <>
      {/* HERO SECTION */}
      <Hero
        background={page.heroBackground}
        highlightImage={page.heroHighlightImage}
        title={page.heroHeadline}
        highlight={page.heroHighlight}
        subtitle={page.heroSubheadline}
        primaryCtaText={page.heroPrimaryCtaText}
        primaryCtaUrl={page.heroPrimaryCtaUrl}
        secondaryCtaText={page.heroSecondaryCtaText}
        secondaryCtaUrl={page.heroSecondaryCtaUrl}
      />

      {/* TRUST SECTION */}
      <TrustSection data={trust} />

      {/* SERVICES SECTION */}
      <ServicesSection
        services={services}
        section={servicesSection}
      />

      {/* WHY CHOOSE US SECTION */}
      <WhyChooseUs data={whyChooseUs} />

      {/* WHO WE WORK WITH SECTION */}
      <WhoWeWorkWith data={whoWeWorkWith} />

      {/* PRICING SECTION */}
      <PricingSection
        section={pricingSection}
        plans={pricingPlans}
      />

      {/* CTA SECTION */}
      <CtaSection data={ctaSection} />

      {/* BLOG SECTION */}
      <BlogSection blogs={blogs} />
    </>
  )
}