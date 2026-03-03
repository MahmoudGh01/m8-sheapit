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
    <div
      style={{
        border: '2px solid #333',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        backgroundColor: '#1a1a1a',
        minWidth: '250px',
        maxWidth: '300px',
      }}
    >
      <div
        style={{
          fontSize: '48px',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        {movie.poster}
      </div>

      <h3 style={{ margin: '0 0 8px 0', color: '#fff' }}>{movie.title}</h3>

      <div style={{ color: '#999', fontSize: '14px', marginBottom: '8px' }}>
        {movie.year} • {movie.runtime} min
      </div>

      <div style={{ marginBottom: '8px' }}>
        <span style={{ color: '#ffd700', fontSize: '16px' }}>★</span>
        <span style={{ color: '#fff', marginLeft: '4px' }}>{movie.rating}</span>
      </div>

      <div style={{ marginBottom: '8px' }}>
        {movie.genre.map((g) => (
          <span
            key={g}
            style={{
              display: 'inline-block',
              backgroundColor: '#333',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            {g}
          </span>
        ))}
      </div>

      <p
        style={{
          color: '#ccc',
          fontSize: '14px',
          lineHeight: '1.4',
          marginBottom: '12px',
        }}
      >
        {movie.description.substring(0, 100)}...
      </p>

      <button
        type="button"
        onClick={() => onToggleFavorite(movie.id)}
        style={{
          backgroundColor: movie.isFavorite ? '#ff4444' : '#444',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          fontSize: '14px',
        }}
      >
        {movie.isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
      </button>
    </div>
  );
}
