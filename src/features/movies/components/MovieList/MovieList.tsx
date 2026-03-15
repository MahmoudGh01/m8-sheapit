import { type Movie } from '../../types';
import { MovieCard } from '../MovieCard';

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
      <p className="text-center text-muted-foreground py-12">No movies found</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
