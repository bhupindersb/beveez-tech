'use client'

import { motion } from 'framer-motion'

interface PricingPayButtonProps {
  provider: 'stripe' | 'razorpay' | 'paddle'
  paymentLink: string
  ctaText?: string
  onClick?: () => void
}

export default function PricingPayButton({
  provider,
  paymentLink,
  ctaText = 'Get Started',
  onClick,
}: PricingPayButtonProps) {
  const handleClick = () => {
    // Optional analytics hook
    if (onClick) onClick()

    // Default behavior: redirect to hosted checkout
    window.open(paymentLink, '_blank', 'noopener,noreferrer')
  }

  const providerLabel = {
    stripe: 'Secure checkout',
    razorpay: 'Pay securely via Razorpay',
    paddle: 'Secure payment',
  }[provider]

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full rounded-full
                 bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                 px-8 py-4 text-white font-semibold text-center
                 shadow-md transition-all
                 hover:from-[#f68f1e] hover:to-[#cf5a20]
                 focus:outline-none focus:ring-2 focus:ring-orange/60"
      aria-label={`${ctaText} – ${provider}`}
    >
      <span className="block">{ctaText}</span>
      <span className="mt-1 block text-xs text-white/80">
        {providerLabel}
      </span>
    </motion.button>
  )
}
