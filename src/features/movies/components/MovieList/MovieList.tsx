import { Film } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center p-24 text-center">
        <div className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center mb-8">
          <Film className="w-14 h-14 text-gray-600" />
        </div>
        <h3 className="text-4xl font-bold text-white mb-4">No movies found</h3>
        <p className="text-gray-400 max-w-md text-lg leading-relaxed">
          We couldn't find any movies matching your criteria. Try adjusting your
          filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
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
