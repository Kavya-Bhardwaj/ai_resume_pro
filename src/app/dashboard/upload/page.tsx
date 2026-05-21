'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export default function ResumeUploadPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        toast.success('File selected successfully!');
      }
    },
  });

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Resume uploaded successfully!');
        router.push(`/dashboard/resumes/${data.resumeId}`);
      } else {
        toast.error('Failed to upload resume');
      }
    } catch (error) {
      toast.error('Error uploading resume');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

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
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2 gradient-text">Upload Your Resume</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Upload your resume in PDF or DOCX format and get instant AI analysis
            </p>

            {/* Dropzone */}
            <motion.div
              {...getRootProps()}
              className={`glass rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? 'border-primary-500 bg-primary-500/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <input {...getInputProps()} />
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-xl font-bold mb-2">
                {isDragActive ? 'Drop your resume here' : 'Drag and drop your resume'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                or click to select a file
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Supported formats: PDF, DOCX (Max 10MB)
              </p>
            </motion.div>

            {/* Selected File Info */}
            {uploadedFile && (
              <motion.div
                className="glass rounded-xl p-6 mt-8 border border-green-500/30 bg-green-500/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">✓</div>
                    <div>
                      <p className="font-semibold">{uploadedFile.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}

            {/* Analyze Button */}
            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={handleAnalyze}
                disabled={!uploadedFile || isUploading}
                className="gradient-button px-8 py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
              <button
                onClick={() => router.push('/dashboard/resumes')}
                className="px-8 py-4 rounded-lg font-semibold border border-primary-500/30 hover:border-primary-500 glass transition-all duration-300"
              >
                View My Resumes
              </button>
            </motion.div>

            {/* Info Section */}
            <motion.div
              className="mt-12 grid md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                { icon: '⚡', title: 'Instant Analysis', desc: 'Get your ATS score in seconds' },
                { icon: '🎯', title: 'Smart Suggestions', desc: 'AI-powered improvement tips' },
                { icon: '💼', title: 'Job Matches', desc: 'Find perfect job opportunities' },
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-6 border border-white/10">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
