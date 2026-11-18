import { Blocks, Globe2, Layers3, Workflow } from 'lucide-react'

const strengths = [
  { icon: Blocks, title: 'Products built in-house', detail: 'We create and improve our own digital products.' },
  { icon: Layers3, title: 'Product thinking', detail: 'We focus on useful outcomes, not technology for its own sake.' },
  { icon: Workflow, title: 'Connected solutions', detail: 'Websites, platforms and workflows designed to work together.' },
  { icon: Globe2, title: 'Built for a wider market', detail: 'Digital experiences for businesses and users across markets.' },
]

export default function TrustSection() {
  return (
    <section className="bg-[#f2f1f6] px-5 py-16 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#147da5]">More than a services company</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#002b3a] md:text-4xl">We build products, and we put that experience to work.</h2>
          <p className="mt-4 leading-7 text-[#52656d]">Our own products keep us close to real product challenges. That same practical mindset shapes the websites, platforms and digital systems we build with clients.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#efd9cb] text-[#cf5a20]"><Icon size={27} /></div>
              <h3 className="mt-5 text-lg font-semibold text-[#002b3a]">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#52656d]">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
