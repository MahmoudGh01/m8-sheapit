import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { type SortOption, type FilterGenre } from '../../types/movie';

import { FilterControls } from './FilterControls';

describe('FilterControls - COMPONENT TEST WITH USER INTERACTIONS', () => {
  const defaultProps = {
    sortBy: 'title' as SortOption,
    genre: 'all' as FilterGenre,
    favoriteCount: 5,
    onSortChange: vi.fn(),
    onGenreChange: vi.fn(),
  };

  describe('Rendering', () => {
    it('should render all genre filter buttons', () => {
      render(<FilterControls {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Action' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Comedy' })
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Drama' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Sci-Fi' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Thriller' })
      ).toBeInTheDocument();
    });

    it('should render all sort option buttons', () => {
      render(<FilterControls {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'A-Z' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Year' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Rating' })
      ).toBeInTheDocument();
    });

    it('should render Genre and Sort labels', () => {
      render(<FilterControls {...defaultProps} />);

      expect(screen.getByText('Genre:')).toBeInTheDocument();
      expect(screen.getByText('Sort:')).toBeInTheDocument();
    });

    it('should highlight active genre button', () => {
      render(<FilterControls {...defaultProps} genre="action" />);

      const actionButton = screen.getByRole('button', { name: 'Action' });
      expect(actionButton.className).toContain('bg-red-600');
      expect(actionButton.className).toContain('text-white');
    });

    it('should highlight active sort button', () => {
      render(<FilterControls {...defaultProps} sortBy="rating" />);

      const ratingButton = screen.getByRole('button', { name: 'Rating' });
      expect(ratingButton.className).toContain('bg-white');
      expect(ratingButton.className).toContain('text-black');
    });

    it('should render inactive genre buttons with correct styles', () => {
      render(<FilterControls {...defaultProps} genre="action" />);

      const allButton = screen.getByRole('button', { name: 'All' });
      expect(allButton.className).toContain('bg-gray-800');
      expect(allButton.className).toContain('text-gray-300');
    });

    it('should render inactive sort buttons with correct styles', () => {
      render(<FilterControls {...defaultProps} sortBy="title" />);

      const yearButton = screen.getByRole('button', { name: 'Year' });
      expect(yearButton.className).toContain('bg-gray-800');
      expect(yearButton.className).toContain('text-gray-300');
    });
  });

  describe('User Interactions - Genre Filters', () => {
    it('should call onGenreChange when All button is clicked', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      const allButton = screen.getByRole('button', { name: 'All' });
      await user.click(allButton);

      expect(mockOnGenreChange).toHaveBeenCalledTimes(1);
      expect(mockOnGenreChange).toHaveBeenCalledWith('all');
    });

    it('should call onGenreChange when Action button is clicked', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      const actionButton = screen.getByRole('button', { name: 'Action' });
      await user.click(actionButton);

      expect(mockOnGenreChange).toHaveBeenCalledTimes(1);
      expect(mockOnGenreChange).toHaveBeenCalledWith('action');
    });

    it('should call onGenreChange when Comedy button is clicked', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      const comedyButton = screen.getByRole('button', { name: 'Comedy' });
      await user.click(comedyButton);

      expect(mockOnGenreChange).toHaveBeenCalledTimes(1);
      expect(mockOnGenreChange).toHaveBeenCalledWith('comedy');
    });

    it('should call onGenreChange when Drama button is clicked', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      const dramaButton = screen.getByRole('button', { name: 'Drama' });
      await user.click(dramaButton);

      expect(mockOnGenreChange).toHaveBeenCalledTimes(1);
      expect(mockOnGenreChange).toHaveBeenCalledWith('drama');
    });

    it('should call onGenreChange when Sci-Fi button is clicked', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      const sciFiButton = screen.getByRole('button', { name: 'Sci-Fi' });
      await user.click(sciFiButton);

      expect(mockOnGenreChange).toHaveBeenCalledTimes(1);
      expect(mockOnGenreChange).toHaveBeenCalledWith('sci-fi');
    });

    it('should call onGenreChange when Thriller button is clicked', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      const thrillerButton = screen.getByRole('button', { name: 'Thriller' });
      await user.click(thrillerButton);

      expect(mockOnGenreChange).toHaveBeenCalledTimes(1);
      expect(mockOnGenreChange).toHaveBeenCalledWith('thriller');
    });

    it('should handle multiple genre button clicks', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      await user.click(screen.getByRole('button', { name: 'Action' }));
      await user.click(screen.getByRole('button', { name: 'Comedy' }));
      await user.click(screen.getByRole('button', { name: 'Drama' }));

      expect(mockOnGenreChange).toHaveBeenCalledTimes(3);
      expect(mockOnGenreChange).toHaveBeenNthCalledWith(1, 'action');
      expect(mockOnGenreChange).toHaveBeenNthCalledWith(2, 'comedy');
      expect(mockOnGenreChange).toHaveBeenNthCalledWith(3, 'drama');
    });

    it('should handle rapid consecutive genre clicks', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      const actionButton = screen.getByRole('button', { name: 'Action' });
      await user.click(actionButton);
      await user.click(actionButton);
      await user.click(actionButton);

      expect(mockOnGenreChange).toHaveBeenCalledTimes(3);
      expect(mockOnGenreChange).toHaveBeenCalledWith('action');
    });

    it('should support keyboard navigation for genre buttons', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      const actionButton = screen.getByRole('button', { name: 'Action' });
      actionButton.focus();
      await user.keyboard('{Enter}');

      expect(mockOnGenreChange).toHaveBeenCalledWith('action');
    });
  });

  describe('User Interactions - Sort Options', () => {
    it('should call onSortChange when A-Z button is clicked', async () => {
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onSortChange={mockOnSortChange} />
      );

      const azButton = screen.getByRole('button', { name: 'A-Z' });
      await user.click(azButton);

      expect(mockOnSortChange).toHaveBeenCalledTimes(1);
      expect(mockOnSortChange).toHaveBeenCalledWith('title');
    });

    it('should call onSortChange when Year button is clicked', async () => {
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onSortChange={mockOnSortChange} />
      );

      const yearButton = screen.getByRole('button', { name: 'Year' });
      await user.click(yearButton);

      expect(mockOnSortChange).toHaveBeenCalledTimes(1);
      expect(mockOnSortChange).toHaveBeenCalledWith('year');
    });

    it('should call onSortChange when Rating button is clicked', async () => {
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onSortChange={mockOnSortChange} />
      );

      const ratingButton = screen.getByRole('button', { name: 'Rating' });
      await user.click(ratingButton);

      expect(mockOnSortChange).toHaveBeenCalledTimes(1);
      expect(mockOnSortChange).toHaveBeenCalledWith('rating');
    });

    it('should handle multiple sort button clicks', async () => {
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onSortChange={mockOnSortChange} />
      );

      await user.click(screen.getByRole('button', { name: 'Year' }));
      await user.click(screen.getByRole('button', { name: 'Rating' }));
      await user.click(screen.getByRole('button', { name: 'A-Z' }));

      expect(mockOnSortChange).toHaveBeenCalledTimes(3);
      expect(mockOnSortChange).toHaveBeenNthCalledWith(1, 'year');
      expect(mockOnSortChange).toHaveBeenNthCalledWith(2, 'rating');
      expect(mockOnSortChange).toHaveBeenNthCalledWith(3, 'title');
    });

    it('should handle rapid consecutive sort clicks', async () => {
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onSortChange={mockOnSortChange} />
      );

      const yearButton = screen.getByRole('button', { name: 'Year' });
      await user.click(yearButton);
      await user.click(yearButton);
      await user.click(yearButton);

      expect(mockOnSortChange).toHaveBeenCalledTimes(3);
      expect(mockOnSortChange).toHaveBeenCalledWith('year');
    });

    it('should support keyboard navigation for sort buttons', async () => {
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onSortChange={mockOnSortChange} />
      );

      const ratingButton = screen.getByRole('button', { name: 'Rating' });
      ratingButton.focus();
      await user.keyboard('{Enter}');

      expect(mockOnSortChange).toHaveBeenCalledWith('rating');
    });

    it('should support Space key for activating buttons', async () => {
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onSortChange={mockOnSortChange} />
      );

      const yearButton = screen.getByRole('button', { name: 'Year' });
      yearButton.focus();
      await user.keyboard(' ');

      expect(mockOnSortChange).toHaveBeenCalledWith('year');
    });
  });

  describe('Combined User Interactions', () => {
    it('should handle genre and sort changes together', async () => {
      const mockOnGenreChange = vi.fn();
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls
          {...defaultProps}
          onGenreChange={mockOnGenreChange}
          onSortChange={mockOnSortChange}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Action' }));
      await user.click(screen.getByRole('button', { name: 'Rating' }));
      await user.click(screen.getByRole('button', { name: 'Sci-Fi' }));
      await user.click(screen.getByRole('button', { name: 'Year' }));

      expect(mockOnGenreChange).toHaveBeenCalledTimes(2);
      expect(mockOnSortChange).toHaveBeenCalledTimes(2);
      expect(mockOnGenreChange).toHaveBeenNthCalledWith(1, 'action');
      expect(mockOnSortChange).toHaveBeenNthCalledWith(1, 'rating');
      expect(mockOnGenreChange).toHaveBeenNthCalledWith(2, 'sci-fi');
      expect(mockOnSortChange).toHaveBeenNthCalledWith(2, 'year');
    });

    it('should not call onSortChange when genre buttons are clicked', async () => {
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onSortChange={mockOnSortChange} />
      );

      await user.click(screen.getByRole('button', { name: 'Action' }));

      expect(mockOnSortChange).not.toHaveBeenCalled();
    });

    it('should not call onGenreChange when sort buttons are clicked', async () => {
      const mockOnGenreChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FilterControls {...defaultProps} onGenreChange={mockOnGenreChange} />
      );

      await user.click(screen.getByRole('button', { name: 'Rating' }));

      expect(mockOnGenreChange).not.toHaveBeenCalled();
    });

    it('should handle complex user workflow', async () => {
      const mockOnGenreChange = vi.fn();
      const mockOnSortChange = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <FilterControls
          {...defaultProps}
          onGenreChange={mockOnGenreChange}
          onSortChange={mockOnSortChange}
        />
      );

      // Step 1: User selects Action genre
      await user.click(screen.getByRole('button', { name: 'Action' }));
      expect(mockOnGenreChange).toHaveBeenCalledWith('action');

      // Step 2: User changes sort to Rating
      await user.click(screen.getByRole('button', { name: 'Rating' }));
      expect(mockOnSortChange).toHaveBeenCalledWith('rating');

      // Step 3: Rerender with new props
      rerender(
        <FilterControls
          {...defaultProps}
          genre="action"
          sortBy="rating"
          onGenreChange={mockOnGenreChange}
          onSortChange={mockOnSortChange}
        />
      );

      // Verify UI updates
      expect(
        screen.getByRole('button', { name: 'Action' }).className
      ).toContain('bg-red-600');
      expect(
        screen.getByRole('button', { name: 'Rating' }).className
      ).toContain('bg-white');

      // Step 4: User changes genre to Comedy
      await user.click(screen.getByRole('button', { name: 'Comedy' }));
      expect(mockOnGenreChange).toHaveBeenCalledWith('comedy');
    });
  });

  describe('Accessibility', () => {
    it('should have all buttons keyboard accessible', () => {
      render(<FilterControls {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button.tagName).toBe('BUTTON');
      });
    });

    it('should maintain proper button count', () => {
      render(<FilterControls {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      // 6 genre buttons + 3 sort buttons = 9 total
      expect(buttons).toHaveLength(9);
    });

    it('should support tab navigation through all buttons', async () => {
      const user = userEvent.setup();
      render(<FilterControls {...defaultProps} />);

      // Start tabbing from the beginning
      await user.tab();
      let focused = document.activeElement;
      expect(focused?.tagName).toBe('BUTTON');

      // Tab through several buttons
      for (let i = 0; i < 8; i++) {
        await user.tab();
        focused = document.activeElement;
        expect(focused?.tagName).toBe('BUTTON');
      }
    });
  });

  describe('Visual States', () => {
    it('should update visual state when genre prop changes', () => {
      const { rerender } = render(
        <FilterControls {...defaultProps} genre="all" />
      );

      let allButton = screen.getByRole('button', { name: 'All' });
      expect(allButton.className).toContain('bg-red-600');

      rerender(<FilterControls {...defaultProps} genre="action" />);

      allButton = screen.getByRole('button', { name: 'All' });
      const actionButton = screen.getByRole('button', { name: 'Action' });

      expect(allButton.className).not.toContain('bg-red-600');
      expect(actionButton.className).toContain('bg-red-600');
    });

    it('should update visual state when sortBy prop changes', () => {
      const { rerender } = render(
        <FilterControls {...defaultProps} sortBy="title" />
      );

      let azButton = screen.getByRole('button', { name: 'A-Z' });
      expect(azButton.className).toContain('bg-white');

      rerender(<FilterControls {...defaultProps} sortBy="year" />);

      azButton = screen.getByRole('button', { name: 'A-Z' });
      const yearButton = screen.getByRole('button', { name: 'Year' });

      expect(azButton.className).not.toContain('bg-white');
      expect(yearButton.className).toContain('bg-white');
    });

    it('should maintain visual separation between genre and sort sections', () => {
      render(<FilterControls {...defaultProps} />);

      expect(screen.getByText('Genre:')).toBeInTheDocument();
      expect(screen.getByText('Sort:')).toBeInTheDocument();
    });
  });
});
