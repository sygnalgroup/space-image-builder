import React from 'react';
import SharedHeader from '~/components/SharedHeader';

export const Dashboard = () => {
  return (
    <section id="tickets" className="flex h-screen flex-col">
      <SharedHeader title="Dashboard" />

      <div className="scrollbar-hidden h-full items-end overflow-y-auto px-4 py-4">
        <div>
          <h2 class="mb-4 text-2xl leading-tight font-bold text-white">
            Ticket Summary
          </h2>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div class="overflow-hidden rounded-lg bg-zinc-800 shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-zinc-400">
                        Total Open Tickets
                      </dt>
                      <dd class="text-3xl font-bold text-white">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-hidden rounded-lg bg-zinc-800 shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-zinc-400">
                        High Priority
                      </dt>
                      <dd class="text-3xl font-bold text-white">3</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-hidden rounded-lg bg-zinc-800 shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-zinc-400">
                        Awaiting Your Reply
                      </dt>
                      <dd class="text-3xl font-bold text-white">5</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-hidden rounded-lg bg-zinc-800 shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-zinc-400">
                        Recently Updated
                      </dt>
                      <dd class="mt-1 text-sm text-zinc-300">
                        #75821: API Error (2m ago)
                      </dd>
                      <dd class="mt-1 text-sm text-zinc-300">
                        #75819: Login issue (1h ago)
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <h2 class="mb-4 text-2xl leading-tight font-bold text-white">
              Documentation Hub
            </h2>
            <div class="rounded-lg bg-zinc-800 shadow">
              <div class="border-b border-zinc-700">
                <nav class="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                  <a
                    href="#"
                    class="border-b-2 border-green-400 px-1 py-4 text-sm font-medium whitespace-nowrap text-white"
                  >
                    Videos
                  </a>
                  <a
                    href="#"
                    class="border-b-2 border-transparent px-1 py-4 text-sm font-medium whitespace-nowrap text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                  >
                    Scripts
                  </a>
                </nav>
              </div>
              <div class="space-y-4 p-6">
                <div class="flex items-center rounded-md p-3 transition-colors hover:bg-zinc-700/50">
                  <img
                    src="https://i.ytimg.com/vi_webp/mLqgb4T8-34/sddefault.webp"
                    alt="Video thumbnail"
                    class="h-20 w-32 rounded-md object-cover"
                  />
                  <div class="ml-4">
                    <h3 class="font-semibold text-white">
                      Getting Started with the API
                    </h3>
                    <p class="mt-1 text-sm text-zinc-400">
                      Learn how to make your first API call and authenticate
                      correctly.
                    </p>
                  </div>
                  <button class="ml-auto flex-shrink-0 rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center rounded-md p-3 transition-colors hover:bg-zinc-700/50">
                  <img
                    src="https://i.ytimg.com/vi_webp/URVHRhBSjj8/sddefault.webp"
                    alt="Video thumbnail"
                    class="h-20 w-32 rounded-md object-cover"
                  />
                  <div class="ml-4">
                    <h3 class="font-semibold text-white">
                      Configuring Your Dashboard
                    </h3>
                    <p class="mt-1 text-sm text-zinc-400">
                      A step-by-step guide to setting up and personalizing your
                      widgets.
                    </p>
                  </div>
                  <button class="ml-auto flex-shrink-0 rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
                <a
                  href="#"
                  class="block pt-2 text-center text-sm font-medium text-green-400 hover:text-green-300"
                >
                  View all documentation &rarr;
                </a>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <h2 class="mb-4 text-2xl leading-tight font-bold text-white">
              Ask AI
            </h2>
            <div class="flex h-[34rem] flex-col rounded-lg bg-zinc-800 shadow">
              <div class="flex-1 space-y-6 overflow-y-auto p-6">
                <div class="flex items-start gap-3">
                  <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.573L16.5 21.75l-.398-1.177a3.375 3.375 0 00-2.455-2.455L12.75 18l1.177-.398a3.375 3.375 0 002.455-2.455L17.25 14.25l.398 1.177a3.375 3.375 0 002.455 2.455l1.177.398-1.177.398a3.375 3.375 0 00-2.455 2.455z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="rounded-lg bg-zinc-700 p-3">
                      <p class="text-sm text-zinc-200">
                        Hello! I'm your AI assistant. How can I help you today?
                        You can ask me to summarize tickets, find documentation,
                        or troubleshoot issues.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex items-start justify-end gap-3">
                  <div class="flex-1">
                    <div class="rounded-lg bg-green-600 p-3 text-white">
                      <p class="text-sm">
                        Can you find the documentation for API authentication?
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://i.pravatar.cc/150?u=mayander"
                    alt="User Avatar"
                    class="h-8 w-8 rounded-full"
                  />
                </div>
                <div class="flex items-start gap-3">
                  <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.573L16.5 21.75l-.398-1.177a3.375 3.375 0 00-2.455-2.455L12.75 18l1.177-.398a3.375 3.375 0 002.455-2.455L17.25 14.25l.398 1.177a3.375 3.375 0 002.455 2.455l1.177.398-1.177.398a3.375 3.375 0 00-2.455 2.455z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="rounded-lg bg-zinc-700 p-3">
                      <p class="text-sm text-zinc-200">
                        Certainly. The "Getting Started with the API" video
                        covers authentication. I can play it for you or you can
                        click on it in the documentation hub.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rounded-b-lg border-t border-zinc-700 bg-zinc-800 p-4">
                <div class="relative">
                  <input
                    type="text"
                    class="input w-full"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      class="h-5 w-5 text-zinc-400 hover:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
