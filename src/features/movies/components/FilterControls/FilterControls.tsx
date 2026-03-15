import { SlidersHorizontal } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { type FilterGenre, type SortOption } from '../../types';

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
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {/* Filter Icon */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
        <SlidersHorizontal className="size-3.5 sm:size-4" />
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest hidden sm:inline">
          // Filters
        </span>
      </div>

      {/* Divider */}
      <div className="w-0.5 h-5 sm:h-6 bg-primary hidden sm:block" />

      {/* Genre Filters */}
      <div className="flex items-center gap-1 flex-wrap">
        {genres.map((g) => (
          <Button
            key={g.value}
            variant={genre === g.value ? 'default' : 'outline'}
            size="xs"
            onClick={() => onGenreChange(g.value)}
            className="text-[10px] sm:text-xs px-1.5 sm:px-2 h-6 sm:h-7"
          >
            {g.label}
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-0.5 h-5 sm:h-6 bg-accent hidden lg:block" />

      {/* Sort Options */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] sm:text-xs text-accent uppercase tracking-widest mr-0.5 sm:mr-1 hidden lg:inline">
          Sort:
        </span>
        {sortOptions.map((s) => (
          <Button
            key={s.value}
            variant={sortBy === s.value ? 'accent' : 'ghost'}
            size="xs"
            onClick={() => onSortChange(s.value)}
            className="text-[10px] sm:text-xs px-1.5 sm:px-2 h-6 sm:h-7"
          >
            {s.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
