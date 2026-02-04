'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function AnimatedDivider() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <hr className="my-[120px] border-darkBlue/20" />
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="origin-left my-[120px] h-[1px] w-full bg-darkBlue/20"
    />
  )
}
