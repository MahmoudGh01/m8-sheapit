import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './layouts/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
