import React from 'react';
import { Button } from '~/core/ui/shadcn/components/ui/button';

export const Root = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-white">
      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm dark:shadow-zinc-800">
        <h1 className="text-2xl font-extrabold tracking-wide text-blue-600 dark:text-blue-400">
          iHave
        </h1>
      </header>

      <Button variant="outline">Testing</Button>
    </div>
  );
};
