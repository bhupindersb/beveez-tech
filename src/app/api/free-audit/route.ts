import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL required' },
        { status: 400 }
      )
    }

    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile`

    const res = await fetch(endpoint)

    const data = await res.json()

    const lighthouse = data.lighthouseResult

    const categories = lighthouse.categories
    const audits = lighthouse.audits

    const result = {
      performance: Math.round(categories.performance.score * 100),
      seo: Math.round(categories.seo.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(
        categories['best-practices'].score * 100
      ),

      lcp: audits['largest-contentful-paint']?.displayValue,
      cls: audits['cumulative-layout-shift']?.displayValue,
      ttfb: audits['server-response-time']?.displayValue,

      screenshot:
        audits['final-screenshot']?.details?.data || null,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('AUDIT ERROR:', error)

    return NextResponse.json(
      { error: 'Audit failed' },
      { status: 500 }
    )
  }
}