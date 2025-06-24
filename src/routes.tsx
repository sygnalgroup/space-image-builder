import { createBrowserRouter, RouterProvider } from 'react-router';

// --- Layouts ---
import { LoginLayout } from '~/layouts/LoginLayout';
import { AppLayout } from '~/layouts/AppLayout';

// --- Pages ---
import { Root } from '~/pages/Root';
import { NotFound } from './pages/NotFound';

// Login
import { Login } from '~/pages/Login';

// App
import { Dashboard } from '~/pages/App/Dashboard';

// Documentation
import { Documentations } from '~/pages/App/Documentation/Documentations';
import { NewDocumentation } from '~/pages/App/Documentation/New';
import { EditDocumentation } from '~/pages/App/Documentation/Edit';

// Ticket
import { Ticket } from '~/pages/App/Ticket/Form';
import { TicketFiles } from './pages/App/Ticket/Files';

// https://reactrouter.com/start/data/routing
const router = createBrowserRouter([
  { index: true, Component: Root },
  {
    path: 'login',
    Component: LoginLayout,
    children: [{ index: true, Component: Login }],
  },
  {
    path: 'app',
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      {
        path: 'documentations',
        children: [
          { index: true, Component: Documentations },
          {
            path: 'new',
            children: [{ index: true, Component: NewDocumentation }],
          },
          {
            path: 'edit/:id',
            children: [{ index: true, Component: EditDocumentation }],
          },
        ],
      },
      {
        path: 'tickets',
        children: [
          {
            path: ':ticketId?',
            children: [{ index: true, Component: Ticket }],
          },
          {
            path: ':ticketId/files',
            children: [{ index: true, Component: TicketFiles }],
          },
        ],
      },
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
