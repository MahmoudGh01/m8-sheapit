import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from 'react';

import { useMoviesData } from '../hooks';
import { type Movie } from '../types';
import { toggleFavorite as toggleFavoriteUtil } from '../utils';

type MovieContextType = {
  movies: Movie[];
  toggleFavorite: (id: number) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  // Use TanStack Query hook for data fetching
  const { data: fetchedMovies, isLoading, isError, error } = useMoviesData();

  // Local state for client-side mutations (like toggling favorites)
  const [movies, setMovies] = useState<Movie[]>([]);

  // Update local state when fetched data changes
  useEffect(() => {
    if (fetchedMovies && Array.isArray(fetchedMovies)) {
      setMovies(fetchedMovies);
    }
  }, [fetchedMovies]);

  const toggleFavorite = (id: number): void => {
    setMovies((prevMovies) => toggleFavoriteUtil(prevMovies, id));
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        toggleFavorite,
        isLoading,
        isError,
        error: error instanceof Error ? error : null,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies(): MovieContextType {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}
