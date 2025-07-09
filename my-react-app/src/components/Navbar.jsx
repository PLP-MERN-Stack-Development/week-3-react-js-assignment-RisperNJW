import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

const Navbar = () => {
  const { darkMode } = useTheme();
  const { pathname } = useLocation();

  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-teal-600'} text-white shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold hover:text-teal-200 transition-colors"
          >
            TaskApp
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <NavLink to="/" currentPath={pathname}>Home</NavLink>
            <NavLink to="/tasks" currentPath={pathname}>Tasks</NavLink>
            <NavLink to="/users" currentPath={pathname}>Users</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ to, currentPath, children }) => {
  const isActive = currentPath === to;
  const { darkMode } = useTheme();

  return (
    <Link
      to={to}
      className={`px-3 py-2 text-sm font-medium hover:text-teal-200 transition-colors ${
        isActive 
          ? `border-b-2 ${darkMode ? 'border-teal-400' : 'border-white'}`
          : 'text-gray-200'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;