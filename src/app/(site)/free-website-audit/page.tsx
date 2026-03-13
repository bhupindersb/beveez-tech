'use client'

import { useState } from 'react'
import ScoreGauge from '@/components/ScoreGauge'
import PerformanceGrade from '@/components/PerformanceGrade'

export default function FreeAuditPage() {

  const [url, setUrl] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function runAudit(e:any){

    e.preventDefault()

    if(!url) return

    setLoading(true)
    setResults(null)

    try{

      const res = await fetch('/api/free-audit',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({url})
      })

      const data = await res.json()

      if(!res.ok){
        alert(data.error || 'Audit failed')
        setLoading(false)
        return
      }

      setResults(data)

    }catch(err){

      console.error(err)
      alert('Unable to analyze the website.')

    }

    setLoading(false)

  }


  async function submitAudit(e:any){

    e.preventDefault()

    const form = e.target

    setSubmitting(true)

    const payload = {

      formType:'free-audit',

      name:form.name.value,
      email:form.email.value,
      company:'',
      goals:'',
      plan:'',
      details:form.website.value

    }

    try{

      const res = await fetch('/api/start-project',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      })

      const result = await res.json()

      if(res.ok){

        alert('Audit request received. We will send your report within 24 hours.')

        form.reset()
        setResults(null)

      }else{

        alert(result.error || 'Server error occurred.')

      }

    }catch(error){

      console.error(error)
      alert('Network error. Please try again.')

    }

    setSubmitting(false)

  }


  async function downloadPDF(){

    if(!results) return

    const res = await fetch('/api/audit-report',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        url,
        performance:results.performance,
        seo:results.seo,
        accessibility:results.accessibility,
        bestPractices:results.bestPractices,
        issues:results.issues
      })
    })

    const blob = await res.blob()

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'website-audit-report.pdf'
    link.click()

  }


  return(

    <main className="bg-[#f2f1f6] py-[120px] px-6">

      <div className="max-w-[1000px] mx-auto">

        <h1 className="text-5xl font-heading font-bold text-center text-darkBlue">
          Free Website Performance Audit
        </h1>

        <p className="text-center mt-6 text-lg text-darkBlue/80">
          Discover what is slowing down your website and how to improve
          Core Web Vitals, SEO and loading speed.
        </p>

        {/* SPEED TEST */}

        <div className="bg-white mt-16 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-darkBlue text-center">
            Instant Website Speed Test
          </h2>

          <form
            onSubmit={runAudit}
            className="mt-8 flex flex-col md:flex-row gap-4"
          >

            <input
              type="url"
              required
              placeholder="https://yourwebsite.com"
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              className="bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
              text-white px-6 py-3 rounded-xl"
            >
              Test Speed
            </button>

          </form>

          {loading && (
            <p className="text-center mt-8">Analyzing website...</p>
          )}

          {results && (

            <div className="mt-12">

              {/* SCORE GRID */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">

                <ScoreGauge score={results.performance} label="Performance"/>
                <ScoreGauge score={results.seo} label="SEO"/>
                <ScoreGauge score={results.accessibility} label="Accessibility"/>
                <ScoreGauge score={results.bestPractices} label="Best Practices"/>

              </div>

              <PerformanceGrade score={results.performance}/>

              {/* CORE WEB VITALS */}

              <div className="bg-[#f8f8fb] rounded-2xl p-6 mt-10">

                <h3 className="text-lg font-semibold mb-4">
                  Core Web Vitals
                </h3>

                <div className="grid md:grid-cols-3 gap-6 text-center">

                  <Metric label="LCP" value={results.lcp}/>
                  <Metric label="CLS" value={results.cls}/>
                  <Metric label="TTFB" value={results.ttfb}/>

                </div>

              </div>

              {/* ISSUES */}

              {results?.issues && (

                <div className="bg-[#fff5f2] border border-orange/20 rounded-2xl p-6 mt-10">

                  <h3 className="text-lg font-semibold text-darkBlue mb-4">
                    What Is Slowing Down Your Website
                  </h3>

                  <ul className="space-y-2">

                    {results.issues.map((issue:any,i:number)=>(
                      <li key={i} className="flex gap-2">
                        <span className="text-orange">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}

                  </ul>

                </div>

              )}

              {/* TECHNOLOGY */}

              {results?.technologies && (

                <div className="bg-white rounded-2xl shadow-md p-6 mt-10">

                  <h3 className="text-lg font-semibold text-darkBlue mb-4">
                    Technology Detected
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {results.technologies.map((tech:any,i:number)=>(
                      <span key={i} className="px-3 py-1 bg-[#f2f1f6] rounded-full text-sm">
                        {tech}
                      </span>
                    ))}

                  </div>

                </div>

              )}

              {/* PAGE SIZE */}

              {results?.pageSize && (

                <div className="bg-white rounded-2xl shadow-md p-6 mt-6 text-center">

                  <h3 className="text-lg font-semibold text-darkBlue">
                    Estimated Page Size
                  </h3>

                  <p className="text-3xl font-bold text-orange mt-2">
                    {results.pageSize} MB
                  </p>

                </div>

              )}

              {/* REVENUE IMPACT */}

              {results?.revenueImpact && (

                <div className="bg-[#fff7f2] border border-orange/20 rounded-2xl p-8 mt-12">

                  <h3 className="text-xl font-semibold text-darkBlue mb-4 text-center">
                    Estimated Revenue Impact From Website Speed
                  </h3>

                  <p className="text-center text-darkBlue/70 mb-6">
                    Largest Contentful Paint:
                    <span className="font-semibold text-orange">
                      {' '} {results.revenueImpact.loadTime}
                    </span>
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 text-sm">

                    <ImpactCard
                      title="Bounce Rate Impact"
                      text={results.revenueImpact.bounceIncrease}
                    />

                    <ImpactCard
                      title="Conversion Impact"
                      text={results.revenueImpact.conversionLoss}
                    />

                    <ImpactCard
                      title="SEO Impact"
                      text={results.revenueImpact.seoImpact}
                    />

                  </div>

                </div>

              )}

              {/* DOWNLOAD REPORT */}

              <div className="text-center">

                <button
                  onClick={downloadPDF}
                  className="mt-10 px-6 py-3 rounded-xl bg-darkBlue text-white"
                >
                  Download Full Audit Report
                </button>

              </div>

            </div>

          )}

        </div>

        {/* FORM */}

        <div className="bg-white mt-20 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-center text-darkBlue">
            Request Full Audit
          </h2>

          <form
            onSubmit={submitAudit}
            className="mt-10 space-y-6 max-w-[600px] mx-auto"
          >

            <input
              name="name"
              required
              placeholder="Your Name"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="website"
              required
              placeholder="Website URL"
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              disabled={submitting}
              className="w-full rounded-full
              bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
              py-4 text-white font-semibold"
            >
              {submitting ? 'Submitting...' : 'Request Free Audit'}
            </button>

          </form>

        </div>

      </div>

    </main>

  )

}



function Metric({label,value}:any){

  return(

    <div>

      <p className="text-sm text-darkBlue/60">{label}</p>

      <p className="text-lg font-semibold text-darkBlue">
        {value}
      </p>

    </div>

  )

}

function ImpactCard({title,text}:any){

  return(

    <div className="bg-white p-5 rounded-xl shadow-sm">

      <p className="font-semibold text-darkBlue mb-2">
        {title}
      </p>

      <p className="text-darkBlue/70">
        {text}
      </p>

    </div>

  )

}