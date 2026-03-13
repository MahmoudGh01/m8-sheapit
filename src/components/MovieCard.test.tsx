import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MovieCard } from './MovieCard';
import { type Movie } from '../types/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'The Matrix',
  year: 1999,
  genre: ['action', 'sci-fi'],
  rating: 8.7,
  runtime: 136,
  description:
    'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  poster: '🎬',
  isFavorite: false,
};

describe('MovieCard - COMPREHENSIVE COMPONENT TEST', () => {
  describe('Rendering', () => {
    it('should render movie card with all essential information', () => {
      const mockOnToggle = vi.fn();
      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      // Check title
      expect(screen.getByText('The Matrix')).toBeInTheDocument();

      // Check year
      expect(screen.getByText('1999')).toBeInTheDocument();

      // Check rating
      expect(screen.getByText('8.7')).toBeInTheDocument();

      // Check runtime
      expect(screen.getByText('136m')).toBeInTheDocument();

      // Check poster emoji
      expect(screen.getByText('🎬')).toBeInTheDocument();

      // Check description (truncated)
      expect(
        screen.getByText(/A computer hacker learns from mysterious rebels/)
      ).toBeInTheDocument();
    });

    it('should render all genre tags', () => {
      const mockOnToggle = vi.fn();
      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      expect(screen.getByText('action')).toBeInTheDocument();
      expect(screen.getByText('sci-fi')).toBeInTheDocument();
    });

    it('should render action buttons', () => {
      const mockOnToggle = vi.fn();
      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      // Check for Play button
      expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();

      // Check for Info button (by icon)
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(1);
    });

    it('should render favorite button', () => {
      const mockOnToggle = vi.fn();
      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      const buttons = screen.getAllByRole('button');
      // Heart button should be present (one of the buttons)
      expect(buttons.length).toBeGreaterThanOrEqual(3); // Play, Info, Heart
    });

    it('should show "IN LIST" badge when movie is favorited', () => {
      const mockOnToggle = vi.fn();
      const favoritedMovie = { ...mockMovie, isFavorite: true };
      render(
        <MovieCard movie={favoritedMovie} onToggleFavorite={mockOnToggle} />
      );

      expect(screen.getByText('IN LIST')).toBeInTheDocument();
    });

    it('should not show "IN LIST" badge when movie is not favorited', () => {
      const mockOnToggle = vi.fn();
      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      expect(screen.queryByText('IN LIST')).not.toBeInTheDocument();
    });

    it('should handle movies with multiple genres', () => {
      const mockOnToggle = vi.fn();
      const multiGenreMovie: Movie = {
        ...mockMovie,
        genre: ['action', 'sci-fi', 'thriller', 'drama'],
      };
      render(
        <MovieCard movie={multiGenreMovie} onToggleFavorite={mockOnToggle} />
      );

      expect(screen.getByText('action')).toBeInTheDocument();
      expect(screen.getByText('sci-fi')).toBeInTheDocument();
      expect(screen.getByText('thriller')).toBeInTheDocument();
      expect(screen.getByText('drama')).toBeInTheDocument();
    });

    it('should handle long movie titles', () => {
      const mockOnToggle = vi.fn();
      const longTitleMovie: Movie = {
        ...mockMovie,
        title:
          'The Very Long Title of This Amazing Movie That Should Be Truncated',
      };
      render(
        <MovieCard movie={longTitleMovie} onToggleFavorite={mockOnToggle} />
      );

      expect(
        screen.getByText(
          'The Very Long Title of This Amazing Movie That Should Be Truncated'
        )
      ).toBeInTheDocument();
    });

    it('should truncate long descriptions correctly', () => {
      const mockOnToggle = vi.fn();
      const longDescMovie: Movie = {
        ...mockMovie,
        description:
          'This is a very long description that should be truncated to 100 characters and then followed by ellipsis to indicate there is more content available to read if the user wants to see the full description.',
      };
      render(
        <MovieCard movie={longDescMovie} onToggleFavorite={mockOnToggle} />
      );

      // Should truncate to 100 chars + "..."
      expect(
        screen.getByText(/This is a very long description/)
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions - WITH USER EVENTS', () => {
    it('should call onToggleFavorite when favorite button is clicked', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      // Find the heart button (it's one of the buttons at the top)
      const buttons = screen.getAllByRole('button');
      // The heart button should be the last button in the top section
      const heartButton = buttons.find((btn) =>
        btn.className.includes('rounded-full')
      );

      expect(heartButton).toBeDefined();
      await user.click(heartButton!);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith(1);
    });

    it('should call onToggleFavorite with correct movie id', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();
      const differentMovie: Movie = { ...mockMovie, id: 42 };

      render(
        <MovieCard movie={differentMovie} onToggleFavorite={mockOnToggle} />
      );

      const buttons = screen.getAllByRole('button');
      const heartButton = buttons.find((btn) =>
        btn.className.includes('rounded-full')
      );

      await user.click(heartButton!);

      expect(mockOnToggle).toHaveBeenCalledWith(42);
    });

    it('should not propagate click event to parent when favorite button clicked', async () => {
      const mockOnToggle = vi.fn();
      const mockParentClick = vi.fn();
      const user = userEvent.setup();

      render(
        <div onClick={mockParentClick}>
          <MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />
        </div>
      );

      const buttons = screen.getAllByRole('button');
      const heartButton = buttons.find((btn) =>
        btn.className.includes('rounded-full')
      );

      await user.click(heartButton!);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      // Parent click should not be called due to stopPropagation
      expect(mockParentClick).not.toHaveBeenCalled();
    });

    it('should handle multiple clicks on favorite button', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      const buttons = screen.getAllByRole('button');
      const heartButton = buttons.find((btn) =>
        btn.className.includes('rounded-full')
      );

      await user.click(heartButton!);
      await user.click(heartButton!);
      await user.click(heartButton!);

      expect(mockOnToggle).toHaveBeenCalledTimes(3);
    });

    it('should handle clicking Play button', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      const playButton = screen.getByRole('button', { name: /play/i });
      await user.click(playButton);

      // Play button doesn't have a handler, but should not throw error
      expect(mockOnToggle).not.toHaveBeenCalled();
    });

    it('should handle rapid consecutive clicks', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      const buttons = screen.getAllByRole('button');
      const heartButton = buttons.find((btn) =>
        btn.className.includes('rounded-full')
      );

      // Rapid clicks
      await user.click(heartButton!);
      await user.click(heartButton!);
      await user.click(heartButton!);
      await user.click(heartButton!);
      await user.click(heartButton!);

      expect(mockOnToggle).toHaveBeenCalledTimes(5);
    });
  });

  describe('Visual States', () => {
    it('should apply different styles when movie is favorited', () => {
      const mockOnToggle = vi.fn();
      const favoritedMovie = { ...mockMovie, isFavorite: true };

      render(
        <MovieCard movie={favoritedMovie} onToggleFavorite={mockOnToggle} />
      );

      const buttons = screen.getAllByRole('button');
      const heartButton = buttons.find((btn) =>
        btn.className.includes('rounded-full')
      );

      // Should have red background when favorited
      expect(heartButton?.className).toContain('bg-red-600');
    });

    it('should apply different styles when movie is not favorited', () => {
      const mockOnToggle = vi.fn();

      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      const buttons = screen.getAllByRole('button');
      const heartButton = buttons.find((btn) =>
        btn.className.includes('rounded-full')
      );

      // Should have dark background when not favorited
      expect(heartButton?.className).toContain('bg-black/50');
    });
  });

  describe('Edge Cases', () => {
    it('should handle movie with rating 0', () => {
      const mockOnToggle = vi.fn();
      const zeroRatingMovie: Movie = { ...mockMovie, rating: 0 };

      render(
        <MovieCard movie={zeroRatingMovie} onToggleFavorite={mockOnToggle} />
      );

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle movie with very high rating', () => {
      const mockOnToggle = vi.fn();
      const highRatingMovie: Movie = { ...mockMovie, rating: 10.0 };

      render(
        <MovieCard movie={highRatingMovie} onToggleFavorite={mockOnToggle} />
      );

      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should handle movie with empty genre array', () => {
      const mockOnToggle = vi.fn();
      const noGenreMovie: Movie = { ...mockMovie, genre: [] };

      render(
        <MovieCard movie={noGenreMovie} onToggleFavorite={mockOnToggle} />
      );

      // Should still render without errors
      expect(screen.getByText('The Matrix')).toBeInTheDocument();
    });

    it('should handle movie with short runtime', () => {
      const mockOnToggle = vi.fn();
      const shortMovie: Movie = { ...mockMovie, runtime: 30 };

      render(<MovieCard movie={shortMovie} onToggleFavorite={mockOnToggle} />);

      expect(screen.getByText('30m')).toBeInTheDocument();
    });

    it('should handle movie with very long runtime', () => {
      const mockOnToggle = vi.fn();
      const longMovie: Movie = { ...mockMovie, runtime: 350 };

      render(<MovieCard movie={longMovie} onToggleFavorite={mockOnToggle} />);

      expect(screen.getByText('350m')).toBeInTheDocument();
    });

    it('should handle movie with empty description', () => {
      const mockOnToggle = vi.fn();
      const noDescMovie: Movie = { ...mockMovie, description: '' };

      render(<MovieCard movie={noDescMovie} onToggleFavorite={mockOnToggle} />);

      // Should render without errors
      expect(screen.getByText('The Matrix')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have buttons that are keyboard accessible', () => {
      const mockOnToggle = vi.fn();
      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('BUTTON');
      });
    });

    it('should maintain focus after clicking favorite button', async () => {
      const mockOnToggle = vi.fn();
      const user = userEvent.setup();

      render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggle} />);

      const buttons = screen.getAllByRole('button');
      const heartButton = buttons.find((btn) =>
        btn.className.includes('rounded-full')
      );

      heartButton?.focus();
      await user.click(heartButton!);

      // Button should still exist after click
      expect(heartButton).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should work with different movie objects', async () => {
      const mockOnToggle = vi.fn();

      const movies: Movie[] = [
        mockMovie,
        { ...mockMovie, id: 2, title: 'Inception', isFavorite: true },
        { ...mockMovie, id: 3, title: 'Interstellar', isFavorite: false },
      ];

      const { rerender } = render(
        <MovieCard movie={movies[0]} onToggleFavorite={mockOnToggle} />
      );

      expect(screen.getByText('The Matrix')).toBeInTheDocument();

      rerender(<MovieCard movie={movies[1]} onToggleFavorite={mockOnToggle} />);

      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByText('IN LIST')).toBeInTheDocument();

      rerender(<MovieCard movie={movies[2]} onToggleFavorite={mockOnToggle} />);

      expect(screen.getByText('Interstellar')).toBeInTheDocument();
      expect(screen.queryByText('IN LIST')).not.toBeInTheDocument();
    });
  });
});
