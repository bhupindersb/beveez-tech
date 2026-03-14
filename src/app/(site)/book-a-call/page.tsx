'use client'

import { useEffect } from 'react'

export default function BookCallPage() {

  useEffect(() => {

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

  }, [])

  return (

    <main className="bg-[#f2f1f6] pt-[160px] pb-[120px] px-6">

      <div className="max-w-[900px] mx-auto">

        {/* HERO */}

        <h1 className="text-5xl font-heading font-bold text-center text-darkBlue">
          Get a Free Website Strategy Session
        </h1>

        <p className="text-center mt-6 text-lg text-darkBlue/80 max-w-[650px] mx-auto">
          In 15 minutes we'll review your website performance, identify growth opportunities and show you how to improve conversions.
        </p>


        {/* WHAT WE WILL DISCUSS */}

        <div className="bg-white mt-16 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-darkBlue text-center">
            What We’ll Cover
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-10 text-darkBlue/80">

            <div className="flex gap-3">
              <span className="text-orange font-bold">✓</span>
              Website performance issues
            </div>

            <div className="flex gap-3">
              <span className="text-orange font-bold">✓</span>
              SEO improvement opportunities
            </div>

            <div className="flex gap-3">
              <span className="text-orange font-bold">✓</span>
              Conversion optimization ideas
            </div>

            <div className="flex gap-3">
              <span className="text-orange font-bold">✓</span>
              Tech stack & scalability advice
            </div>

          </div>

        </div>


        {/* CALENDLY */}

        <div className="bg-white mt-12 rounded-3xl p-10 shadow-lg">

          <h2 className="text-2xl font-semibold text-darkBlue text-center mb-8">
            Choose a Time
          </h2>

          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/robby-beveez/30min"
            style={{ minWidth: '320px', height: '700px' }}
          />

        </div>


        {/* TRUST */}

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">

          <div>
            <p className="text-3xl font-bold text-darkBlue">20+</p>
            <p className="text-darkBlue/70">
              Years Experience
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-darkBlue">90+</p>
            <p className="text-darkBlue/70">
              PageSpeed Optimizations
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-darkBlue">
              Core Web Vitals
            </p>
            <p className="text-darkBlue/70">
              Performance Specialist
            </p>
          </div>

        </div>

      </div>

    </main>

  )
}