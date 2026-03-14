import { sanityClient } from '@/sanity/lib/client'
import Link from 'next/link'

async function getCaseStudies() {

  return sanityClient.fetch(`

    *[_type == "caseStudy"] | order(_createdAt desc){
      title,
      slug,
      client,
      platform,
      performanceScore
    }

  `)

}

export default async function CaseStudiesPage(){

  const studies = await getCaseStudies()

  return(

    <main className="bg-[#f2f1f6] pt-[160px] pb-[120px] px-6">

      <div className="max-w-[1000px] mx-auto">

        <h1 className="text-5xl font-heading font-bold text-darkBlue text-center">
          Case Studies
        </h1>

        <p className="text-center mt-6 text-darkBlue/70">
          Real websites optimized for performance and growth.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {studies.map((study:any,i:number)=>(
            
            <Link
              key={i}
              href={`/case-studies/${study.slug.current}`}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
            >

              <h3 className="text-xl font-semibold text-darkBlue">
                {study.title}
              </h3>

              <p className="text-darkBlue/60 mt-2">
                {study.platform}
              </p>

              {study.performanceScore && (

                <p className="mt-4 text-orange font-semibold">
                  Performance Score: {study.performanceScore}
                </p>

              )}

            </Link>

          ))}

        </div>

      </div>

    </main>

  )

}