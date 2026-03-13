/**
 * DATA FETCHING EXAMPLES
 *
 * This file demonstrates different data fetching patterns in React
 * as outlined in the curriculum.
 */

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// ==============================================================================
// 1. USING FETCH
// ==============================================================================

/**
 * 1.1 Basic fetch in a component using useEffect
 *
 * Pattern:
 * - Side effect goes in useEffect
 * - Effect function must be sync
 * - Need one layer of abstraction for async
 * - Store result in state
 */
interface Data {
  id: number;
  title: string;
}

export const BasicFetchExample = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data.length === 0) return <div>No data</div>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

// ==============================================================================
// 2. USING React.use() (React 19+)
// ==============================================================================

/**
 * NOTE: React.use() is a React 19 feature that may not be fully stable yet.
 * The examples below demonstrate the pattern, but use with caution.
 * For production apps, prefer TanStack Query or useEffect patterns.
 */

/*
// Example with useRef (requires React 19)
const fetchData = async (): Promise<Data[]> => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
};

export const UseWithRefExample = () => {
  const promiseRef = useRef<Promise<Data[]>>();
  
  if (!promiseRef.current) {
    promiseRef.current = fetchData();
  }

  const data = use(promiseRef.current);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

// Example with useState (requires React 19)
export const UseWithStateExample = () => {
  const [promise, setPromise] = useState<Promise<Data[]>>();

  useEffect(() => {
    setPromise(fetchData());
  }, []);

  if (!promise) return <div>Initializing...</div>;

  const data = use(promise);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
*/

// ==============================================================================
// 3. DATA STATES
// ==============================================================================

/**
 * 3.1 Comprehensive data states for good UX
 *
 * States to handle:
 * 1. Success with data
 * 2. Error
 * 3. Success with no data (empty state)
 * 4. Waiting for response (loading)
 * 5. Waiting for new response (revalidating)
 */
export const DataStatesExample = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (isRefetch = false) => {
    if (isRefetch) {
      setIsRevalidating(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
      setIsRevalidating(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // State 4: Waiting for initial response
  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // State 2: Error
  if (error) {
    return (
      <div className="error-state">
        <h2>Error</h2>
        <p>{error.message}</p>
        <button onClick={() => fetchData()}>Retry</button>
      </div>
    );
  }

  // State 3: Success with no data
  if (data.length === 0) {
    return (
      <div className="empty-state">
        <p>No data available</p>
      </div>
    );
  }

  // State 1: Success with data
  // State 5: Revalidating (show data + indicator)
  return (
    <div>
      {isRevalidating && (
        <div className="revalidating-indicator">Updating...</div>
      )}
      <button onClick={() => fetchData(true)}>Refresh</button>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

// ==============================================================================
// 4. SERVICES PATTERN
// ==============================================================================

/**
 * 4.1 Service layer - Standalone API functions
 *
 * Benefits:
 * - Independent and testable
 * - Abstract implementation details
 * - Can be easily mocked
 * - Reusable across components
 *
 * See: src/services/movieService.ts for full implementation
 */

// Service file example structure:
/*
// movieService.ts
export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await fetch('/api/movies');
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const response = await fetch(`/api/movies/${id}`);
  if (!response.ok) throw new Error('Failed to fetch movie');
  return response.json();
};
*/

// ==============================================================================
// 5. SERVICES AS HOOKS
// ==============================================================================

/**
 * 5.1 Custom hooks wrapping services
 *
 * Benefits:
 * - Encapsulate fetching logic
 * - Handle loading/error states
 * - Easy to use in components
 * - Can use TanStack Query or custom implementation
 */

// Custom hook without TanStack Query
export const useMoviesBasic = () => {
  const [movies, setMovies] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/movies');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, isLoading, error };
};

// Using the custom hook
export const MoviesComponent = () => {
  const { movies, isLoading, error } = useMoviesBasic();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

// ==============================================================================
// 6. TANSTACK QUERY
// ==============================================================================

/**
 * 6.1 Using TanStack Query (Recommended approach)
 *
 * Benefits:
 * - Automatic caching
 * - Background refetching
 * - Automatic retries
 * - Loading and error states
 * - Optimistic updates
 * - Request deduplication
 *
 * See: src/hooks/useMoviesData.ts for full implementation
 */

// Hook using TanStack Query
export const useMoviesTanStack = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await fetch('/api/movies');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Using TanStack Query hook
export const MoviesWithTanStack = () => {
  const { data: movies, isLoading, isError, error } = useMoviesTanStack();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!movies || movies.length === 0) return <div>No movies</div>;

  return (
    <div>
      {movies.map((movie: Data) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

// ==============================================================================
// SUMMARY
// ==============================================================================

/**
 * BEST PRACTICES:
 *
 * 1. Use service layer for API calls (independent functions)
 * 2. Wrap services in custom hooks (Services as Hooks pattern)
 * 3. Use TanStack Query for automatic caching and state management
 * 4. Always handle all data states:
 *    - Loading (initial)
 *    - Error
 *    - Empty (no data)
 *    - Success (with data)
 *    - Revalidating (background refetch)
 * 5. Keep business logic in services, not components
 * 6. Make services testable and mockable
 *
 * ARCHITECTURE:
 *
 * Component -> Custom Hook -> Service -> API
 *     ↓           ↓             ↓
 *   UI Logic   State Mgmt   Data Fetch
 *
 * Example:
 * HomePage -> useMoviesData -> fetchMovies -> fetch()
 */
