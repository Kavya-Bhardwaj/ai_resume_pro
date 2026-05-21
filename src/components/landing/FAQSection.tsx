'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: 'How accurate is the ATS scoring?',
    answer: 'Our AI analyzes resumes using the same algorithms as actual ATS systems used by Fortune 500 companies. Accuracy is typically 95%+.',
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support PDF and DOCX formats. Simply upload your resume and our AI will instantly parse and analyze it.',
  },
  {
    question: 'Is my resume data secure?',
    answer: 'Yes! We use enterprise-grade encryption and never share your data with third parties. Your privacy is our top priority.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your full payment with no questions asked.',
  },
  {
    question: 'How many resumes can I analyze?',
    answer: 'Free plan: 1 per month. Pro plan: Unlimited analyses. You can also save and manage all your resumes in the dashboard.',
  },
  {
    question: 'Do you offer API access?',
    answer: 'Yes! Enterprise customers get full API access for integration with HR systems and custom workflows.',
  },
];

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 dark:hover:bg-white/5 transition-colors duration-300"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <span className="font-semibold text-left">{faq.question}</span>
                <span
                  className={`text-primary-500 transition-transform duration-300 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              {expandedIndex === index && (
                <motion.div
                  className="px-6 pb-6 text-slate-600 dark:text-slate-400 border-t border-white/5"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
