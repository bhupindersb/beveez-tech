'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function PricingComparison() {
  return (
    <section className="py-[80px] md:py-[120px] bg-[#f7f9fc]">
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[40px] md:text-[56px] font-heading font-bold text-darkBlue"
          >
            How We Compare
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-darkBlue/70 max-w-2xl mx-auto"
          >
            Transparent pricing with agency-level quality — without agency bloat.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Freelancers',
              points: [
                'Inconsistent quality',
                'Limited scalability',
                'Minimal process & documentation',
                'Often disappear mid-project',
              ],
            },
            {
              title: 'Beveez Tech',
              highlight: true,
              points: [
                'Senior-level execution',
                'Clear timelines & milestones',
                'SEO + performance built-in',
                'Dedicated support & handover',
              ],
            },
            {
              title: 'Agencies',
              points: [
                'High retainers',
                'Overloaded teams',
                'Long turnaround times',
                'Pay for layers you don’t need',
              ],
            },
          ].map((col, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 text-left shadow-md
                ${col.highlight ? 'bg-darkBlue text-white scale-[1.03]' : 'bg-white'}
              `}
            >
              <h3 className="text-2xl font-semibold mb-6">
                {col.title}
              </h3>

              <ul className="space-y-4">
                {col.points.map((p, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-orange" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
