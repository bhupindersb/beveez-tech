import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LeadTable from './LeadTable'

export default async function LeadsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value

  if (token !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const rawLeads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // Convert Date → string for client component
  const leads = rawLeads.map((lead) => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
  }))

  return (
    <>
      <h1 className="text-3xl font-semibold text-darkBlue mb-10">
        Lead Management
      </h1>

      <LeadTable leads={leads} />
    </>
  )
}
