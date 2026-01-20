// src/lib/motion.ts
import { Variants } from 'framer-motion'

/* ----------------------------------
   Base easing (easeOut feel)
---------------------------------- */
export const easeOut = [0.16, 1, 0.3, 1]

/* ----------------------------------
   Containers
---------------------------------- */
export const staggerContainer = (stagger = 0.15): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
})

/* ----------------------------------
   Items
---------------------------------- */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
}
