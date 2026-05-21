'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = isSignedIn
    ? [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/jobs', label: 'Jobs' },
        { href: '/ai-assistant', label: 'AI Assistant' },
      ]
    : [
        { href: '/#features', label: 'Features' },
        { href: '/#pricing', label: 'Pricing' },
        { href: '/#faq', label: 'FAQ' },
      ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:inline">Resume Pro</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? 'text-primary-500'
                    : 'text-slate-700 dark:text-slate-300 hover:text-primary-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!isLoaded ? (
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse"></div>
            ) : isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <button
                  onClick={() => router.push('/sign-in')}
                  className="hidden sm:block px-4 py-2 text-slate-700 dark:text-slate-300 font-medium hover:text-primary-500 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/sign-up')}
                  className="gradient-button px-6 py-2 rounded-lg text-sm"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-slate-900 dark:bg-white"></div>
            <div className="w-6 h-0.5 bg-slate-900 dark:bg-white"></div>
            <div className="w-6 h-0.5 bg-slate-900 dark:bg-white"></div>
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-white/10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-primary-500"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
