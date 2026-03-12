import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarProps): React.JSX.Element {
  return (
    <div className="relative max-w-3xl">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Search titles, genres, actors..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full h-16 pl-14 pr-14 bg-black/50 backdrop-blur-xl border-2 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 text-base rounded-xl transition-all"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-700 rounded-full transition"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>
  );
}
