import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { type Movie } from '../../types/movie';

import { MovieList } from './MovieList';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'The Matrix',
    year: 1999,
    genre: ['action', 'sci-fi'],
    rating: 8.7,
    runtime: 136,
    description: 'A computer hacker learns about the true nature of reality.',
    poster: '🎬',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    genre: ['action', 'sci-fi'],
    rating: 8.8,
    runtime: 148,
    description: 'A thief who steals corporate secrets.',
    poster: '💭',
    isFavorite: true,
  },
];

describe('MovieList - SMOKE TEST', () => {
  it('should render without crashing', () => {
    const mockOnToggle = vi.fn();
    render(<MovieList movies={[]} onToggleFavorite={mockOnToggle} />);
  });

  it('should render with empty movies array', () => {
    const mockOnToggle = vi.fn();
    render(<MovieList movies={[]} onToggleFavorite={mockOnToggle} />);
  });

  it('should render with single movie', () => {
    const mockOnToggle = vi.fn();
    render(
      <MovieList movies={[mockMovies[0]]} onToggleFavorite={mockOnToggle} />
    );
  });

  it('should render with multiple movies', () => {
    const mockOnToggle = vi.fn();
    render(<MovieList movies={mockMovies} onToggleFavorite={mockOnToggle} />);
  });

  it('should render with different movie data', () => {
    const mockOnToggle = vi.fn();
    const differentMovie: Movie = {
      id: 99,
      title: 'Test Movie',
      year: 2024,
      genre: ['drama'],
      rating: 7.5,
      runtime: 120,
      description: 'A test movie',
      poster: '🎭',
      isFavorite: false,
    };
    render(
      <MovieList movies={[differentMovie]} onToggleFavorite={mockOnToggle} />
    );
  });

  it('should render with empty handler', () => {
    render(<MovieList movies={mockMovies} onToggleFavorite={() => {}} />);
  });

  it('should render with many movies', () => {
    const mockOnToggle = vi.fn();
    const manyMovies = Array.from({ length: 20 }, (_, i) => ({
      ...mockMovies[0],
      id: i,
      title: `Movie ${i}`,
    }));
    render(<MovieList movies={manyMovies} onToggleFavorite={mockOnToggle} />);
  });
});
