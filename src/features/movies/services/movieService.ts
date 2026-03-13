import { mockMovies } from '../data';
import { type Movie } from '../types';

/**
 * Service layer for movie-related API calls
 *
 * This demonstrates the Services pattern:
 * - Independent, standalone functions
 * - Abstract away implementation details
 * - Can be easily tested and mocked
 * - Can be swapped out for real API calls
 */

/**
 * Fetches all movies from the API
 * Currently simulates a network request with mock data
 *
 * @returns Promise<Movie[]> - Array of movies
 */
export const fetchMovies = async (): Promise<Movie[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would be:
  // const response = await fetch('https://api.example.com/movies')
  // if (!response.ok) throw new Error('Failed to fetch movies')
  // return response.json()

  return [...mockMovies];
};

/**
 * Fetches a single movie by ID
 *
 * @param id - Movie ID
 * @returns Promise<Movie> - Single movie
 */
export const fetchMovieById = async (id: number): Promise<Movie> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const movie = mockMovies.find((m) => m.id === id);
  if (!movie) {
    throw new Error(`Movie with id ${id} not found`);
  }

  return { ...movie };
};

/**
 * Searches movies by query
 *
 * @param query - Search query
 * @returns Promise<Movie[]> - Array of matching movies
 */
export const searchMovies = async (query: string): Promise<Movie[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lowerQuery = query.toLowerCase();
  return mockMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.description.toLowerCase().includes(lowerQuery)
  );
};
