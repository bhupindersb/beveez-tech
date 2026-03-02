import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
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

    // Initialize Resend SAFELY inside handler
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.warn('RESEND_API_KEY is not defined')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

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
    console.error('Contact API error:', error)

    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}