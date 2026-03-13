import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MovieProvider } from './context/MovieContext';
import { Layout } from './layouts/Layout';
import { Favorites } from './pages/Favorites';
import { Home } from './pages/Home';

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
