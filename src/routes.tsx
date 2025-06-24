import { createBrowserRouter, RouterProvider } from 'react-router';

import { AppLayout } from '~/layouts/AppLayout';

// --- Pages ---
import { Root } from '~/pages/Root';
import { NotFound } from './pages/NotFound';

// https://reactrouter.com/start/data/routing
const router = createBrowserRouter([
  { index: true, Component: Root },
  {
    path: 'app',
    Component: AppLayout,
    children: [
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
