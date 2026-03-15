import { Heart, Star } from 'lucide-react';

import { type Movie } from '../../types';

type MovieCardProps = {
  movie: Movie;
  onToggleFavorite: (id: number) => void;
};

export function MovieCard({
  movie,
  onToggleFavorite,
}: MovieCardProps): React.JSX.Element {
  return (
    <div className="group relative aspect-[2/3] overflow-hidden bg-card rounded-lg cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
      {/* Poster */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-card flex items-center justify-center">
        <span className="text-5xl sm:text-6xl">{movie.poster}</span>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(movie.id);
        }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
      >
        <Heart
          className={`size-4 ${
            movie.isFavorite ? 'fill-red-500 text-red-500' : 'text-white/70'
          }`}
        />
      </button>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-3 z-10">
        <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>{movie.year}</span>
          <span className="flex items-center gap-0.5">
            <Star className="size-3 fill-yellow-500 text-yellow-500" />
            {movie.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
