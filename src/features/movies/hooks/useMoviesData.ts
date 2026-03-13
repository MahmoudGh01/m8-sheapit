import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchMovies, fetchMovieById, searchMovies } from '../services';

/**
 * Custom hooks using TanStack Query - Services as Hooks pattern
 *
 * Benefits:
 * - Automatic loading, error, and success states
 * - Built-in caching and refetching
 * - Optimistic updates
 * - Easy to use in components
 */

/**
 * Hook to fetch all movies
 * Demonstrates all data states:
 * - isLoading: Waiting for initial response
 * - isError: Error occurred
 * - data: Success with data (or undefined if no data)
 * - isFetching: Waiting for new response (revalidating)
 */
export const useMoviesData = (): ReturnType<typeof useQuery> => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Hook to fetch a single movie by ID
 *
 * @param id - Movie ID
 */
export const useMovieData = (id: number): ReturnType<typeof useQuery> => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieById(id),
    enabled: !!id, // Only run if id is provided
  });
};

/**
 * Hook to search movies
 *
 * @param query - Search query
 */
export const useMovieSearch = (query: string): ReturnType<typeof useQuery> => {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0, // Only search if query is not empty
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Example mutation hook (for future use when we have POST/PUT/DELETE endpoints)
 * This demonstrates how to handle mutations with TanStack Query
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      // This would be a real API call:
      // await fetch(`/api/movies/${id}/favorite`, { method: 'POST' })
      return { id };
    },
    onSuccess: () => {
      // Invalidate and refetch movies after mutation
      void queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};
