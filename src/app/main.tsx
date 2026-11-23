import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/globals.css';
import '@/shared/utils/env';
import App from './App';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
      <Toaster
        gutter={12}
        containerStyle={{ margin: '2px' }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#4caf50',
              color: 'white',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#ef4444',
              color: 'white',
            },
          },
          style: {
            fontSize: '12px',
            maxWidth: '500px',
            padding: '16px 24px',
          },
        }}
      />
    </StrictMode>,
  );
}
