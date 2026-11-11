import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '@/modules/pages/Home';
import AppLayout from '@/shared/components/layout/AppLayout';
import Components from '@/modules/pages/components';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/components',
        element: <Components />,
      },
    ],
  },
]);
