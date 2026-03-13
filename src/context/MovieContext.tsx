import { createContext, useContext, useState, type ReactNode } from 'react';

import { mockMovies } from '../data/movies';
import { type Movie } from '../types/movie';
import { toggleFavorite as toggleFavoriteUtil } from '../utils/movieUtils';

type MovieContextType = {
  movies: Movie[];
  toggleFavorite: (id: number) => void;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);

  const toggleFavorite = (id: number): void => {
    setMovies((prevMovies) => toggleFavoriteUtil(prevMovies, id));
  };

  return (
    <MovieContext.Provider value={{ movies, toggleFavorite }}>
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
