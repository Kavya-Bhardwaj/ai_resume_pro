'use client';

import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function SignInPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-slate-950">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            baseTheme: theme === 'dark' ? dark : undefined,
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg',
              formFieldInput: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
              formFieldLabel: 'text-slate-700 dark:text-slate-300',
              footerActionLink: 'text-primary-600 hover:text-primary-700',
              dividerLine: 'bg-slate-200 dark:bg-slate-700',
              dividerText: 'text-slate-600 dark:text-slate-400',
              socialButtonsBlockButton: 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300',
              primaryButton: 'bg-primary-600 hover:bg-primary-700',
            },
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
