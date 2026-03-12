import { useState, useMemo } from 'react';
import {
  Play,
  Heart,
  Info,
  Search,
  Bell,
  User,
  ChevronDown,
} from 'lucide-react';

import { FilterControls } from './components/FilterControls';
import { MovieList } from './components/MovieList';
import { SearchBar } from './components/SearchBar';
import { mockMovies } from './data/movies';
import { type SortOption, type FilterGenre } from './types/movie';
import {
  filterMovies,
  sortMovies,
  getFavoriteCount,
  toggleFavorite,
} from './utils/movieUtils';

function App(): React.JSX.Element {
  // State management
  const [movies, setMovies] = useState(mockMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [genre, setGenre] = useState<FilterGenre>('all');
  const [showSearch, setShowSearch] = useState(false);

  // Handle favorite toggle
  const handleToggleFavorite = (id: number): void => {
    setMovies((prevMovies) => toggleFavorite(prevMovies, id));
  };

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
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Netflix-style Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent">
        <div className="px-6 md:px-16 lg:px-20 py-6">
          <div className="flex items-center justify-between">
            {/* Logo & Nav */}
            <div className="flex items-center gap-12">
              <h1 className="text-3xl font-black text-red-600 tracking-tighter">
                SHEAPIT
              </h1>
              <nav className="hidden md:flex items-center gap-8 text-sm">
                <button className="text-white font-medium hover:text-gray-300 transition">
                  Home
                </button>
                <button className="text-gray-400 hover:text-gray-300 transition">
                  TV Shows
                </button>
                <button className="text-gray-400 hover:text-gray-300 transition">
                  Movies
                </button>
                <button className="text-gray-400 hover:text-gray-300 transition">
                  New & Popular
                </button>
                <button className="text-gray-400 hover:text-gray-300 transition flex items-center gap-1">
                  My List
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-red-600 text-xs font-bold">
                    {favoriteCount}
                  </span>
                </button>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:text-gray-300 transition"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-gray-300 transition">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-gray-300 transition">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Bar (Expandable) */}
          {showSearch && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          )}
        </div>
      </header>

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
              <div className="flex items-center gap-5">
                <button className="flex items-center gap-3 px-10 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-200 transition shadow-lg">
                  <Play className="w-6 h-6 fill-black" />
                  Play
                </button>
                <button className="flex items-center gap-3 px-10 py-4 bg-gray-700/80 rounded-lg font-bold text-lg hover:bg-gray-600/80 transition">
                  <Info className="w-6 h-6" />
                  More Info
                </button>
                <button
                  onClick={() => handleToggleFavorite(featuredMovie.id)}
                  className={`p-4 rounded-full border-2 transition ${
                    featuredMovie.isFavorite
                      ? 'bg-red-600 border-red-600'
                      : 'border-gray-400 hover:border-white'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${featuredMovie.isFavorite ? 'fill-white' : ''}`}
                  />
                </button>
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
        <FilterControls
          sortBy={sortBy}
          genre={genre}
          favoriteCount={favoriteCount}
          onSortChange={setSortBy}
          onGenreChange={setGenre}
        />
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
          </div>
          <MovieList
            movies={displayedMovies}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 md:px-16 lg:px-20 py-16 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-red-600 font-black text-2xl mb-6">SHEAPIT</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your premium streaming destination
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">
                Navigation
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white transition cursor-pointer">
                  Home
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Movies
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  TV Shows
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  My List
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white transition cursor-pointer">
                  Help Center
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Contact Us
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Account
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white transition cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Terms
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Cookies
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              © 2026 Sheapit. All rights reserved. React • TypeScript • Vite
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
