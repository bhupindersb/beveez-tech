import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, company, goals, details, plan } = body

    // Basic validation
    if (!name || !email || !plan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company,
        goals,
        details,
        plan,
      },
    })

    // Send notification email
    await resend.emails.send({
      from: 'Beveez Tech <hello@beveez.tech>',
      to: 'robby@beveez.tech',
      subject: `🔥 New ${plan.toUpperCase()} Lead`,
      html: `
        <h2>New Project Request</h2>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || '-'}</p>
        <p><strong>Goals:</strong> ${goals || '-'}</p>
        <p><strong>Details:</strong> ${details || '-'}</p>
        <hr />
        <p>Lead ID: ${lead.id}</p>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
