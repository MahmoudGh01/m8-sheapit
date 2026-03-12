import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Film,
  Heart,
  Search,
  Bell,
  User,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react';

import { SearchBar } from '../components/SearchBar';

export function Layout(): React.JSX.Element {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Netflix-style Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent">
        <div className="px-6 md:px-16 lg:px-20 py-6">
          <div className="flex items-center justify-between">
            {/* Logo & Nav */}
            <div className="flex items-center gap-12">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 blur-lg opacity-50 group-hover:opacity-70 transition"></div>
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
                    <Film className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-black text-red-600 tracking-tighter">
                  SHEAPIT
                </h1>
              </Link>
              <nav className="hidden md:flex items-center gap-8 text-sm">
                <Link
                  to="/"
                  className={`font-medium transition relative ${
                    isActive('/')
                      ? 'text-white after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-red-600 after:to-pink-600'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/favorites"
                  className={`font-medium transition relative flex items-center gap-2 ${
                    isActive('/favorites')
                      ? 'text-white after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-red-600 after:to-pink-600'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  My List
                </Link>
                <button className="text-gray-400 hover:text-gray-300 transition">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </div>
                </button>
                <button className="text-gray-400 hover:text-gray-300 transition">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                  </div>
                </button>
                <button className="text-gray-400 hover:text-gray-300 transition">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Top Rated
                  </div>
                </button>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:text-gray-300 transition"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-gray-300 transition">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-gray-300 transition">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Bar (Expandable) */}
          {showSearch && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Add padding for fixed header */}
      <div className="pt-20">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 md:px-16 lg:px-20 py-16 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-red-600 font-black text-2xl mb-6">SHEAPIT</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your premium streaming destination
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">
                Navigation
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition cursor-pointer"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="hover:text-white transition cursor-pointer"
                  >
                    My List
                  </Link>
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Movies
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  TV Shows
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white transition cursor-pointer">
                  Help Center
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Contact Us
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Account
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white transition cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Terms
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Cookies
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              © 2026 Sheapit. All rights reserved. React • TypeScript • Vite
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
