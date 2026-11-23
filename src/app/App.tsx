import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import Layout from './Layout';

export default function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}
