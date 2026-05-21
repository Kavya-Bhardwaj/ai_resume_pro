'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager at Google',
    content: 'AI Resume Pro helped me identify critical gaps in my resume. Got 3 interviews in the first week!',
    avatar: '👩‍💼',
  },
  {
    name: 'Michael Chen',
    role: 'Senior Developer at Meta',
    content: 'The ATS optimization suggestions were incredibly accurate. Highly recommend!',
    avatar: '👨‍💻',
  },
  {
    name: 'Emma Rodriguez',
    role: 'UX Designer at Apple',
    content: 'The job recommendations are spot-on. Found my dream job through this platform!',
    avatar: '👩‍🎨',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Loved by Job Seekers
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            See what our users have to say
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
