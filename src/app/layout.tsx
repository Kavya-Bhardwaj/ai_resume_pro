'use client';

import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'AI Resume Pro - Analyze & Improve Your Resume with AI',
  description: 'Advanced AI-powered resume analyzer with smart job recommendations',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
