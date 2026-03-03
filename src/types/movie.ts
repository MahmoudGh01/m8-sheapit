export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  runtime: number;
  description: string;
  poster: string;
  isFavorite: boolean;
};

export type SortOption = 'title' | 'year' | 'rating';
export type FilterGenre =
  | 'all'
  | 'action'
  | 'comedy'
  | 'drama'
  | 'sci-fi'
  | 'thriller';
