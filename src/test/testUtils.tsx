import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { MovieProvider } from '../context/MovieContext';

/**
 * Creates a QueryClient configured for testing
 * - Disables retries to make tests faster and more predictable
 * - Disables garbage collection time to prevent memory issues in tests
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

type WrapperProps = {
  children: ReactNode;
};

/**
 * Creates all providers needed for testing components that use:
 * - React Query (QueryClientProvider)
 * - Movie Context (MovieProvider)
 * - React Router (BrowserRouter)
 */
function AllProviders({ children }: WrapperProps): ReactElement {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MovieProvider>{children}</MovieProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

/**
 * Custom render function that wraps components with all necessary providers
 * Use this instead of @testing-library/react's render for components
 * that need MovieContext or QueryClient
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> {
  return render(ui, { wrapper: AllProviders, ...options });
}

/**
 * Creates a wrapper with just QueryClientProvider
 * Use this for testing hooks or components that only need React Query
 */
export function QueryClientWrapper({ children }: WrapperProps): ReactElement {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

/**
 * Creates a wrapper with QueryClientProvider and MovieProvider
 * Use this for testing components that need both QueryClient and MovieContext
 * but don't need routing
 */
export function MovieProviderWrapper({ children }: WrapperProps): ReactElement {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>{children}</MovieProvider>
    </QueryClientProvider>
  );
}
