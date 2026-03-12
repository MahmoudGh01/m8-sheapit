import { Heart, Play, Info, Star, Clock } from 'lucide-react';

import { type Movie } from '../types/movie';

type MovieCardProps = {
  movie: Movie;
  onToggleFavorite: (id: number) => void;
};

export function MovieCard({
  movie,
  onToggleFavorite,
}: MovieCardProps): React.JSX.Element {
  return (
    <div className="group relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-900 cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 shadow-xl hover:shadow-2xl">
      {/* Movie Poster/Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-gray-900 to-black flex items-center justify-center text-9xl">
        {movie.poster}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
        <div className="flex items-center gap-2 px-6 my-3 py-2 bg-yellow-500 text-black rounded-lg font-bold text-sm shadow-lg">
          <Star className="w-4 h-4 fill-black" />
          {movie.rating}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie.id);
          }}
          className={`p-3 rounded-full transition-all duration-300 ${
            movie.isFavorite
              ? 'bg-red-600 shadow-lg shadow-red-600/50'
              : 'bg-black/50 backdrop-blur-sm hover:bg-black/70'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${movie.isFavorite ? 'fill-white text-white' : 'text-white'}`}
          />
        </button>
      </div>

      {/* Content - Always visible but enhanced on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        {/* Title */}
        <h3 className="text-white text-xl font-bold mb-3 line-clamp-2 leading-tight group-hover:text-2xl transition-all duration-300">
          {movie.title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
          <span className="px-3 py-1.5 bg-green-600 text-white rounded-lg font-semibold text-xs">
            {movie.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {movie.runtime}m
          </span>
        </div>

        {/* Genres - visible on hover */}
        <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="px-3 py-1.5 bg-gray-800/80 backdrop-blur-sm text-gray-300 rounded-lg text-xs capitalize border border-gray-700"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Description - visible on hover */}
        <p className="text-sm text-gray-400 line-clamp-2 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
          {movie.description.substring(0, 100)}...
        </p>

        {/* Action buttons - visible on hover */}
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition shadow-lg">
            <Play className="w-4 h-4 fill-black" />
            Play
          </button>
          <button className="p-3 bg-gray-800/90 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition border border-gray-600">
            <Info className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Favorite indicator badge */}
      {movie.isFavorite && (
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-red-600 rounded-full text-xs font-bold text-white shadow-lg animate-pulse">
          IN LIST
        </div>
      )}
    </div>
  );
}
