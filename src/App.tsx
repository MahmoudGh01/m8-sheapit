import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MovieProvider } from './context/MovieContext';
import { Layout } from './layouts/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';

function App(): React.JSX.Element {
  return (
    <MovieProvider>
      <BrowserRouter>
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
