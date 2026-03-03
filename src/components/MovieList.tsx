import { type Movie } from '../types/movie';

import { MovieCard } from './MovieCard';

type MovieListProps = {
  movies: Movie[];
  onToggleFavorite: (id: number) => void;
};

export function MovieList({
  movies,
  onToggleFavorite,
}: MovieListProps): React.JSX.Element {
  if (movies.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: '#999',
          fontSize: '18px',
        }}
      >
        No movies found. Try adjusting your filters!
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
