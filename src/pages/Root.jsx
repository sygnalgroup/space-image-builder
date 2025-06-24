import React from 'react';
import { Link } from 'react-router';
import Builder from '~/components/Builder';

export const Root = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-white">
      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm dark:shadow-zinc-800">
        <h1 className="text-2xl font-extrabold tracking-wide text-blue-600 dark:text-blue-400">
          iHave
        </h1>
      </header>

      {/* Hero Section */}
      <main className="flex justify-center items-start min-h-[70vh] bg-gray-50 py-8">
        <Builder />
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500 dark:text-zinc-400">
        © {new Date().getFullYear()} SygnalGroup. All rights reserved.
      </footer>
    </div>
  );
};
