export default function Hero() {
  return (
    <section className="relative pt-[140px] pb-[80px] overflow-hidden">

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br 
                        from-[#f5f7fa] via-[#ffffff] to-[#fdf3ec]" />

        {/* Decorative Blurs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] 
                        bg-[#f68f1e]/10 rounded-full blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] 
                        bg-[#cf5a20]/10 rounded-full blur-[120px]" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">

            <h1 className="text-[48px] md:text-[64px] font-bold text-[#0f2e35] leading-tight">
            Start Your Project
            </h1>

            <p className="mt-6 text-lg text-[#5a6d72] max-w-2xl mx-auto">
            Choose a plan to get started — we’ll tailor everything around your goals.
            </p>

            <p className="mt-4 text-sm text-[#8fa1a6]">
            Transparent pricing • No hidden fees • Global-ready solutions
            </p>

        </div>
    </section>

  )
}
