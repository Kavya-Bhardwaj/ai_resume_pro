'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function CTASection() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Ready to Transform Your Resume?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Join thousands of successful job seekers using AI Resume Pro. Start your free analysis today.
          </p>
          <button
            onClick={() => router.push(isSignedIn ? '/dashboard' : '/sign-up')}
            className="gradient-button px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-primary-500/30 inline-block"
          >
            {isSignedIn ? 'Go to Dashboard' : 'Get Started Free'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
