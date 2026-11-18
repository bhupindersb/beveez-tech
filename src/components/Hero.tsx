'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Bot, Building2, Code2, Puzzle } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
  background?: any
  title: string
  highlight: string
  subtitle: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
}

const ecosystem = [
  { label: 'UNLIVO', detail: 'Property platform', icon: Building2, className: 'left-0 top-[12%]' },
  { label: 'AffilixWP', detail: 'Affiliate tools', icon: Puzzle, className: 'right-0 top-[25%]' },
  { label: 'Docs AI', detail: 'Code documentation', icon: Code2, className: 'left-[2%] bottom-[13%]' },
  { label: 'Beveez AI', detail: 'AI workflows', icon: Bot, className: 'right-[1%] bottom-[8%]' },
]

export default function Hero({
  background,
  title,
  highlight,
  subtitle,
  primaryCtaText,
  primaryCtaUrl,
  secondaryCtaText,
  secondaryCtaUrl,
}: HeroProps) {
  const reduceMotion = useReducedMotion()

  const reveal = (delay = 0) => reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay, ease: 'easeOut' } }

  return (
    <section className="relative isolate overflow-hidden bg-[#f4f3f8] px-5 pb-16 pt-32 text-darkBlue sm:px-7 md:pb-24 md:pt-40">
      {background && (
        <Image
          src={urlFor(background).width(1800).quality(80).format('webp').url()}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="-z-20 absolute inset-0 object-cover opacity-20 mix-blend-multiply"
        />
      )}

      <div aria-hidden="true" className="-z-10 pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,43,58,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,43,58,0.035)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <motion.div
          className="absolute -right-32 top-10 h-[440px] w-[440px] rounded-full bg-[#65c6db]/25 blur-[100px]"
          animate={reduceMotion ? undefined : { x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-36 bottom-0 h-[380px] w-[380px] rounded-full bg-[#f68f1e]/15 blur-[100px]"
          animate={reduceMotion ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="relative z-10 text-center lg:text-left">
          <motion.div {...reveal(0.05)} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#147da5]/15 bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.19em] text-[#147da5] shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2497c8] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2497c8]" />
            </span>
            A product-led technology studio
          </motion.div>

          <motion.h1 {...reveal(0.16)} className="font-heading text-[36px] font-semibold leading-[1.12] tracking-[-0.035em] text-[#002b3a] sm:text-[46px] md:text-[56px] lg:text-[58px] xl:text-[66px]">
            {title}
            <span className="mt-3 block bg-gradient-to-r from-[#1689bd] via-[#42b6d4] to-[#147da5] bg-clip-text pb-1 text-transparent">
              {highlight}
            </span>
          </motion.h1>

          <motion.p {...reveal(0.28)} className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#405b65] sm:text-lg lg:mx-0">
            {subtitle}
          </motion.p>

          <motion.div {...reveal(0.4)} className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            {primaryCtaText && primaryCtaUrl && (
              <Link href={primaryCtaUrl} className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-8 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(207,90,32,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(207,90,32,0.3)]">
                {primaryCtaText}
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            )}
            {secondaryCtaText && secondaryCtaUrl && (
              <Link href={secondaryCtaUrl} className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full border border-[#002b3a]/25 bg-white/65 px-8 py-4 font-semibold text-[#002b3a] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#002b3a] hover:bg-white">
                {secondaryCtaText}
                <ArrowUpRight size={18} />
              </Link>
            )}
          </motion.div>

          <motion.div {...reveal(0.52)} className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#607780] lg:justify-start">
            <span>Digital products</span><span className="h-1 w-1 rounded-full bg-[#f68f1e]" />
            <span>Web platforms</span><span className="h-1 w-1 rounded-full bg-[#f68f1e]" />
            <span>Intelligent workflows</span>
          </motion.div>
        </div>

        <motion.div {...reveal(0.25)} className="relative mx-auto aspect-square w-full max-w-[510px]" aria-label="Beveez Tech product ecosystem">
          <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-white/90 via-[#eaf7fa]/75 to-[#fce9d9]/70 shadow-[0_25px_90px_rgba(0,43,58,0.08)]" />
          <motion.div
            className="absolute inset-[13%] rounded-full border border-dashed border-[#1689bd]/35"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-[24%] rounded-full border border-[#cf5a20]/20"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute left-1/2 top-1/2 flex h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#002b3a] text-center text-white shadow-[0_18px_50px_rgba(0,43,58,0.28)]">
            <span className="text-3xl font-bold tracking-tight sm:text-4xl">b<span className="text-[#65c6db]">.</span></span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-[10px]">Build • Innovate • Improve</span>
          </div>

          {ecosystem.map(({ label, detail, icon: Icon, className }, index) => (
            <motion.div
              key={label}
              className={`absolute z-10 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 px-3 py-3 shadow-[0_12px_35px_rgba(0,43,58,0.12)] backdrop-blur-md sm:px-4 ${className}`}
              animate={reduceMotion ? undefined : { y: [0, index % 2 === 0 ? -9 : 9, 0] }}
              transition={{ duration: 4 + index * 0.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9f6fa] text-[#147da5]"><Icon size={18} /></span>
              <span className="text-left">
                <span className="block text-xs font-bold text-[#002b3a] sm:text-sm">{label}</span>
                <span className="mt-0.5 block text-[9px] text-[#647980] sm:text-[10px]">{detail}</span>
              </span>
            </motion.div>
          ))}

          <motion.div
            className="absolute left-[46%] top-[4%] h-3 w-3 rounded-full bg-[#f68f1e] shadow-[0_0_0_8px_rgba(246,143,30,0.12)]"
            animate={reduceMotion ? undefined : { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute bottom-[1%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-[#78909a]">Ideas into useful technology</div>
        </motion.div>
      </div>
    </section>
  )
}
