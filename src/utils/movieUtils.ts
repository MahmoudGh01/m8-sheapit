import { type Movie, type SortOption, type FilterGenre } from '../types/movie';

export function filterMovies(
  movies: Movie[],
  searchTerm: string,
  genre: FilterGenre
): Movie[] {
  let filtered = movies;

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by genre
  if (genre !== 'all') {
    filtered = filtered.filter((movie) => movie.genre.includes(genre));
  }

  return filtered;
}

export function sortMovies(movies: Movie[], sortBy: SortOption): Movie[] {
  const sorted = [...movies];

  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'year':
      return sorted.sort((a, b) => b.year - a.year);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export function getFavoriteCount(movies: Movie[]): number {
  return movies.filter((movie) => movie.isFavorite).length;
}

export function toggleFavorite(movies: Movie[], movieId: number): Movie[] {
  return movies.map((movie) =>
    movie.id === movieId ? { ...movie, isFavorite: !movie.isFavorite } : movie
  );
}
