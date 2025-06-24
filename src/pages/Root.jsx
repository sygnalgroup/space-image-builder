import React from 'react';
import { Link } from 'react-router';

export const Root = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-white">
      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm dark:shadow-zinc-800">
        <h1 className="text-2xl font-extrabold tracking-wide text-blue-600 dark:text-blue-400">
          Stream <span className="text-gray-900 dark:text-white">Tickets</span>
        </h1>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">
          Simplify Your Issue Ticketing Workflow
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-zinc-300">
          Manage, track, and resolve customer support tickets efficiently with
          Stream Tickets — your streamlined issue tracking platform.
        </p>
        <div className="mt-6">
          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Stream Tickets. All rights reserved.
      </footer>
    </div>
  );
};
