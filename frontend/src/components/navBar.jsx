import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Moon, Sun, Menu } from 'lucide-react';

export function Navbar({ isDark, toggleTheme }) {
  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple animate-gradient-x">
                ConnectSphere
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/features" 
              className="text-gray-300 hover:text-neon-blue transition-colors duration-300 px-4 py-2"
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-300 hover:text-neon-blue transition-colors duration-300 px-4 py-2"
            >
              Pricing
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center rounded-md font-medium bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition-all duration-300 hover:shadow-neon-blue h-10 px-4"
            >
              Login
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-neon-blue hover:bg-neon-blue/10 transition-colors duration-300"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md text-neon-blue hover:bg-neon-blue/10 transition-colors duration-300">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}