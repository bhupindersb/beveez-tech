'use client'

import { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

interface RemoteLottieProps {
  src: string
  size?: number
  autoplay?: boolean
  loop?: boolean
}

export default function RemoteLottie({
  src,
  size = 96,
  autoplay = true,
  loop = false,
}: RemoteLottieProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    let isMounted = true

    fetch(src)
      .then(res => res.json())
      .then(json => {
        if (isMounted) setAnimationData(json)
      })
      .catch(console.error)

    return () => {
      isMounted = false
    }
  }, [src])

  if (!animationData) return null

  return (
    <div
      style={{ width: size, height: size }}
      className="cursor-pointer"
      onMouseEnter={() => lottieRef.current?.play()}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={autoplay}
        loop={loop}
        style={{ width: size, height: size }}
      />
    </div>
  )
}
