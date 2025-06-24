import React from 'react';
import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-gray-800 transition-colors duration-300 dark:bg-zinc-900 dark:text-white">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-bold">Page not found</h2>
        <p className="mt-2 text-gray-600 dark:text-zinc-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow transition hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};
