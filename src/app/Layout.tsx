import type { PropsWithChildren } from 'react';
import QueryProvider from './providers/QueryProvider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorState from '@/shared/components/feedback/ErrorState';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      onReset={() => {
        window.location.replace('/');
      }}
      FallbackComponent={ErrorState}
    >
      <QueryProvider>{children}</QueryProvider>
    </ErrorBoundary>
  );
}
