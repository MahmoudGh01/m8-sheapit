import { Film, Play, Star } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

import {
  FilterControls,
  filterMovies,
  getFavoriteCount,
  MovieList,
  SearchBar,
  sortMovies,
  useMovies,
  type FilterGenre,
  type SortOption,
} from '../../features/movies';

export function Home(): React.JSX.Element {
  const { movies, toggleFavorite, isLoading, isError } = useMovies();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [genre, setGenre] = useState<FilterGenre>('all');

  const displayedMovies = useMemo(() => {
    const filtered = filterMovies(movies, searchTerm, genre);
    return sortMovies(filtered, sortBy);
  }, [movies, searchTerm, genre, sortBy]);

  const favoriteCount = useMemo(() => getFavoriteCount(movies), [movies]);
  const featuredMovie = movies.find((m) => m.isFavorite) ?? movies[0];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="size-12 sm:size-16 border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4">
          <p className="text-lg sm:text-xl text-destructive mb-4 uppercase tracking-wider">
            // Error
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Unable to load movies.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4">
          <Film className="size-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No movies available.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          {featuredMovie && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <span className="text-[10rem] sm:text-[16rem] lg:text-[20rem] select-none">
                {featuredMovie.poster}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-max container-padding py-12 sm:py-16">
          {featuredMovie && (
            <div className="max-w-xl">
              <Badge variant="warning" className="gap-1 mb-4 text-xs">
                <Star className="size-3 fill-current" />
                {featuredMovie.rating}
              </Badge>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 uppercase tracking-wider">
                {featuredMovie.title}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                {featuredMovie.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {featuredMovie.genre.slice(0, 2).map((g) => (
                  <Badge
                    key={g}
                    variant="outline"
                    className="uppercase text-xs"
                  >
                    {g}
                  </Badge>
                ))}
                <span className="text-xs text-muted-foreground flex items-center">
                  {featuredMovie.year} · {featuredMovie.runtime}min
                </span>
              </div>

              <Button variant="neon" className="gap-2">
                <Play className="size-4 fill-current" />
                Play
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-16 sm:top-20 z-40 bg-background/95 backdrop-blur-sm border-y border-border">
        <div className="container-max container-padding py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterControls
              sortBy={sortBy}
              genre={genre}
              favoriteCount={favoriteCount}
              onSortChange={setSortBy}
              onGenreChange={setGenre}
            />
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="container-max container-padding py-8 sm:py-12">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground uppercase tracking-wider">
              {genre === 'all' ? 'All Movies' : genre}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {displayedMovies.length} title
              {displayedMovies.length !== 1 ? 's' : ''}
            </p>
          </div>
          {favoriteCount > 0 && (
            <span className="text-xs text-primary uppercase tracking-wider">
              {favoriteCount} saved
            </span>
          )}
        </div>

        <MovieList movies={displayedMovies} onToggleFavorite={toggleFavorite} />
      </section>
    </>
  );
}
