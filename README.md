# 📦 Sheapit: Logistics Reimagined

**Sheapit** is a modern logistics management platform built with React, TypeScript, and Vite. This application focuses on streamlining supply chain tracking through a clean, component-based user interface.

---

## 🚀 Proposed Features

### 1. Real-Time Shipment Tracking
* **Live Map View:** Integration with mapping APIs to visualize package movement in real-time.
* **Status Timeline:** A vertical stepper component showing the package journey from "Warehouse" to "Delivered."

### 2. Fleet Management Dashboard
* **Driver Cards:** Reusable UI components displaying driver availability, current load, and performance ratings.
* **Vehicle Health Alerts:** Automated visual flags for maintenance based on mileage and diagnostic data.

### 3. Inventory & Warehousing
* **QR/Barcode Scanner:** Mobile-friendly interface for checking items into the hub using the device camera.
* **Low-Stock Notifications:** Declarative UI warnings when specific SKU levels drop below a set threshold.

### 4. Client Portal
* **Proof of Delivery (PoD):** Digital signature capture and photo upload functionality for completed deliveries.
* **Cost Calculator:** Dynamic forms to estimate shipping rates based on weight, dimensions, and destination.

---

## 🛠️ Tech Stack & Tooling

* **Core:** React + TypeScript
* **Build Tool:** Vite (Fast HMR)
* **Linter:** ESLint (Base-Strict configuration)
* **Formatter:** Prettier (Opinionated code styling)
* **Audit:** Depcheck (Dependency analysis)

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
│   ├── assets/         # Images, fonts, and other assets
│   ├── App.tsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tsconfig.app.json   # App-specific TypeScript config
├── tsconfig.node.json  # Node-specific TypeScript config
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
    port: 3000
  }
})
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

- [ ] Set up routing with React Router
- [ ] Implement authentication and authorization
- [ ] Add state management (Context API or external library)
- [ ] Integrate mapping APIs for shipment tracking
- [ ] Build fleet management components
- [ ] Create inventory management system
- [ ] Develop client portal features
- [ ] Add unit and integration tests
- [ ] Implement CI/CD pipeline
- [ ] Add comprehensive documentation

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.

---

Built with React, TypeScript, and Vite