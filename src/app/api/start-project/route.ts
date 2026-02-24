import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

function formatDate() {
  return new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Honeypot spam protection
    if (data.website_hidden) {
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
        company: data.company || null,
        goals: data.goals || null,
        details: data.details || null,
        plan: data.plan || null,
        formType: data.formType || 'start-project',
        ipAddress: ip,
        userAgent,
      },
    })

    // -----------------------------
    // INTERNAL NOTIFICATION EMAIL
    // -----------------------------

    await resend.emails.send({
      from: 'Beveez Tech <hello@beveez.tech>',
      to: 'robby@beveez.tech',
      subject: `🔥 New ${data.formType?.toUpperCase() || 'START PROJECT'} Lead`,
      html: `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || '-'}</p>
        <p><strong>Plan:</strong> ${data.plan || '-'}</p>
        <p><strong>Goals:</strong> ${data.goals || '-'}</p>
        <p><strong>Details:</strong> ${data.details || '-'}</p>
        <hr/>
        <p style="font-size:12px;color:#888;">
          IP: ${ip}<br/>
          User Agent: ${userAgent}
        </p>
      </div>
      `,
      text: `
New Lead Received

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || '-'}
Plan: ${data.plan || '-'}
Goals: ${data.goals || '-'}
Details: ${data.details || '-'}

IP: ${ip}
User Agent: ${userAgent}
      `,
    })

    // -----------------------------
    // CLIENT AUTO-REPLY
    // -----------------------------

    const formattedDate = formatDate()

    let subject = 'We received your request – Beveez Tech'
    let html = ''
    let text = ''

    // FREE AUDIT EMAIL
    if (data.formType === 'free-audit') {
      subject = 'Your Free Website Audit Is In Progress 🚀'

      html = `
      <html>
      <body style="margin:0;background:#f4f6f8;font-family:Arial;">
      <table width="100%" style="padding:40px 20px;">
      <tr><td align="center">
      <table width="600" style="background:#fff;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:linear-gradient(90deg,#cf5a20,#f68f1e);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;">Free Audit In Progress 🚀</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:40px;color:#0f172a;">
          <h2>Hi ${data.name},</h2>
          <p>Thank you for requesting your <strong>Free Website Performance Audit</strong>.</p>
          <p>We are reviewing your website and will send a detailed report within 24 hours.</p>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;margin:25px 0;">
            <strong>Submitted:</strong> ${formattedDate}
          </div>
          <div style="text-align:center;margin-top:30px;">
            <a href="https://beveez.tech"
               style="background:#cf5a20;color:#fff;padding:14px 28px;border-radius:50px;text-decoration:none;">
              Visit Beveez Tech
            </a>
          </div>
          <p style="margin-top:40px;font-size:14px;color:#64748b;">
            — Beveez Tech Team
          </p>
        </td>
      </tr>
      </table>
      </td></tr>
      </table>
      </body>
      </html>
      `

      text = `
Hi ${data.name},

Thank you for requesting your Free Website Performance Audit.

We are reviewing your website and will send your detailed report within 24 hours.

Beveez Tech
https://beveez.tech
      `
    }

    // ARCHITECTURE CALL EMAIL
    else if (data.formType === 'architecture') {
      subject = 'Let’s Architect Something Powerful 🧠'

      html = `
      <html>
      <body style="margin:0;background:#f4f6f8;font-family:Arial;">
      <table width="100%" style="padding:40px 20px;">
      <tr><td align="center">
      <table width="600" style="background:#fff;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:linear-gradient(90deg,#cf5a20,#f68f1e);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;">Architecture Consultation 🧠</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:40px;color:#0f172a;">
          <h2>Hi ${data.name},</h2>
          <p>We’ve received your architecture consultation request.</p>
          <p>Our team will evaluate your tech stack and scalability strategy.</p>
          <div style="text-align:center;margin:35px 0;">
            <a href="https://calendly.com/YOUR_LINK"
               style="background:#cf5a20;color:#fff;padding:14px 28px;border-radius:50px;text-decoration:none;">
              Schedule Strategy Call
            </a>
          </div>
          <p style="margin-top:40px;font-size:14px;color:#64748b;">
            We’ll contact you within 24 hours.
          </p>
        </td>
      </tr>
      </table>
      </td></tr>
      </table>
      </body>
      </html>
      `

      text = `
Hi ${data.name},

We’ve received your architecture consultation request.

Our team will review your setup and contact you within 24 hours.

Beveez Tech
      `
    }

    // START YOUR PROJECT EMAIL
    else if (data.formType === 'start-your-project') {
      subject = 'Your Project Request Has Been Received 🚀'

      html = `
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8">
      <meta name="color-scheme" content="light dark">
      </head>

      <body style="margin:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
      <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.05);">

      <!-- HEADER -->
      <tr>
        <td style="background:linear-gradient(90deg,#cf5a20,#f68f1e);padding:35px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">
            Let’s Build Something Exceptional 🚀
          </h1>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="padding:40px;color:#0f172a;">

          <h2 style="margin-top:0;">Hi ${data.name},</h2>

          <p style="font-size:15px;line-height:1.6;color:#475569;">
            Thank you for submitting your project request. We’re excited to explore how we can bring your vision to life.
          </p>

          <div style="background:#f8fafc;padding:20px;border-radius:12px;margin:30px 0;">
            <strong>What happens next?</strong>
            <ul style="margin-top:10px;color:#475569;line-height:1.8;padding-left:18px;">
              <li>We review your requirements</li>
              <li>Assess scope & technical feasibility</li>
              <li>Prepare a tailored strategy proposal</li>
            </ul>
          </div>

          <p style="font-size:15px;line-height:1.6;color:#475569;">
            Our team will reach out within <strong>24 hours</strong> with next steps.
          </p>

          <div style="text-align:center;margin:35px 0;">
            <a href="https://calendly.com/YOUR_LINK"
              style="background:#cf5a20;
                      color:#ffffff;
                      padding:14px 30px;
                      border-radius:50px;
                      text-decoration:none;
                      font-weight:bold;
                      display:inline-block;">
              Schedule a Strategy Call
            </a>
          </div>

          <p style="font-size:14px;color:#64748b;margin-top:40px;">
            If you have additional details to share, simply reply to this email.
          </p>

          <p style="margin-top:30px;font-size:14px;color:#94a3b8;">
            — The Beveez Tech Team
          </p>

        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:#f1f5f9;padding:20px;text-align:center;font-size:12px;color:#64748b;">
          © ${new Date().getFullYear()} Beveez Tech · Chandigarh, India<br/>
          Building Scalable Digital Experiences
        </td>
      </tr>

      </table>

      </td>
      </tr>
      </table>

      </body>
      </html>
      `

      text = `
    Hi ${data.name},

    Thank you for submitting your project request.

    We will review your requirements and respond within 24 hours with next steps.

    You may also schedule a strategy call:
    https://calendly.com/YOUR_LINK

    — Beveez Tech
      `
    }

    // DEFAULT EMAIL
    else {
      html = `
      <p>Hi ${data.name},</p>
      <p>Thank you for reaching out. We’ll respond within 24 hours.</p>
      <p>— Beveez Tech</p>
      `
      text = `
Hi ${data.name},

Thank you for reaching out. We’ll respond within 24 hours.

Beveez Tech
      `
    }

    await resend.emails.send({
      from: 'Beveez Tech <hello@beveez.tech>',
      to: data.email,
      subject,
      html,
      text,
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