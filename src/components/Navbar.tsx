'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, LayoutGroup } from 'framer-motion'

export default function Navbar({ settings }: any) {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Normalize pathname
  const currentPath =
    pathname !== '/' ? pathname.replace(/\/$/, '') : '/'

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Detect scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const productLinks = [
    { label: 'UNLIVO', url: '/products/unlivo' },
    { label: 'AffilixWP', url: '/products/affilixwp' },
    { label: 'Docs AI', url: '/products/docs-ai' },
    { label: 'Beveez AI', url: '/products/beveez-ai' },
  ]

  // Active link matcher
  const isActive = (url: string) => {
    const normalize = (v: string) =>
      '/' + v.replace(/^\/|\/$/g, '')

    const current = normalize(pathname)
    const target = normalize(url)

    return current === target || current.startsWith(target + '/')
  }

  return (
    <>
      {/* NAV BAR */}
      <nav
        className={`fixed top-4 left-0 right-0 mx-auto z-50 w-[90%] md:max-w-[900px]
        rounded-full py-3 pl-5 pr-3 md:top-6
        transition-all duration-300
        ${
          scrolled
            ? 'bg-darkBlue/60 backdrop-blur-xl shadow-lg'
            : 'bg-darkBlue'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            {settings?.logo?.asset?.url && (
              <Image
                src={settings.logo.asset.url}
                alt="Beveez Tech"
                width={140}
                height={32}
                className="h-8 w-auto"
                priority
              />
            )}
          </Link>

          {/* DESKTOP MENU */}
          <LayoutGroup>
            <ul className="hidden items-center gap-8 text-white md:flex">
              {settings?.navigation?.map((item: any, i: number) => {
                const active = isActive(item.url)

                return (
                  <li key={i} className="relative">
                    <Link href={`/${item.url.replace(/^\//, '')}`}
                      className={`relative px-1 transition
                        ${
                          active
                            ? 'text-orange font-semibold'
                            : 'text-white hover:text-orange'
                        }
                      `}
                    >
                      {item.label}

                      {/* 🔥 Animated underline */}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 h-[2px] w-full bg-orange rounded-full"
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
              <li className="group relative">
                <Link
                  href="/products"
                  className={`relative px-1 transition ${
                    isActive('/products')
                      ? 'text-orange font-semibold'
                      : 'text-white hover:text-orange'
                  }`}
                >
                  Products
                  {isActive('/products') && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-orange"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="rounded-2xl border border-white/10 bg-darkBlue p-2 shadow-2xl">
                    {productLinks.map((item) => (
                      <Link
                        key={item.url}
                        href={item.url}
                        className={`block rounded-xl px-4 py-3 text-sm transition hover:bg-white/10 hover:text-orange ${
                          isActive(item.url) ? 'text-orange' : 'text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      className="mt-1 block rounded-xl border-t border-white/10 px-4 py-3 text-sm font-semibold text-[#65c6db] transition hover:bg-white/10"
                    >
                      View all products →
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </LayoutGroup>

          {/* DESKTOP CTA */}
          {settings?.navCtaText && settings?.navCtaUrl && (
            <Link
              href={settings.navCtaUrl}
              className="hidden rounded-full bg-gradient-to-r
              from-[#cf5a20] to-[#f68f1e]
              px-6 py-2 text-white font-semibold
              transition hover:from-[#f68f1e] hover:to-[#cf5a20]
              md:inline-block"
            >
              {settings.navCtaText}
            </Link>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className="ml-auto text-2xl text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      <div
        className={`fixed top-[74px] md:left-1/2 z-40 w-[90%] md:max-w-[900px]
        md:-translate-x-1/2 rounded-3xl px-6 py-6 shadow-xl
        transition-all duration-300 ease-out md:hidden ml-4
        ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }
        ${
          scrolled
            ? 'bg-darkBlue/40 backdrop-blur-xl'
            : 'bg-darkBlue'
        }`}
      >
        <ul className="flex flex-col gap-6 text-center text-white">
          {settings?.navigation?.map((item: any, i: number) => {
            const active = isActive(item.url)

            return (
              <li key={i}>
                <Link href={`/${item.url.replace(/^\//, '')}`}
                  onClick={() => setOpen(false)}
                  className={`text-lg transition
                    ${
                      active
                        ? 'text-orange font-semibold'
                        : 'text-white'
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
          <li className="pt-1">
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className={`text-lg transition ${isActive('/products') ? 'font-semibold text-orange' : 'text-white'}`}
              >
                Products
              </Link>
              <button
                type="button"
                onClick={() => setProductsOpen(!productsOpen)}
                aria-label={productsOpen ? 'Collapse products' : 'Expand products'}
                aria-expanded={productsOpen}
                className="rounded-full px-2 text-xl text-white/80"
              >
                {productsOpen ? '−' : '+'}
              </button>
            </div>
            {productsOpen && (
              <ul className="mt-4 space-y-3 rounded-2xl bg-white/5 px-4 py-4">
                {productLinks.map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      onClick={() => setOpen(false)}
                      className={`text-sm transition ${isActive(item.url) ? 'font-semibold text-orange' : 'text-white/85'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/products"
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold text-[#65c6db]"
                  >
                    View all products
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {settings?.navCtaText && settings?.navCtaUrl && (
          <Link
            href={settings.navCtaUrl}
            className="mt-6 block rounded-full bg-gradient-to-r
            from-[#cf5a20] to-[#f68f1e]
            px-6 py-3 text-center font-semibold text-white
            transition hover:from-[#f68f1e] hover:to-[#cf5a20]"
            onClick={() => setOpen(false)}
          >
            {settings.navCtaText}
          </Link>
        )}
      </div>
    </>
  )
}
