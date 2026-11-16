import { createBrowserRouter } from 'react-router-dom';
import Home from '@/modules/pages/Home';
import EnterpriseNavPage from '@/modules/pages/enterprise-nav';
import WebsiteNavPage from '@/modules/pages/website-nav';
import AppLayout from '@/shared/components/layout/AppLayout';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: '/website-nav',
    element: <WebsiteNavPage />,
  },
  {
    path: '/website-nav/*',
    element: <WebsiteNavPage />,
  },
  {
    path: '/enterprise-nav',
    element: <EnterpriseNavPage />,
  },
  {
    path: '/enterprise-nav/*',
    element: <EnterpriseNavPage />,
  },
]);
