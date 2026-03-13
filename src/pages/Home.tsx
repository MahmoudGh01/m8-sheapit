import { useState, useMemo } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

import { FilterControls } from '../components/FilterControls';
import { MovieList } from '../components/MovieList';
import { SearchBar } from '../components/SearchBar';
import { useMovies } from '../context/MovieContext';
import { type SortOption, type FilterGenre } from '../types/movie';
import {
  filterMovies,
  sortMovies,
  getFavoriteCount,
} from '../utils/movieUtils';

export function Home(): React.JSX.Element {
  // Get shared movie state
  const { movies, toggleFavorite } = useMovies();

  // Local state for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [genre, setGenre] = useState<FilterGenre>('all');

  // Memoized filtered and sorted movies
  const displayedMovies = useMemo(() => {
    const filtered = filterMovies(movies, searchTerm, genre);
    return sortMovies(filtered, sortBy);
  }, [movies, searchTerm, genre, sortBy]);

  // Memoized favorite count
  const favoriteCount = useMemo(() => getFavoriteCount(movies), [movies]);

  // Get featured movie (first favorite or first movie)
  const featuredMovie = movies.find((m) => m.isFavorite) || movies[0];

  return (
    <>
      {/* Hero Section with Featured Movie */}
      <section className="relative h-[85vh] flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/50 z-10"></div>

        {/* Featured movie background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/20 to-blue-900/20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[20rem] opacity-10">
            {featuredMovie?.poster}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 px-6 md:px-16 lg:px-20 max-w-3xl">
          {featuredMovie && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-red-600 text-xs font-bold rounded">
                  FEATURED
                </span>
                <span className="px-4 py-2 bg-yellow-500 text-black text-xs font-bold rounded flex items-center gap-1.5">
                  ⭐ {featuredMovie.rating}
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                {featuredMovie.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                {featuredMovie.description.substring(0, 200)}...
              </p>
              <div className="flex flex-wrap items-center gap-5 mb-10">
                <span className="text-green-500 font-semibold text-lg">
                  {featuredMovie.year}
                </span>
                <span className="text-gray-400 text-lg">
                  {featuredMovie.runtime} min
                </span>
                <div className="flex gap-3">
                  {featuredMovie.genre.map((g) => (
                    <span
                      key={g}
                      className="px-4 py-2 border border-gray-600 rounded text-sm capitalize"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-10 h-10 text-white/60" />
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-[#141414]/95 backdrop-blur-lg border-t border-b border-gray-800/50 px-6 md:px-16 lg:px-20 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <FilterControls
            sortBy={sortBy}
            genre={genre}
            favoriteCount={favoriteCount}
            onSortChange={setSortBy}
            onGenreChange={setGenre}
          />
        </div>
      </div>

      {/* Movies Section */}
      <main className="px-6 md:px-16 lg:px-20 py-16">
        <div className="mb-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-3">
                {genre === 'all'
                  ? 'All Movies'
                  : `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`}
              </h2>
              <p className="text-gray-400 text-lg">
                {displayedMovies.length} titles available
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">
                {favoriteCount} Favorites
              </span>
            </div>
          </div>
          <MovieList
            movies={displayedMovies}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </main>
    </>
  );
}
