import LeadForm from '@/components/LeadForm'

export default function GetFreeAudit() {
  return (
    <section className="py-32 bg-[#f7f9fc]">
      <div className="max-w-[800px] mx-auto px-6">

        <LeadForm
          title="Get Your Free Website Performance Audit"
          subtitle="We’ll review your speed, Core Web Vitals, and technical setup."
          formType="free-audit"
          fields={[
            { name: 'name', type: 'text', placeholder: 'Full Name', required: true },
            { name: 'email', type: 'email', placeholder: 'Email Address', required: true },
            { name: 'website', type: 'url', placeholder: 'Website URL', required: true },
            {
              name: 'traffic',
              type: 'select',
              label: 'Monthly Traffic',
              required: true,
              options: ['0–10k', '10k–50k', '50k–100k', '100k+'],
            },
            { name: 'hosting', type: 'text', placeholder: 'Hosting Provider', required: false },
            { name: 'concern', type: 'textarea', placeholder: 'Biggest Performance Concern', required: true },
          ]}
        />

      </div>
    </section>
  )
}