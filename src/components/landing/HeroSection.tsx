'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 inline-block">
          <div className="glass px-4 py-2 rounded-full border border-primary-500/30">
            <p className="text-sm font-semibold gradient-text">🚀 Powered by Advanced AI</p>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Analyze, Improve & Land Your Dream Job</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto"
        >
          Get instant AI-powered resume analysis, personalized improvement suggestions, and discover jobs perfectly matched to your skills. Join thousands of successful candidates.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => router.push('/dashboard/upload')}
            className="gradient-button px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-primary-500/30"
          >
            Start Free Analysis
          </button>
          <button
            onClick={() => router.push('/#features')}
            className="px-8 py-4 rounded-lg font-semibold text-lg border border-primary-500/30 hover:border-primary-500 glass transition-all duration-300"
          >
            Learn More
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="text-sm text-slate-600 dark:text-slate-400">
          <p className="mb-4">✅ No credit card required • 🔒 100% Secure • ⚡ Results in seconds</p>
          <p>Trusted by 10,000+ job seekers worldwide</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
