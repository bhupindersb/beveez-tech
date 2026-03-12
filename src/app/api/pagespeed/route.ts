import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  const { url } = await req.json()

  const key = process.env.PAGESPEED_API_KEY

  try {

    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${key}`
    )

    const data = await res.json()

    const score =
      Math.round(data.lighthouseResult.categories.performance.score * 100)

    return NextResponse.json({ score })

  } catch (err) {

    return NextResponse.json({ error: true })

  }

}