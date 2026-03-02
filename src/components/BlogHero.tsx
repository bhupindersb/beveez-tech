'use client'

import { motion } from 'framer-motion'

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden">

      {/* Orange Gradient Glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute inset-x-0 bottom-0 h-[40%]
                   bg-gradient-to-t from-[#f28f23]/50 to-transparent"
      />

      {/* Blue Glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: [0.45, 0.6, 0.45], scale: [1, 1.05, 1] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="absolute left-0 right-0 mx-auto top-[10%]
                   h-[700px] w-[700px]
                   rounded-full bg-[#7becff]/70 blur-[250px]"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-30 mx-auto max-w-[1280px]
                   px-6 pt-[180px] pb-[140px] text-center"
      >
        <h1 className="font-heading font-bold text-darkBlue leading-tight
                       text-[30px] sm:text-[40px]
                       md:text-[64px] lg:text-[72px]">
          Insights & Articles
        </h1>

        <p className="mt-8 text-lg text-darkBlue md:max-w-[640px] mx-auto">
          Performance optimization, SEO strategies, and modern web development insights for startups and SaaS companies.
        </p>
      </motion.div>
    </section>
  )
}