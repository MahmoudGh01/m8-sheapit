// Components
export { MovieCard, MovieList, FilterControls, SearchBar } from './components';

// Context
export { MovieProvider, useMovies } from './context';

// Hooks
export {
  useMoviesData,
  useMovieData,
  useMovieSearch,
  useToggleFavorite,
} from './hooks';

// Services
export { fetchMovies, fetchMovieById, searchMovies } from './services';

// Types
export type { Movie, SortOption, FilterGenre } from './types';

// Utils
export {
  filterMovies,
  sortMovies,
  getFavoriteCount,
  toggleFavorite,
} from './utils';
