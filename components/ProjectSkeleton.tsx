import React from 'react';

const ProjectSkeleton: React.FC = () => (
  <div className="border-4 border-black dark:border-neo-dark-border bg-white dark:bg-neo-dark-surface h-full flex flex-col animate-pulse shadow-neo">
    <div className="h-72 bg-gray-200 dark:bg-neo-dark-bg border-b-4 border-black dark:border-neo-dark-border w-full relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
    <div className="p-8 flex-1 flex flex-col space-y-4">
      <div className="flex justify-between items-start">
        <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-sm"></div>
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-sm"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
        <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
      </div>
      <div className="mt-auto flex gap-2 pt-4">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"></div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"></div>
        <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"></div>
      </div>
    </div>
  </div>
);

export default React.memo(ProjectSkeleton);