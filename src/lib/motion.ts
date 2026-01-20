import { Variants, cubicBezier } from 'framer-motion'

/* =====================================
   EASING (Framer Motion compatible)
===================================== */

const smoothEase = cubicBezier(0.16, 1, 0.3, 1)

/* =====================================
   FADE UP
===================================== */

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
      ease: smoothEase,
    },
  },
}

/* =====================================
   STAGGER CONTAINER
===================================== */

export const staggerContainer = (delay = 0.12): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.05,
    },
  },
})
