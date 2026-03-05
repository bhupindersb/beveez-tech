'use client'

import { motion } from 'framer-motion'
import slugify from 'slugify'

export default function FadeInHeading({
  as = 'h2',
  children,
}: {
  as?: 'h2' | 'h3'
  children: any
}) {
  const Tag = as

  const text = String(children)

  const id = slugify(text, {
    lower: true,
    strict: true,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Tag
        id={id}
        className="group scroll-mt-[140px] text-3xl font-heading font-bold text-darkBlue mt-16 mb-6"
      >
        <a
          href={`#${id}`}
          className="group-hover:text-darkOrange transition"
        >
          {children}
          <span className="ml-2 opacity-0 group-hover:opacity-100 text-darkOrange">
            #
          </span>
        </a>
      </Tag>
    </motion.div>
  )
}