'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const features = [
  {
    icon: '📄',
    title: 'AI Resume Upload & Parsing',
    description: 'Upload your resume in PDF or DOCX format. Our AI instantly extracts all key information including skills, experience, education, and projects.',
  },
  {
    icon: '🎯',
    title: 'ATS Compatibility Score',
    description: 'Get scored out of 100 on ATS compatibility. Detect missing keywords, weak summaries, grammar mistakes, and formatting issues.',
  },
  {
    icon: '💼',
    title: 'Smart Job Recommendations',
    description: 'Discover jobs perfectly matched to your resume. View skill match percentages, salary ranges, and remote opportunities.',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    description: 'Chat with our AI to improve bullet points, generate professional summaries, and create ATS-friendly content.',
  },
  {
    icon: '📊',
    title: 'Resume Score Dashboard',
    description: 'Visual analytics showing ATS score, skills match, resume strength, and personalized improvement recommendations.',
  },
  {
    icon: '⚡',
    title: 'One-Click Enhancement',
    description: 'Auto-improve your resume with AI. Download as PDF and compare original vs improved versions side-by-side.',
  },
];

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section id="features" className="relative py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to create a standout resume and land your dream job
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass p-8 rounded-xl cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
