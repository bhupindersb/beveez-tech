export default function ProjectHero() {
  return (
    <section className="pt-[180px] pb-[120px] text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-[40px] md:text-[64px] font-heading font-bold text-darkBlue leading-tight">
          Start Your Project
        </h1>

        <p className="mt-6 text-lg text-darkBlue/80">
          Tell us what you’re building and we’ll help you move forward with
          clarity, speed, and confidence.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-darkBlue/70">
          <span>✓ Clear scope</span>
          <span>✓ No pressure</span>
          <span>✓ Expert guidance</span>
        </div>
      </div>
    </section>
  )
}
