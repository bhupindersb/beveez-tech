import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface Audience {
  title: string
  description: string
  icon?: { asset?: { url?: string } }
}

interface WhoWeWorkWithProps {
  data: {
    headline: string
    description?: string
    sideNote?: string
    footerText?: string
    audiences: Audience[]
  }
}

export default function WhoWeWorkWithAbout({ data }: WhoWeWorkWithProps) {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      className="py-[60px] md:py-[120px]"
    >
      <div className="mx-auto max-w-[1280px] px-6">

        {/* Header */}
        <motion.div variants={fadeUp} className="mb-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-3">
            <h2 className="text-[48px] md:text-[72px] font-bold font-heading text-darkBlue leading-none text-center md:text-left">
              {data.headline}
            </h2>

            {data.description && (
              <p className="mt-6 text-lg text-darkBlue">
                {data.description}
              </p>
            )}
          </div>

          {data.sideNote && (
            <p className="text-darkBlue">{data.sideNote}</p>
          )}
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer(0.12)}
          className="grid md:grid-cols-3 gap-10"
        >
          {data.audiences.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-[40px] bg-[#e5e9eb] p-10"
            >
              {item.icon?.asset?.url && (
                <Image
                  src={item.icon.asset.url}
                  alt={item.title}
                  width={200}
                  height={200}
                />
              )}

              <h3 className="mt-6 text-[30px] font-heading text-orange">
                {item.title}
              </h3>

              <p className="mt-3 text-darkBlue">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {data.footerText && (
          <motion.p variants={fadeUp} className="mt-16 text-center">
            {data.footerText}
          </motion.p>
        )}
      </div>
    </motion.section>
  )
}
