import { Film, Heart, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Button } from '../components/ui/button';

export function Layout(): React.JSX.Element {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string): boolean => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/favorites', label: 'MY LIST', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 border-b-2 border-primary'
            : 'bg-gradient-to-b from-background to-transparent'
        }`}
      >
        <div className="container-max container-padding">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <div className="size-8 sm:size-9 border-2 border-primary bg-background flex items-center justify-center">
                <Film className="size-4 sm:size-5 text-primary" />
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-widest uppercase">
                <span className="text-primary">SHEA</span>
                <span className="text-accent">PIT</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 border-2 ${
                    isActive(link.path)
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary/50'
                  }`}
                >
                  {link.icon && <link.icon className="size-3" />}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="sm:hidden size-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="container-padding pb-4 pt-2 space-y-1 border-t-2 border-primary bg-background">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-bold tracking-wider transition-all border-2 ${
                  isActive(link.path)
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-transparent text-muted-foreground hover:text-primary'
                }`}
              >
                {link.icon && <link.icon className="size-4" />}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 sm:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container-max container-padding py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Film className="size-4 text-primary" />
              <span className="text-sm font-bold tracking-wider">
                <span className="text-primary">SHEA</span>
                <span className="text-accent">PIT</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground">
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
