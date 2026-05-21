'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();

  const dashboardCards = [
    {
      icon: '📄',
      title: 'Upload Resume',
      description: 'Upload and analyze your resume',
      href: '/dashboard/upload',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '📊',
      title: 'My Resumes',
      description: 'View all your resume analyses',
      href: '/dashboard/resumes',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '💼',
      title: 'Job Recommendations',
      description: 'Find jobs matched to your skills',
      href: '/dashboard/jobs',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Chat with AI for resume help',
      href: '/dashboard/ai-assistant',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Dashboard Header */}
        <section className="border-b border-white/10 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome to <span className="gradient-text">AI Resume Pro!</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Let's make your resume stand out and land your dream job
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Actions Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={card.href}>
                    <div className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group h-full">
                      <div className={`text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{card.description}</p>
                      <div className="mt-4 flex items-center text-primary-500 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-sm font-semibold">Get Started →</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Resumes Analyzed', value: '10K+' },
              { label: 'Jobs Found', value: '5K+' },
              { label: 'Success Rate', value: '92%' },
              { label: 'Users Active', value: '2K+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
