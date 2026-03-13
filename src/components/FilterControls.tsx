import { type SortOption, type FilterGenre } from '../types/movie';

type FilterControlsProps = {
  sortBy: SortOption;
  genre: FilterGenre;
  favoriteCount: number;
  onSortChange: (sort: SortOption) => void;
  onGenreChange: (genre: FilterGenre) => void;
};

const genres: Array<{ value: FilterGenre; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'thriller', label: 'Thriller' },
];

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'title', label: 'A-Z' },
  { value: 'year', label: 'Year' },
  { value: 'rating', label: 'Rating' },
];

export function FilterControls({
  sortBy,
  genre,
  onSortChange,
  onGenreChange,
}: FilterControlsProps): React.JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Genre Filters */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400 font-medium mr-2">Genre:</span>
        {genres.map((g) => (
          <button
            key={g.value}
            onClick={() => onGenreChange(g.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              genre === g.value
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-gray-700"></div>

      {/* Sort Options */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400 font-medium mr-2">Sort:</span>
        {sortOptions.map((s) => (
          <button
            key={s.value}
            onClick={() => onSortChange(s.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              sortBy === s.value
                ? 'bg-white text-black shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
