export const revalidate = 0

import { sanityClient } from '@/sanity/lib/client'
import Hero from '@/components/Hero'
import TrustSection from '@/components/TrustSection'
import ServicesSection from '@/components/ServicesSection'

import { getTrustSection } from '@/sanity/lib/getTrustSection'
import { getServices } from '@/sanity/lib/getServices'
import { getServicesSection } from '@/sanity/lib/getServicesSection'

import { getWhyChooseUs } from '@/sanity/lib/getWhyChooseUs'
import WhyChooseUs from '@/components/WhyChooseUs'

import { getWhoWeWorkWith } from '@/sanity/lib/getWhoWeWorkWith'
import WhoWeWorkWith from '@/components/WhoWeWorkWith'

import { getPricingSection } from '@/sanity/lib/getPricingSection'
import { getPricingPlans } from '@/sanity/lib/getPricingPlans'
import PricingSection from '@/components/PricingSection'

import CtaSection from '@/components/CtaSection'
import { getCtaSection } from '@/sanity/lib/getCtaSection'

import { getBlogs } from '@/sanity/lib/getBlogs'
import BlogSection from '@/components/BlogSection'

import { Metadata } from 'next'
import { getPageSeo } from '@/sanity/lib/getPageSeo'
import { urlFor } from '@/sanity/lib/image' 


export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('home')

  return {
    title: seo?.seoTitle || 'Beveez Tech – Design & Development Studio',
    description:
      seo?.seoDescription ||
      'We help startups and founders design, build, and scale digital products.',
    openGraph: {
      title: seo?.seoTitle,
      description: seo?.seoDescription,
      images: seo?.seoImage?.asset?.url
        ? [{ url: seo.seoImage.asset.url }]
        : [],
      url: 'https://www.beveez.tech',
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
  }
}


async function getHomePage() {
  return sanityClient.fetch(`
    *[_type == "page" && slug.current == "home"][0]{
      heroBackground,
      heroHighlightImage,
      heroHeadline,
      heroHighlight,
      heroSubheadline,
      heroPrimaryCtaText,
      heroPrimaryCtaUrl,
      heroSecondaryCtaText,
      heroSecondaryCtaUrl,
      seo {
        seoTitle,
        seoDescription,
        seoImage {
          asset->{
            url
          }
        }
      }
    }
  `)
}


export default async function Home() {
  const page = await getHomePage()
  const trust = await getTrustSection()
  const services = await getServices() 
  const servicesSection = await getServicesSection()
  const whyChooseUs = await getWhyChooseUs()
  const whoWeWorkWith = await getWhoWeWorkWith()
  const pricingSection = await getPricingSection()
  const pricingPlans = await getPricingPlans()
  const ctaSection = await getCtaSection()
  const blogs = await getBlogs(50)



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
