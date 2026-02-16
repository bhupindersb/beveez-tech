import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // 🛑 Honeypot check (SPAM protection)
    if (data.website) {
      // Silently succeed so bots don't detect failure
      return NextResponse.json({ success: true })
    }

    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown'

    const userAgent =
      req.headers.get('user-agent') || 'unknown'

    // Save to DB
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        goals: data.goals,
        details: data.details,
        plan: data.plan,
        ipAddress: ip,
        userAgent,
      },
    })

    // Email to YOU
    await resend.emails.send({
      from: 'Beveez Tech <hello@beveez.tech>',
      to: 'robby@beveez.tech',
      subject: `🔥 New ${data.plan} Lead`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Plan:</strong> ${data.plan}</p>
        <p><strong>Goals:</strong> ${data.goals}</p>
        <p><strong>Details:</strong> ${data.details}</p>
      `,
    })

    // Auto reply to client
    await resend.emails.send({
      from: 'Beveez Tech <hello@beveez.tech>',
      to: data.email,
      subject: 'We received your project request',
      html: `
        <p>Hi ${data.name},</p>
        <p>Thank you for reaching out! We’ll respond within 24 hours.</p>
        <p>— Beveez Tech</p>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
