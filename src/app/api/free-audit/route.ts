import { NextResponse } from 'next/server'

type AuditResult = {
  performance: number
  seo: number
  accessibility: number
  bestPractices: number
  lcp: string
  cls: string
  ttfb: string
  screenshot: string | null
  issues: string[]
  technologies?: string[]
  pageSize?: string
}

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
    const categories = lighthouse.categories || {}
    const audits = lighthouse.audits || {}

    const performance = Math.round((categories?.performance?.score ?? 0) * 100)
    const seo = Math.round((categories?.seo?.score ?? 0) * 100)
    const accessibility = Math.round((categories?.accessibility?.score ?? 0) * 100)
    const bestPractices = Math.round((categories?.['best-practices']?.score ?? 0) * 100)

    const lcp = audits?.['largest-contentful-paint']?.displayValue || 'N/A'
    const cls = audits?.['cumulative-layout-shift']?.displayValue || 'N/A'
    const ttfb = audits?.['server-response-time']?.displayValue || 'N/A'

    // -------------------------
    // DIAGNOSTIC ENGINE
    // -------------------------

    const issues: string[] = []

    if (performance < 50) {
      issues.push('Your website performance score is very low, indicating slow loading times.')
    }

    if (audits?.['uses-optimized-images']?.score === 0) {
      issues.push('Images on the website are not optimized and may be slowing down the page.')
    }

    if (audits?.['render-blocking-resources']?.score === 0) {
      issues.push('Render blocking JavaScript or CSS is delaying page rendering.')
    }

    if (audits?.['server-response-time']?.score === 0) {
      issues.push('The server response time appears slow and may need backend optimization.')
    }

    if (audits?.['unused-javascript']?.score === 0) {
      issues.push('Unused JavaScript was detected, which increases page weight.')
    }

    if (issues.length === 0) {
      issues.push('No major issues detected, but further optimization could still improve performance.')
    }

    const result: AuditResult = {

      performance,
      seo,
      accessibility,
      bestPractices,

      lcp,
      cls,
      ttfb,

      screenshot:
        audits?.['final-screenshot']?.details?.data || null,

      issues

    }

    // -------------------------
    // TECHNOLOGY DETECTION
    // -------------------------

    const technologies: string[] = []

    const htmlResponse = await fetch(url)
    const html = await htmlResponse.text()

    if (html.includes('wp-content') || html.includes('wordpress')) {
      technologies.push('WordPress')
    }

    if (html.includes('cdn.shopify.com')) {
      technologies.push('Shopify')
    }

    if (html.includes('data-reactroot') || html.includes('_next')) {
      technologies.push('React / Next.js')
    }

    if (html.includes('cloudflare')) {
      technologies.push('Cloudflare')
    }

    if (html.includes('googletagmanager') || html.includes('google-analytics')) {
      technologies.push('Google Analytics')
    }

    if (html.includes('bootstrap')) {
      technologies.push('Bootstrap')
    }

    if (technologies.length === 0) {
      technologies.push('Unknown / Custom Stack')
    }

    result.technologies = technologies

    // -------------------------
    // PAGE SIZE ESTIMATE
    // -------------------------

    const pageSizeKB = html.length / 1024
    const pageSizeMB = pageSizeKB / 1024

    result.pageSize = pageSizeMB.toFixed(2)

    return NextResponse.json(result)

  } catch (error) {

    console.error('AUDIT ERROR:', error)

    return NextResponse.json(
      { error: 'Audit failed' },
      { status: 500 }
    )

  }
}