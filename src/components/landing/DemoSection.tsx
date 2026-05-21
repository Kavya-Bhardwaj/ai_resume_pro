'use client';

import { motion } from 'framer-motion';

export default function DemoSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            See It In Action
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Watch how AI Resume Pro transforms your resume in seconds
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl overflow-hidden border border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <p className="text-lg font-semibold">Video Demo Coming Soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
