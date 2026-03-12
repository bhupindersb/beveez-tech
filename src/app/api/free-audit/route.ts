import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {

    let { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    if (!url.startsWith('http')) {
      url = `https://${url}`
    }

    const apiKey = process.env.PAGESPEED_API_KEY

    const endpoint =
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
      `?url=${encodeURIComponent(url)}` +
      `&strategy=mobile` +
      `&key=${apiKey}`

    const res = await fetch(endpoint)

    const data = await res.json()

    if (!data?.lighthouseResult) {

      console.error('PageSpeed API error:', data)

      return NextResponse.json(
        { error: 'Unable to analyze this website.' },
        { status: 400 }
      )
    }

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

      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      ttfb: audits['server-response-time']?.displayValue || 'N/A',

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