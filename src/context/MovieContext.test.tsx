import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { MovieProvider, useMovies } from './MovieContext';

function TestComponent(): React.JSX.Element {
  const { movies, toggleFavorite } = useMovies();
  return (
    <div>
      <div data-testid="movie-count">{movies.length}</div>
      <button onClick={() => toggleFavorite(1)}>Toggle</button>
    </div>
  );
}

describe('MovieContext - SMOKE TEST', () => {
  it('should render provider without crashing', () => {
    render(
      <MovieProvider>
        <div>Test</div>
      </MovieProvider>
    );
  });

  it('should provide context to children', () => {
    render(
      <MovieProvider>
        <TestComponent />
      </MovieProvider>
    );

    expect(screen.getByTestId('movie-count')).toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    render(
      <MovieProvider>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </MovieProvider>
    );
  });

  it('should render with nested components', () => {
    render(
      <MovieProvider>
        <div>
          <div>
            <TestComponent />
          </div>
        </div>
      </MovieProvider>
    );
  });
});
