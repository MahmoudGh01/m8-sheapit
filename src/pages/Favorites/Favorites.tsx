import { Heart, Film, TrendingUp } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  MovieList,
  SearchBar,
  useMovies,
  sortMovies,
  type SortOption,
} from '../../features/movies';

export function Favorites(): React.JSX.Element {
  // Get shared movie state with loading and error states
  const { movies, toggleFavorite, isLoading, isError } = useMovies();

  // Local state for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');

  // Get favorite movies
  const favoriteMovies = useMemo(() => {
    const favorites = movies.filter((m) => m.isFavorite);
    const filtered = searchTerm
      ? favorites.filter(
          (m) =>
            m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.genre.some((g) =>
              g.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
      : favorites;
    return sortMovies(filtered, sortBy);
  }, [movies, searchTerm, sortBy]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 mb-6">
            We couldn't load your favorites. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Header */}
      <section className="relative px-6 md:px-16 lg:px-20 py-16 border-b border-gray-800">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-full mb-6">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="text-sm font-semibold text-red-400">
              YOUR COLLECTION
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">
            My Favorite Movies
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Your personal collection of beloved films. Curate, organize, and
            revisit the movies that matter most to you.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <Film className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {favoriteMovies.length}
                </p>
                <p className="text-sm text-gray-400">Total Favorites</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{movies.length}</p>
                <p className="text-sm text-gray-400">Total Movies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-[#141414]/95 backdrop-blur-lg border-b border-gray-800/50 px-6 md:px-16 lg:px-20 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-medium">Sort:</span>
            {(['title', 'year', 'rating'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  sortBy === option
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {option === 'title'
                  ? 'A-Z'
                  : option === 'year'
                    ? 'Year'
                    : 'Rating'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <main className="px-6 md:px-16 lg:px-20 py-16">
        {favoriteMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center mb-8 border-2 border-red-500/30">
              <Heart className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              No Favorites Yet
            </h2>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-8">
              Start building your collection by adding movies to your favorites.
              Browse all movies and click the heart icon to save them here.
            </p>
            <Link
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:from-red-500 hover:to-pink-500 transition-all shadow-lg shadow-red-500/30"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="mb-12">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-white">
                  Your Favorites
                </h2>
                <p className="text-gray-400 text-lg">
                  {favoriteMovies.length} movie
                  {favoriteMovies.length !== 1 ? 's' : ''} in your collection
                </p>
              </div>
            </div>
            <MovieList
              movies={favoriteMovies}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        )}
      </main>
    </>
  );
}
