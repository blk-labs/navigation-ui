import { createBrowserRouter } from 'react-router-dom';
import Home from '@/modules/pages/Home';
import EcommerceNavPage from '@/modules/pages/ecommerce-nav';
import EnterpriseNavPage from '@/modules/pages/enterprise-nav';
import WebsiteNavPage from '@/modules/pages/website-nav';
import AppLayout from '@/shared/components/layout/AppLayout';
import Components from '@/modules/pages/components';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Home />
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
      {
        path: '/ecommerce-nav',
        element: <EcommerceNavPage />,
      },
      {
        path: '/ecommerce-nav/*',
        element: <EcommerceNavPage />,
      },
    ],
  },
]);
