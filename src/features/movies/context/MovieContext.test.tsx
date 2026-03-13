import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { MovieProviderWrapper } from '../../../shared/test/testUtils';

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
      <MovieProviderWrapper>
        <MovieProvider>
          <div>Test</div>
        </MovieProvider>
      </MovieProviderWrapper>
    );
  });

  it('should provide context to children', () => {
    render(
      <MovieProviderWrapper>
        <TestComponent />
      </MovieProviderWrapper>
    );

    expect(screen.getByTestId('movie-count')).toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    render(
      <MovieProviderWrapper>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </MovieProviderWrapper>
    );
  });

  it('should render with nested components', () => {
    render(
      <MovieProviderWrapper>
        <div>
          <div>
            <TestComponent />
          </div>
        </div>
      </MovieProviderWrapper>
    );
  });
});
