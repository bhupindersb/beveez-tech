'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimateSharedLayout } from 'framer-motion'

export default function Navbar({ settings }: any) {
  const [open, setOpen] = useState(false)
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

  // Active link matcher
  const isActive = (url: string) => {
    const clean = (v: string) => v.replace(/\/$/, '')
    return clean(pathname) === clean(url) || clean(pathname).startsWith(clean(url) + '/')
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
          <AnimateSharedLayout>
            <ul className="hidden items-center gap-8 text-white md:flex">
              {settings?.navigation?.map((item: any, i: number) => {
                const active = isActive(item.url)

                return (
                  <li key={i} className="relative">
                    <Link
                      href={item.url}
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
            </ul>
          </AnimateSharedLayout>

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
                <Link
                  href={item.url}
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
