import { describe, it, expect } from 'vitest';

import { type Movie } from '../types/movie';

import {
  filterMovies,
  sortMovies,
  getFavoriteCount,
  toggleFavorite,
} from './movieUtils';

// Test data
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
    description: 'A thief who steals corporate secrets through dream-sharing.',
    poster: '💭',
    isFavorite: true,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    genre: ['action', 'thriller'],
    rating: 9.0,
    runtime: 152,
    description: 'Batman faces the Joker in Gotham City.',
    poster: '🦇',
    isFavorite: true,
  },
  {
    id: 4,
    title: 'Superbad',
    year: 2007,
    genre: ['comedy'],
    rating: 7.6,
    runtime: 113,
    description: 'Two co-dependent high school seniors.',
    poster: '😂',
    isFavorite: false,
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    year: 1994,
    genre: ['thriller', 'drama'],
    rating: 8.9,
    runtime: 154,
    description: 'Various interconnected stories in Los Angeles.',
    poster: '🔫',
    isFavorite: false,
  },
];

describe('movieUtils - COMPREHENSIVE NON-COMPONENT TEST', () => {
  describe('filterMovies', () => {
    it('should return all movies when no filters applied', () => {
      const result = filterMovies(mockMovies, '', 'all');
      expect(result).toHaveLength(5);
      expect(result).toEqual(mockMovies);
    });

    it('should filter movies by search term (case-insensitive)', () => {
      const result = filterMovies(mockMovies, 'dark', 'all');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Dark Knight');
    });

    it('should filter movies by search term with partial match', () => {
      const result = filterMovies(mockMovies, 'the', 'all');
      expect(result).toHaveLength(2);
      expect(result.map((m) => m.title)).toContain('The Matrix');
      expect(result.map((m) => m.title)).toContain('The Dark Knight');
    });

    it('should handle search term case variations', () => {
      const result = filterMovies(mockMovies, 'MATRIX', 'all');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Matrix');
    });

    it('should return empty array when search term has no matches', () => {
      const result = filterMovies(mockMovies, 'nonexistent', 'all');
      expect(result).toHaveLength(0);
    });

    it('should filter movies by genre', () => {
      const result = filterMovies(mockMovies, '', 'comedy');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Superbad');
    });

    it('should filter movies with multiple genres', () => {
      const result = filterMovies(mockMovies, '', 'action');
      expect(result).toHaveLength(3);
      expect(result.map((m) => m.title)).toContain('The Matrix');
      expect(result.map((m) => m.title)).toContain('Inception');
      expect(result.map((m) => m.title)).toContain('The Dark Knight');
    });

    it('should combine search term and genre filters', () => {
      const result = filterMovies(mockMovies, 'the', 'action');
      expect(result).toHaveLength(2);
      expect(result.map((m) => m.title)).toContain('The Matrix');
      expect(result.map((m) => m.title)).toContain('The Dark Knight');
    });

    it('should return empty array when combined filters have no matches', () => {
      const result = filterMovies(mockMovies, 'inception', 'comedy');
      expect(result).toHaveLength(0);
    });

    it('should not mutate the original array', () => {
      const original = [...mockMovies];
      filterMovies(mockMovies, 'matrix', 'sci-fi');
      expect(mockMovies).toEqual(original);
    });
  });

  describe('sortMovies', () => {
    it('should sort movies by title alphabetically', () => {
      const result = sortMovies(mockMovies, 'title');
      expect(result[0].title).toBe('Inception');
      expect(result[1].title).toBe('Pulp Fiction');
      expect(result[2].title).toBe('Superbad');
      expect(result[3].title).toBe('The Dark Knight');
      expect(result[4].title).toBe('The Matrix');
    });

    it('should sort movies by year (newest first)', () => {
      const result = sortMovies(mockMovies, 'year');
      expect(result[0].year).toBe(2010); // Inception
      expect(result[1].year).toBe(2008); // The Dark Knight
      expect(result[2].year).toBe(2007); // Superbad
      expect(result[3].year).toBe(1999); // The Matrix
      expect(result[4].year).toBe(1994); // Pulp Fiction
    });

    it('should sort movies by rating (highest first)', () => {
      const result = sortMovies(mockMovies, 'rating');
      expect(result[0].rating).toBe(9.0); // The Dark Knight
      expect(result[1].rating).toBe(8.9); // Pulp Fiction
      expect(result[2].rating).toBe(8.8); // Inception
      expect(result[3].rating).toBe(8.7); // The Matrix
      expect(result[4].rating).toBe(7.6); // Superbad
    });

    it('should not mutate the original array', () => {
      const original = [...mockMovies];
      sortMovies(mockMovies, 'rating');
      expect(mockMovies).toEqual(original);
    });

    it('should handle empty array', () => {
      const result = sortMovies([], 'title');
      expect(result).toHaveLength(0);
    });

    it('should handle single movie array', () => {
      const singleMovie = [mockMovies[0]];
      const result = sortMovies(singleMovie, 'title');
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockMovies[0]);
    });
  });

  describe('getFavoriteCount', () => {
    it('should return correct count of favorite movies', () => {
      const count = getFavoriteCount(mockMovies);
      expect(count).toBe(2); // Inception and The Dark Knight are favorites
    });

    it('should return 0 when no movies are favorites', () => {
      const noFavorites = mockMovies.map((m) => ({ ...m, isFavorite: false }));
      const count = getFavoriteCount(noFavorites);
      expect(count).toBe(0);
    });

    it('should return total count when all movies are favorites', () => {
      const allFavorites = mockMovies.map((m) => ({ ...m, isFavorite: true }));
      const count = getFavoriteCount(allFavorites);
      expect(count).toBe(5);
    });

    it('should handle empty array', () => {
      const count = getFavoriteCount([]);
      expect(count).toBe(0);
    });

    it('should not mutate the original array', () => {
      const original = [...mockMovies];
      getFavoriteCount(mockMovies);
      expect(mockMovies).toEqual(original);
    });
  });

  describe('toggleFavorite', () => {
    it('should toggle favorite status from false to true', () => {
      const result = toggleFavorite(mockMovies, 1); // The Matrix
      const toggledMovie = result.find((m) => m.id === 1);
      expect(toggledMovie?.isFavorite).toBe(true);
    });

    it('should toggle favorite status from true to false', () => {
      const result = toggleFavorite(mockMovies, 2); // Inception
      const toggledMovie = result.find((m) => m.id === 2);
      expect(toggledMovie?.isFavorite).toBe(false);
    });

    it('should only toggle the specified movie', () => {
      const result = toggleFavorite(mockMovies, 1);
      // Check that only movie with id 1 changed
      expect(result.find((m) => m.id === 1)?.isFavorite).toBe(true);
      expect(result.find((m) => m.id === 2)?.isFavorite).toBe(true); // Unchanged
      expect(result.find((m) => m.id === 3)?.isFavorite).toBe(true); // Unchanged
      expect(result.find((m) => m.id === 4)?.isFavorite).toBe(false); // Unchanged
      expect(result.find((m) => m.id === 5)?.isFavorite).toBe(false); // Unchanged
    });

    it('should handle non-existent movie id gracefully', () => {
      const result = toggleFavorite(mockMovies, 999);
      expect(result).toEqual(mockMovies);
    });

    it('should not mutate the original array', () => {
      const original = [...mockMovies];
      toggleFavorite(mockMovies, 1);
      expect(mockMovies).toEqual(original);
    });

    it('should create new movie objects (immutability)', () => {
      const result = toggleFavorite(mockMovies, 1);
      const originalMovie = mockMovies.find((m) => m.id === 1);
      const resultMovie = result.find((m) => m.id === 1);
      expect(resultMovie).not.toBe(originalMovie); // Different object reference
    });

    it('should handle empty array', () => {
      const result = toggleFavorite([], 1);
      expect(result).toHaveLength(0);
    });

    it('should toggle multiple times correctly', () => {
      let result = toggleFavorite(mockMovies, 1);
      expect(result.find((m) => m.id === 1)?.isFavorite).toBe(true);

      result = toggleFavorite(result, 1);
      expect(result.find((m) => m.id === 1)?.isFavorite).toBe(false);

      result = toggleFavorite(result, 1);
      expect(result.find((m) => m.id === 1)?.isFavorite).toBe(true);
    });
  });

  describe('Integration tests', () => {
    it('should filter, then sort movies correctly', () => {
      const filtered = filterMovies(mockMovies, '', 'action');
      const sorted = sortMovies(filtered, 'rating');
      expect(sorted).toHaveLength(3);
      expect(sorted[0].title).toBe('The Dark Knight'); // 9.0
      expect(sorted[1].title).toBe('Inception'); // 8.8
      expect(sorted[2].title).toBe('The Matrix'); // 8.7
    });

    it('should toggle favorite and count correctly', () => {
      let movies = [...mockMovies];
      const initialCount = getFavoriteCount(movies);
      expect(initialCount).toBe(2);

      movies = toggleFavorite(movies, 1); // Add The Matrix to favorites
      const newCount = getFavoriteCount(movies);
      expect(newCount).toBe(3);

      movies = toggleFavorite(movies, 2); // Remove Inception from favorites
      const finalCount = getFavoriteCount(movies);
      expect(finalCount).toBe(2);
    });

    it('should handle complex workflow: filter -> sort -> count favorites', () => {
      const filtered = filterMovies(mockMovies, '', 'action');
      const sorted = sortMovies(filtered, 'year');
      const favoriteCount = getFavoriteCount(sorted);
      expect(sorted).toHaveLength(3);
      expect(sorted[0].year).toBe(2010); // Inception
      expect(favoriteCount).toBe(2); // Inception and The Dark Knight
    });
  });
});
