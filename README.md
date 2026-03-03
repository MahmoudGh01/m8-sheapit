# 🎬 Sheapit Movies

**Sheapit Movies** is a movies and TV shows content explorer built with React, TypeScript, and Vite. Browse, discover, and track your favorite movies and TV shows with an intuitive, modern interface.

---

## 📝 Project Description

A personal project to explore and manage movies and TV shows. Users can browse content, search for titles, filter by categories, and maintain a collection of favorites. This application demonstrates modern React patterns, TypeScript usage, and component-based architecture.

## ✨ Potential Features

### Core Features (Phase 1)

- **Browse Content**: View a collection of movies and TV shows
- **Search Functionality**: Find content by title
- **Filter & Sort**: Filter by genre, year, rating; sort by various criteria
- **Detail View**: See comprehensive information about each title
- **Favorites**: Save and manage favorite movies and TV shows

### Enhanced Features (Phase 2)

- **Watch History**: Track watched content with timestamps
- **Ratings**: Rate movies and shows personally
- **Collections**: Create custom collections (e.g., "To Watch", "Classics")
- **Recommendations**: Get personalized recommendations based on favorites
- **Statistics**: View viewing statistics and insights

### Advanced Features (Phase 3)

- **External API Integration**: Connect to TMDB or similar APIs for real data
- **User Authentication**: Save preferences across devices
- **Social Features**: Share favorites and reviews
- **Advanced Search**: Multi-criteria search with filters
- **Dark/Light Theme**: Toggle between themes with preference persistence

---

## 🛠️ Tech Stack & Tooling

- **Core:** React + TypeScript
- **Build Tool:** Vite (Fast HMR)
- **Linter:** ESLint (Base-Strict configuration)
- **Formatter:** Prettier (Opinionated code styling)
- **Audit:** Depcheck (Dependency analysis)

---

## 🏁 Getting Started

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

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
m8-sheapit/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── utils/          # Utility functions and helpers
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Mock data and constants
│   ├── App.tsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow TypeScript strict mode conventions
- Implement proper type definitions for all props and state
- Use meaningful variable and function names

### Component Structure

- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Use proper prop typing with TypeScript interfaces

### Performance

- Utilize React.memo for expensive components
- Implement code splitting for route-based components
- Optimize bundle size with dynamic imports

## Configuration

### TypeScript

The project uses three TypeScript configuration files:

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node/build tool settings

### Vite

Vite configuration is in `vite.config.ts`. Key features:

- React plugin with Fast Refresh
- Optimized build settings
- Development server configuration

### ESLint

ESLint is configured in `eslint.config.js` with:

- TypeScript support
- React-specific rules
- React Hooks rules
- React Fast Refresh validation

## Browser Support

This project targets modern browsers with ES6+ support:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

Follow conventional commit format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Build process or tooling changes

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can specify a different port in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3000,
  },
});
```

### TypeScript Errors

Ensure you're using the workspace version of TypeScript:

- In VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Select TypeScript Version" → "Use Workspace Version"

### Node Version Issues

If you encounter build issues, verify your Node.js version:

```bash
node --version
```

The project requires Node.js 18 or higher.

## Roadmap

### Phase 1: Core View (Current)

- [x] Project setup with Vite, TypeScript, React
- [x] Linting tooling (ESLint, Prettier, Depcheck)
- [ ] Core view with multiple components
- [ ] Browse movies and TV shows
- [ ] Search functionality
- [ ] Basic filtering

### Phase 2: Enhanced UI

- [ ] Detailed view for individual content
- [ ] Favorites management
- [ ] Improved styling and layout
- [ ] Responsive design

### Phase 3: Data & Persistence

- [ ] External API integration
- [ ] Local storage for favorites
- [ ] User preferences
- [ ] Advanced filtering and sorting

### Phase 4: Advanced Features

- [ ] User authentication
- [ ] Collections and lists
- [ ] Recommendations engine
- [ ] Statistics and insights

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.

---

Built with React, TypeScript, and Vite
