'use client';

import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import Navbar from '@/components/shared/Navbar';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { theme } = useTheme();
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-950 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 gradient-text">Profile Settings</h1>
          <div className="glass rounded-2xl p-8 border border-white/10">
            <UserProfile
              appearance={{
                baseTheme: theme === 'dark' ? dark : undefined,
                elements: {
                  rootBox: 'mx-auto',
                  card: 'bg-transparent',
                  formFieldInput: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
                  formFieldLabel: 'text-slate-700 dark:text-slate-300',
                  primaryButton: 'bg-primary-600 hover:bg-primary-700',
                  dividerLine: 'bg-slate-200 dark:bg-slate-700',
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
