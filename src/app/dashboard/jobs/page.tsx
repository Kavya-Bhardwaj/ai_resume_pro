'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: { min: number; max: number; currency: string };
  skillMatchPercentage: number;
  remote: boolean;
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [filters, setFilters] = useState({
    remote: false,
    minSalary: 0,
    location: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.remote) params.append('remote', 'true');
        if (filters.minSalary) params.append('minSalary', filters.minSalary.toString());
        if (filters.location) params.append('location', filters.location);

        const response = await fetch(`/api/jobs/recommend?${params}`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoadingJobs(false);
      }
    };

    fetchJobs();
  }, [filters]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Recommended Jobs</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Jobs matched to your resume and skills
          </p>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters */}
            <motion.div
              className="glass rounded-xl p-6 border border-white/10 h-fit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City or Remote"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.remote}
                      onChange={(e) => setFilters({ ...filters, remote: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Remote Only</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Min Salary</label>
                  <input
                    type="number"
                    value={filters.minSalary}
                    onChange={(e) => setFilters({ ...filters, minSalary: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Jobs List */}
            <div className="lg:col-span-3">
              {isLoadingJobs ? (
                <div className="text-center py-12">Loading jobs...</div>
              ) : jobs.length === 0 ? (
                <motion.div
                  className="glass rounded-2xl p-12 text-center border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">💼</div>
                  <h3 className="text-2xl font-bold mb-2">No jobs found</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Upload a resume to get personalized job recommendations
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{job.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400">{job.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold gradient-text">{job.skillMatchPercentage}%</div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Skill Match</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary-500/20 text-primary-500 rounded-full text-xs font-medium">
                          {job.location}
                        </span>
                        {job.remote && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                            Remote
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}
                        </p>
                        <button className="px-6 py-2 gradient-button rounded-lg text-sm font-semibold">
                          View Job
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
