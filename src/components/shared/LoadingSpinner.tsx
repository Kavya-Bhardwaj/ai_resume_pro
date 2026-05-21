'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-900"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-primary-500 animate-spin"></div>
      </div>
      <span className="ml-4 text-lg font-semibold text-primary-600 dark:text-primary-400">
        Loading...
      </span>
    </div>
  );
}
