'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return <LandingPage />;
}
