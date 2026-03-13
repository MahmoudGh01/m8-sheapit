import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MovieProvider } from '../context/MovieContext';
import { Home } from './Home';

describe('Home - SMOKE TEST', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <MovieProvider>
          <Home />
        </MovieProvider>
      </BrowserRouter>
    );
  });

  it('should render multiple times', () => {
    const { rerender } = render(
      <BrowserRouter>
        <MovieProvider>
          <Home />
        </MovieProvider>
      </BrowserRouter>
    );

    rerender(
      <BrowserRouter>
        <MovieProvider>
          <Home />
        </MovieProvider>
      </BrowserRouter>
    );

    rerender(
      <BrowserRouter>
        <MovieProvider>
          <Home />
        </MovieProvider>
      </BrowserRouter>
    );
  });
});
