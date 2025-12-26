
import React from 'react';

const ProjectSkeleton: React.FC = () => (
  <div className="border-4 border-black dark:border-neo-dark-border bg-white dark:bg-neo-dark-surface h-full flex flex-col shadow-neo overflow-hidden relative">
    {/* Shimmer Effect Overlay */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent z-10" />

    <div className="p-8 flex-1 flex flex-col space-y-6">
      <div className="flex justify-between items-start">
        <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
        <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
        <div className="h-4 w-4/6 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
      </div>
      <div className="mt-auto flex gap-2 pt-6">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 border border-transparent"></div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 border border-transparent"></div>
        <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 border border-transparent"></div>
      </div>
    </div>
  </div>
);

export default React.memo(ProjectSkeleton);
