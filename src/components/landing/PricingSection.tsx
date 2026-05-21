'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      '1 resume analysis per month',
      'Basic ATS scoring',
      'Limited job recommendations',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Best for serious job seekers',
    features: [
      'Unlimited resume analyses',
      'Advanced ATS scoring',
      'Smart job recommendations',
      'AI improvement suggestions',
      'Resume templates',
      'Priority support',
      'Interview preparation',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations and teams',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom integrations',
      'Advanced analytics',
      'Dedicated support',
      'API access',
      'Custom branding',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSection() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <section id="pricing" className="relative py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Choose the plan that works best for you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'glass border-primary-500/50 md:scale-105 shadow-2xl shadow-primary-500/20'
                  : 'glass border-white/10 hover:border-white/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="mb-4 inline-block px-3 py-1 bg-primary-500/20 border border-primary-500/50 rounded-full text-xs font-semibold text-primary-500">
                  ⭐ Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-slate-600 dark:text-slate-400">{plan.period}</span>}
              </div>

              <button
                onClick={() => router.push(isSignedIn ? '/dashboard' : '/sign-up')}
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all duration-300 ${
                  plan.popular
                    ? 'gradient-button'
                    : 'border border-primary-500/30 hover:border-primary-500 hover:bg-primary-500/10'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-primary-500 text-lg">✓</span>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
