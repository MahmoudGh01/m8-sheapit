import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MovieProvider } from './features/movies';
import { Home, Favorites } from './pages';
import { Layout } from './shared';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>
        <BrowserRouter basename="/m8-sheapit">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </QueryClientProvider>
  );
}

export default App;
