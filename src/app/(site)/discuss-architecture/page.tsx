import LeadForm from '@/components/LeadForm'

export default function DiscussArchitecture() {
  return (
    <section className="py-32 bg-[#f7f9fc]">
      <div className="max-w-[800px] mx-auto px-6">

        <LeadForm
          title="Discuss Your Architecture"
          subtitle="Let’s design a scalable system that supports your growth."
          fields={[
            { name: 'name', type: 'text', placeholder: 'Full Name', required: true },
            { name: 'company', type: 'text', placeholder: 'Company Name', required: false },
            { name: 'email', type: 'email', placeholder: 'Email Address', required: true },
            { name: 'stack', type: 'text', placeholder: 'Current Tech Stack', required: false },
            {
              name: 'projectType',
              type: 'select',
              label: 'Project Type',
              required: true,
              options: ['Headless Build', 'SaaS Platform', 'Migration', 'Enterprise Upgrade'],
            },
            {
              name: 'budget',
              type: 'select',
              label: 'Budget Range',
              required: true,
              options: ['$5k–$15k', '$15k–$50k', '$50k+'],
            },
            { name: 'details', type: 'textarea', placeholder: 'Project Details', required: true },
          ]}
        />

      </div>
    </section>
  )
}