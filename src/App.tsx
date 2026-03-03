import { useState, useMemo } from 'react';

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

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#fff',
        padding: '20px',
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', margin: '0 0 10px 0' }}>
          🎬 Sheapit Movies
        </h1>
        <p style={{ color: '#999', fontSize: '18px', margin: 0 }}>
          Discover and track your favorite movies
        </p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <FilterControls
          sortBy={sortBy}
          genre={genre}
          favoriteCount={favoriteCount}
          onSortChange={setSortBy}
          onGenreChange={setGenre}
        />

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>
            {displayedMovies.length} Movies Found
          </h2>
          <MovieList
            movies={displayedMovies}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </main>

      <footer
        style={{
          textAlign: 'center',
          marginTop: '60px',
          paddingTop: '20px',
          borderTop: '1px solid #333',
          color: '#666',
          fontSize: '14px',
        }}
      >
        <p>Built with React, TypeScript, and Vite</p>
        <p style={{ marginTop: '8px' }}>
          Using useState, useMemo hooks and custom utilities
        </p>
      </footer>
    </div>
  );
}

export default App;
