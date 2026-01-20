import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface OurApproachStep {
  number?: number
  title: string
  description?: string
}

interface OurApproachData {
  heading: string
  subText?: string
  steps?: OurApproachStep[]
  visual?: {
    backgroundImage?: { asset?: { url?: string } }
    mainImage?: { asset?: { url?: string } }
    subText?: string
  }
}

interface OurApproachProps {
  data: OurApproachData
}

export default function OurApproach({ data }: OurApproachProps) {
  if (!data.steps?.length) return null

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      className="py-[60px] md:py-[120px] bg-darkBlue"
    >
      <div className="mx-auto max-w-[1280px] px-6">

        <motion.h2 variants={fadeUp} className="text-[48px] md:text-[72px] font-heading font-bold text-white text-center">
          {data.heading}
        </motion.h2>

        {data.subText && (
          <motion.p variants={fadeUp} className="mt-4 max-w-[640px] text-white/90 mx-auto text-center">
            {data.subText}
          </motion.p>
        )}

        <div className="mt-16 grid md:grid-cols-2 gap-12">

          {/* Steps */}
          <motion.div variants={staggerContainer(0.1)} className="space-y-8">
            {data.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="max-w-[550px] rounded-3xl
                           bg-orange px-8 py-10 text-white flex items-start"
              >
                {step.number !== undefined && (
                  <div className="text-4xl font-bold opacity-60">
                    {step.number}
                  </div>
                )}
                <div class="card-content">
                    <h3 className="mt-2 text-xl font-semibold">
                    {step.title}
                    </h3>

                    {step.description && (
                    <p className="mt-2 text-white/90">
                        {step.description}
                    </p>
                    )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Visual */}
          {data.visual && (
            <motion.div variants={fadeUp} className="relative">
              {data.visual.backgroundImage?.asset?.url && (
                <img
                  src={data.visual.backgroundImage.asset.url}
                  className="absolute inset-0 h-full w-full object-cover rounded-3xl"
                />
              )}

              {data.visual.mainImage?.asset?.url && (
                <img
                  src={data.visual.mainImage.asset.url}
                  className="relative z-10 mx-auto"
                />
              )}

              {data.visual.subText && (
                <p className="mt-6 text-darkBlue/70">
                  {data.visual.subText}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
