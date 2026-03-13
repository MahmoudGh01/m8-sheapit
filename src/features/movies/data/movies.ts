import { type Movie } from '../types';

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'The Matrix',
    year: 1999,
    genre: ['sci-fi', 'action'],
    rating: 8.7,
    runtime: 136,
    description:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster: '🎭',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    genre: ['sci-fi', 'thriller'],
    rating: 8.8,
    runtime: 148,
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
    poster: '🌀',
    isFavorite: false,
  },
  {
    id: 3,
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: ['drama'],
    rating: 9.3,
    runtime: 142,
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: '🔒',
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    year: 1994,
    genre: ['drama', 'thriller'],
    rating: 8.9,
    runtime: 154,
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    poster: '💼',
    isFavorite: false,
  },
  {
    id: 5,
    title: 'The Dark Knight',
    year: 2008,
    genre: ['action', 'thriller'],
    rating: 9.0,
    runtime: 152,
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.',
    poster: '🦇',
    isFavorite: false,
  },
  {
    id: 6,
    title: 'Forrest Gump',
    year: 1994,
    genre: ['drama', 'comedy'],
    rating: 8.8,
    runtime: 142,
    description:
      'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.',
    poster: '🏃',
    isFavorite: false,
  },
  {
    id: 7,
    title: 'Goodfellas',
    year: 1990,
    genre: ['drama', 'thriller'],
    rating: 8.7,
    runtime: 146,
    description:
      'The story of Henry Hill and his life in the mob, covering his relationship with his wife and his partners in crime.',
    poster: '🔫',
    isFavorite: false,
  },
  {
    id: 8,
    title: 'Interstellar',
    year: 2014,
    genre: ['sci-fi', 'drama'],
    rating: 8.6,
    runtime: 169,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: '🚀',
    isFavorite: false,
  },
];
