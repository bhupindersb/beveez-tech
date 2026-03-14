import { sanityClient } from '@/sanity/lib/client'

async function getCaseStudy(slug:string){

  return sanityClient.fetch(

    `*[_type=="caseStudy" && slug.current==$slug][0]`,
    { slug }

  )

}

export default async function CaseStudyPage({params}:any){

  const study = await getCaseStudy(params.slug)

  return(

    <main className="bg-[#f2f1f6] pt-[160px] pb-[120px] px-6">

      <div className="max-w-[900px] mx-auto">

        <h1 className="text-4xl font-heading font-bold text-darkBlue text-center">
          {study.title}
        </h1>

        {/* Overview */}

        <div className="bg-white rounded-2xl p-8 mt-12 shadow-md">

          <h2 className="text-xl font-semibold text-darkBlue">
            Project Overview
          </h2>

          <p className="mt-4 text-darkBlue/70">
            Client: {study.client}
          </p>

          <p className="text-darkBlue/70">
            Platform: {study.platform}
          </p>

          <p className="text-darkBlue/70">
            Industry: {study.industry}
          </p>

        </div>

        {/* Challenge */}

        <div className="bg-white rounded-2xl p-8 mt-10 shadow-md">

          <h2 className="text-xl font-semibold text-darkBlue">
            Challenges
          </h2>

          <ul className="mt-4 space-y-2">

            {study.challenge?.map((item:any,i:number)=>(
              <li key={i}>• {item}</li>
            ))}

          </ul>

        </div>

        {/* Solution */}

        <div className="bg-white rounded-2xl p-8 mt-10 shadow-md">

          <h2 className="text-xl font-semibold text-darkBlue">
            Solution
          </h2>

          <ul className="mt-4 space-y-2">

            {study.solution?.map((item:any,i:number)=>(
              <li key={i}>• {item}</li>
            ))}

          </ul>

        </div>

        {/* Results */}

        <div className="bg-white rounded-2xl p-8 mt-10 shadow-md text-center">

          <h2 className="text-xl font-semibold text-darkBlue">
            Results
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <div>
              <p className="text-3xl font-bold text-orange">
                {study.performanceScore}
              </p>
              <p>Performance</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-orange">
                {study.seoScore}
              </p>
              <p>SEO</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-orange">
                {study.coreVitals}
              </p>
              <p>Core Web Vitals</p>
            </div>

          </div>

        </div>

      </div>

    </main>

  )

}