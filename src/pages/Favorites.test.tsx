import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MovieProvider } from '../context/MovieContext';
import { Favorites } from './Favorites';

describe('Favorites - SMOKE TEST', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <MovieProvider>
          <Favorites />
        </MovieProvider>
      </BrowserRouter>
    );
  });

  it('should render multiple times', () => {
    const { rerender } = render(
      <BrowserRouter>
        <MovieProvider>
          <Favorites />
        </MovieProvider>
      </BrowserRouter>
    );

    rerender(
      <BrowserRouter>
        <MovieProvider>
          <Favorites />
        </MovieProvider>
      </BrowserRouter>
    );

    rerender(
      <BrowserRouter>
        <MovieProvider>
          <Favorites />
        </MovieProvider>
      </BrowserRouter>
    );
  });
});
