'use client'

import { useRef } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

interface Props {
  animationData: any
  size?: number
  className?: string
}

export default function AnimatedServiceIcon({
  animationData,
  size = 96,
  className = '',
}: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  return (
    <div
      onMouseEnter={() => lottieRef.current?.play()}
      style={{ width: size, height: size }}
      className={`cursor-pointer ${className}`}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay
        loop={false}
        style={{ width: size, height: size }}
      />
    </div>
  )
}
