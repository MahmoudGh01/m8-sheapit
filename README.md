# Sheapit Movies

A movies and TV shows content explorer built with React, TypeScript, and Vite. Browse, discover, and track your favorite movies and TV shows with an intuitive, modern interface.

## Project Description

A personal project to explore and manage movies and TV shows. Users can browse content, search for titles, filter by categories, and maintain a collection of favorites. This application demonstrates modern React patterns, TypeScript usage, and component-based architecture.

## Features

### Implemented (Phase 1)

- Browse Content: View a collection of movies with poster cards
- Search Functionality: Find content by title with real-time filtering
- Filter & Sort: Filter by genre, sort by title/year/rating
- Favorites: Save and manage favorite movies
- Loading States: Proper loading, error, and empty state handling
- Data Fetching: TanStack Query with caching and automatic refetching

### Planned (Phase 2+)

- Detail View: Comprehensive information about each title
- Watch History: Track watched content with timestamps
- Collections: Create custom collections
- External API Integration: Connect to TMDB for real data
- Dark/Light Theme: Toggle between themes

## Tech Stack

| Category      | Technology                          |
| ------------- | ----------------------------------- |
| Core          | React 19, TypeScript 5.8            |
| Build         | Vite 6                              |
| Styling       | Tailwind CSS, shadcn/ui             |
| Data Fetching | TanStack Query v5                   |
| Routing       | React Router v7                     |
| Testing       | Vitest, React Testing Library       |
| Linting       | ESLint (strict), Prettier, Depcheck |

## Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives (Button, Card, etc.)
│   ├── MovieCard.tsx    # Movie poster card
│   ├── MovieList.tsx    # Grid of movie cards
│   ├── SearchBar.tsx    # Search input
│   └── FilterControls.tsx
├── context/             # React Context providers
│   └── MovieContext.tsx # Global movie state
├── hooks/               # Custom React hooks
│   └── useMoviesData.ts # TanStack Query data hooks
├── services/            # API service layer
│   └── movieService.ts  # Data fetching functions
├── pages/               # Page components
│   ├── Home.tsx         # Main browse page
│   └── Favorites.tsx    # Favorites page
├── layouts/             # Layout components
│   └── Layout.tsx       # App shell with navigation
├── types/               # TypeScript type definitions
│   └── movie.ts         # Movie, SortOption, FilterGenre types
├── utils/               # Pure utility functions
│   └── movieUtils.ts    # Filter, sort, toggle functions
├── data/                # Mock data
│   └── movies.ts        # Sample movie data
├── test/                # Test utilities
│   └── testUtils.tsx    # Test wrappers and helpers
└── App.tsx              # Root component with providers
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA FLOW                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   services/movieService.ts                                      │
│   └── Async functions: fetchMovies(), searchMovies()            │
│              ↓                                                  │
│   hooks/useMoviesData.ts                                        │
│   └── TanStack Query hooks with caching                         │
│              ↓                                                  │
│   context/MovieContext.tsx                                      │
│   └── Combines server state + client state (favorites)          │
│              ↓                                                  │
│   pages/Home.tsx, Favorites.tsx                                 │
│   └── Container components with local UI state                  │
│              ↓                                                  │
│   components/MovieList.tsx, MovieCard.tsx                       │
│   └── Presentational components (render only)                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Patterns

- **Services-Hooks-Strategy**: API calls are isolated in services, wrapped by TanStack Query hooks
- **Smart/Dumb Components**: Pages orchestrate state; components are presentational
- **Separation of Concerns**: Business logic in utils, rendering in components, state in context
- **Type Safety**: Strict TypeScript with pre-defined types for all data structures

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

| Script                  | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| `npm run dev`           | Start development server                                   |
| `npm run build`         | Create production build                                    |
| `npm run preview`       | Preview production build                                   |
| `npm run lint`          | Run all linters (typecheck + eslint + prettier + depcheck) |
| `npm run format`        | Auto-format code with Prettier                             |
| `npm run test`          | Run tests in watch mode                                    |
| `npm run test:run`      | Run tests once                                             |
| `npm run test:coverage` | Run tests with coverage report                             |

## Testing

Tests are co-located with source files (e.g., `MovieCard.test.tsx` next to `MovieCard.tsx`).

### Running Tests

```bash
# Watch mode (recommended for development)
npm run test

# Single run (used in CI)
npm run test:run

# With coverage
npm run test:coverage
```

### Test Utilities

Test utilities are in `src/test/testUtils.tsx`:

```typescript
import { renderWithProviders } from '../test/testUtils';

// Wraps component with QueryClient + Router + MovieProvider
renderWithProviders(<MyComponent />);
```

### Current Coverage

- 115 tests across 10 test files
- Components, context, utils, and pages covered

## Code Quality

### Linting

The project uses a comprehensive linting setup:

```bash
npm run lint
```

This runs:

1. `tsc --noEmit` - TypeScript type checking
2. `eslint .` - Code quality rules
3. `prettier --check .` - Format checking
4. `depcheck .` - Unused dependency detection

### TypeScript

Strict mode is enabled with additional checks:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

## CI/CD

### Continuous Integration

On every push to `main`:

1. Install dependencies
2. Run lint (typecheck + eslint + prettier + depcheck)
3. Run all tests
4. Build production bundle

### Continuous Deployment

After CI passes, the app is automatically deployed to GitHub Pages.

**Live URL**: `https://<username>.github.io/m8-sheapit/`

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow TypeScript strict mode conventions
- Implement proper type definitions for all props and state
- Use meaningful variable and function names

### Component Guidelines

- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Use proper prop typing with TypeScript types
- Co-locate tests with components

### Commit Convention

Follow conventional commit format:

| Prefix      | Description                      |
| ----------- | -------------------------------- |
| `feat:`     | New features                     |
| `fix:`      | Bug fixes                        |
| `docs:`     | Documentation changes            |
| `style:`    | Code style changes               |
| `refactor:` | Code refactoring                 |
| `test:`     | Test additions or modifications  |
| `chore:`    | Build process or tooling changes |

## Troubleshooting

### Port Already in Use

Vite will automatically try the next available port. To specify a different port:

```typescript
// vite.config.ts
export default defineConfig({
  server: { port: 3000 },
});
```

### TypeScript Errors in VS Code

Select the workspace TypeScript version:

- Cmd/Ctrl + Shift + P
- "TypeScript: Select TypeScript Version"
- "Use Workspace Version"

### Test Failures After Adding QueryClient

Ensure components using `MovieContext` are wrapped with `QueryClientProvider`:

```typescript
import { renderWithProviders } from '../test/testUtils';
renderWithProviders(<ComponentUsingMovieContext />);
```

## Browser Support

Modern browsers with ES6+ support:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

---

Built with React, TypeScript, and Vite
