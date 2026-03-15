import { Search, X } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarProps): React.JSX.Element {
  return (
    <div className="relative w-full sm:max-w-md lg:max-w-xl">
      <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-primary">
        <Search className="size-3.5 sm:size-4" />
      </div>
      <Input
        type="text"
        placeholder="> Search movies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="neon"
        className="w-full h-9 sm:h-11 pl-8 sm:pl-10 pr-8 sm:pr-10 text-xs sm:text-sm"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => onSearchChange('')}
          className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2"
        >
          <X className="size-3.5 sm:size-4" />
        </Button>
      )}
    </div>
  );
}
