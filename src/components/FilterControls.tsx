import { type SortOption, type FilterGenre } from '../types/movie';

type FilterControlsProps = {
  sortBy: SortOption;
  genre: FilterGenre;
  favoriteCount: number;
  onSortChange: (sort: SortOption) => void;
  onGenreChange: (genre: FilterGenre) => void;
};

export function FilterControls({
  sortBy,
  genre,
  favoriteCount,
  onSortChange,
  onGenreChange,
}: FilterControlsProps): React.JSX.Element {
  const selectStyle = {
    padding: '10px 12px',
    fontSize: '14px',
    border: '2px solid #444',
    borderRadius: '6px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    marginRight: '12px',
    cursor: 'pointer',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px',
      }}
    >
      <div>
        <label
          htmlFor="sort-select"
          style={{ color: '#999', marginRight: '8px', fontSize: '14px' }}
        >
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          style={selectStyle}
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="genre-select"
          style={{ color: '#999', marginRight: '8px', fontSize: '14px' }}
        >
          Genre:
        </label>
        <select
          id="genre-select"
          value={genre}
          onChange={(e) => onGenreChange(e.target.value as FilterGenre)}
          style={selectStyle}
        >
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="thriller">Thriller</option>
        </select>
      </div>

      <div
        style={{
          marginLeft: 'auto',
          padding: '10px 16px',
          backgroundColor: '#ff4444',
          borderRadius: '6px',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        ❤️ Favorites: {favoriteCount}
      </div>
    </div>
  );
}
