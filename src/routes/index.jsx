import { createBrowserRouter, RouterProvider } from 'react-router';

import { AppLayout } from '~/layouts/AppLayout';

// --- Pages ---
import { NotFound } from '../pages/NotFound';
import { LoginLayout } from '../layouts/LoginLayout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/App/Dashboard';
import tournamentsRoutes from './tournaments.routes';
import playersRoutes from './players.routes';
import clubsRoutes from './clubs.routes';
import paymentsRoutes from './payments.routes';
import activitiesRoutes from './activities.routes';
import settingsRoutes from './settings.routes';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      ...tournamentsRoutes,
      ...playersRoutes,
      ...clubsRoutes,
      ...paymentsRoutes,
      ...activitiesRoutes,
      ...settingsRoutes,
    ],
  },
  {
    path: 'login',
    Component: LoginLayout,
    children: [{ index: true, Component: Login }],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
