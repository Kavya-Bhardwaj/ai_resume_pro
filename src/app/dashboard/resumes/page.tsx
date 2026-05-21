'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Resume {
  id: string;
  fileName: string;
  atsScore: number;
  createdAt: string;
}

export default function ResumesPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch('/api/resume/list');
        if (response.ok) {
          const data = await response.json();
          setResumes(data.resumes);
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setIsLoadingResumes(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchResumes();
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 gradient-text">My Resumes</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage and analyze all your resumes
              </p>
            </div>
            <Link
              href="/dashboard/upload"
              className="gradient-button px-6 py-3 rounded-lg font-semibold"
            >
              + Upload New
            </Link>
          </div>

          {isLoadingResumes ? (
            <LoadingSpinner />
          ) : resumes.length === 0 ? (
            <motion.div
              className="glass rounded-2xl p-12 text-center border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold mb-2">No resumes yet</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Upload your first resume to get started with AI analysis
              </p>
              <Link
                href="/dashboard/upload"
                className="gradient-button px-8 py-3 rounded-lg font-semibold inline-block"
              >
                Upload Resume
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">📄</div>
                      <div>
                        <h3 className="font-bold text-lg">{resume.fileName}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Uploaded {new Date(resume.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold gradient-text">{resume.atsScore}</div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">ATS Score</p>
                      </div>
                      <Link
                        href={`/dashboard/resumes/${resume.id}`}
                        className="px-6 py-2 rounded-lg font-semibold border border-primary-500/30 hover:border-primary-500 glass transition-all duration-300"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
