import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  const { url } = await req.json()

  const apiKey = process.env.PAGESPEED_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing PageSpeed API key' },
      { status: 500 }
    )
  }

  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}`
  )

  const data = await response.json()

  const score =
    data.lighthouseResult.categories.performance.score * 100

  return NextResponse.json({ score })

}