export const revalidate = 0

import Hero from '@/components/Hero'
import TrustSection from '@/components/TrustSection'
import ServicesSection from '@/components/ServicesSection'
import ProductShowcase from '@/components/ProductShowcase'
import IndustriesSection from '@/components/IndustriesSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import WhoWeWorkWith from '@/components/WhoWeWorkWith'
import CtaSection from '@/components/CtaSection'

import { Metadata } from 'next'

import { getPageSeo } from '@/sanity/lib/getPageSeo'
import { getHomepageData } from '@/sanity/lib/getHomepageData'
import { Suspense } from 'react'
import BlogSectionWrapper from '@/components/BlogSectionWrapper'


export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo('home')
  const seo = page?.seo

  return {
    title:
      seo?.seoTitle ||
      'Beveez Tech — Digital Products & Custom Technology Solutions',
    description:
      seo?.seoDescription ||
      'Beveez Tech builds focused digital products and high-performance websites, platforms and automations for businesses worldwide.',
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
        title="Technology that solves real problems."
        highlight="Products we build. Solutions we deliver."
        subtitle="Beveez Tech builds focused digital products and high-performance websites, platforms and automations for businesses worldwide."
        primaryCtaText="Explore Our Products"
        primaryCtaUrl="/products"
        secondaryCtaText="Build With Us"
        secondaryCtaUrl="/contact"
      />

      {/* TRUST SECTION */}
      <TrustSection />

      {/* PRODUCT PORTFOLIO */}
      <ProductShowcase />

      {/* SERVICES SECTION */}
      <ServicesSection
        services={services}
        section={servicesSection}
      />

      {/* INDUSTRIES & USE CASES */}
      <IndustriesSection />

      {/* WHY CHOOSE US SECTION */}
      <WhyChooseUs data={whyChooseUs} />

      {/* WHO WE WORK WITH SECTION */}
      <WhoWeWorkWith data={whoWeWorkWith} />

      {/* CTA SECTION */}
      <CtaSection data={ctaSection} />

      {/* BLOG SECTION */}
      <Suspense fallback={<div className="py-20 text-center">Loading blogs...</div>}>
        <BlogSectionWrapper />
      </Suspense>
    </>
  )
}