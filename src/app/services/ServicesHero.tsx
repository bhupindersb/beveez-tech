'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedServiceIcon from '@/components/AnimatedServiceIcon'

// Lottie JSON imports
import webDesign from '@/assets/lottie/web-design.json'
import webCode from '@/assets/lottie/web-code.json'
import cms from '@/assets/lottie/cms-system.json'
import seo from '@/assets/lottie/seo.json'

const services = [
  {
    title: 'Website Design & Development',
    subtitle: 'Conversion-focused modern websites',
    icon: webDesign,
  },
  {
    title: 'WordPress Optimization',
    subtitle: 'Speed, security, performance',
    icon: webCode,
  },
  {
    title: 'Headless CMS Development',
    subtitle: 'Scalable content architectures',
    icon: cms,
  },
  {
    title: 'SEO-Friendly Website Builds',
    subtitle: 'Visibility built into structure',
    icon: seo,
  },
]

export default function ServicesHero({
  backgroundImage,
}: {
  backgroundImage?: string
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Orange Glow */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#f28f23]/50 to-transparent" />

      {/* Blue Glow */}
      <div className="absolute left-1/2 top-[45%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7becff]/60 blur-[260px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-[180px] pb-[140px] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-[34px] md:text-[64px] font-bold text-darkBlue"
        >
          Performance-Driven Web Solutions Built For Growth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-6 text-lg text-darkBlue max-w-2xl mx-auto"
        >
          From optimized WordPress builds to headless CMS architectures,
          we create fast, scalable, and SEO-ready websites that help
          businesses grow with confidence.
        </motion.p>

        {/* Service Icons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center text-center"
            >
              <AnimatedServiceIcon animationData={service.icon} size={72} />

              <h3 className="mt-5 text-sm font-semibold text-darkBlue">
                {service.title}
              </h3>

              <p className="mt-1 text-xs text-gray-600">
                {service.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
