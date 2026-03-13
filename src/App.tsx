import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MovieProvider } from './context/MovieContext';
import { Layout } from './layouts/Layout';
import { Favorites } from './pages/Favorites';
import { Home } from './pages/Home';

function App(): React.JSX.Element {
  return (
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
  );
}

export default App;
