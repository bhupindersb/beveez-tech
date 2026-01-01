export default function Header() {
  return (
    <header className="absolute top-6 left-0 w-full z-50 flex justify-center">
      <div
        className="
          bg-darkBlue
          max-w-[780px]
          w-full
          mx-6
          px-8
          py-4
          rounded-full
          flex
          items-center
          justify-between
        "
      >
        {/* Logo */}
        <div className="font-heading text-white text-xl font-bold">
          Beveez
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-body text-sm text-white">
          <a href="#services" className="hover:text-orange transition">
            Services
          </a>
          <a href="#pricing" className="hover:text-orange transition">
            Pricing
          </a>
          <a href="#contact" className="hover:text-orange transition">
            Contact
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#audit"
          className="
            px-5 py-2 rounded-full text-sm font-medium text-white
            bg-gradient-to-r from-darkOrange to-orange
            hover:from-orange hover:to-darkOrange
            transition-all duration-300
          "
        >
          Free Audit
        </a>
      </div>
    </header>
  )
}
