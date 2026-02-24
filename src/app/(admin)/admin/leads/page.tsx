import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LeadTable from './LeadTable'

export default async function LeadsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (token !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const rawLeads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      notes: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  const leads = rawLeads.map((lead) => {
    const date = new Date(lead.createdAt)

    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      plan: lead.plan,
      status: lead.status,
      formType: lead.formType,
      details: lead.details,

      createdAt: date.toISOString(),
      formattedDate: date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      }),

      notes: lead.notes.map((note) => ({
        id: note.id,
        text: note.text,
        createdAt: note.createdAt.toISOString(),
      })),
    }
  })

  return (
    <>
      <h1 className="text-3xl font-semibold text-darkBlue mb-10">
        Lead Management
      </h1>

      <LeadTable leads={leads} />
    </>
  )
}