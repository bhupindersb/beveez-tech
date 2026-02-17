import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Save to DB
    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        goals: 'Contact Page Inquiry',
        details: data.message,
        plan: 'custom',
      },
    })

    // Send email
    await resend.emails.send({
      from: 'Beveez Tech <hello@beveez.tech>',
      to: 'robby@beveez.tech',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || '-'}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
