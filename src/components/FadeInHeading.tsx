'use client'

import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  as?: 'h2' | 'h3'
}

export default function FadeInHeading({ children, as = 'h2' }: Props) {
  const Tag = as

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Tag
        className={
          as === 'h2'
            ? 'text-3xl md:text-4xl font-heading font-semibold mt-16 mb-6 text-darkBlue'
            : 'text-2xl font-heading font-semibold mt-12 mb-4 text-darkBlue'
        }
      >
        {children}
      </Tag>
    </motion.div>
  )
}