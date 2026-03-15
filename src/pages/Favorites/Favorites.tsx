import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { MovieList, useMovies } from '../../features/movies';

export function Favorites(): React.JSX.Element {
  const { movies, toggleFavorite, isLoading, isError } = useMovies();
  const favoriteMovies = movies.filter((m) => m.isFavorite);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Button size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container-max container-padding py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <h1 className="text-xl font-semibold mb-6">
        Favorites {favoriteMovies.length > 0 && `(${favoriteMovies.length})`}
      </h1>

      {favoriteMovies.length === 0 ? (
        <p className="text-muted-foreground">
          No favorites yet.{' '}
          <Link to="/" className="text-primary hover:underline">
            Browse movies
          </Link>
        </p>
      ) : (
        <MovieList movies={favoriteMovies} onToggleFavorite={toggleFavorite} />
      )}
    </div>
  );
}
