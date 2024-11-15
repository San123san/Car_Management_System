import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken'); 
    if (accessToken) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      // Make a request to the backend to log out the user
      await axios.post('https://car-management-system-fyne-assessment.onrender.com/api/v1/users/logout', {}, { withCredentials: true });

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      setIsAuthenticated(false);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error during sign-out', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-lg font-semibold"
            style={({ isActive }) => isActive ? { textDecoration: 'underline' } : undefined}
          >
            Home
          </NavLink>

          {/* Conditionally render the "Your Product" link */}
          {isAuthenticated && (
            <NavLink
              to="/your-product"
              className="text-lg font-semibold"
              style={({ isActive }) => isActive ? { textDecoration: 'underline' } : undefined}
            >
              Your Product
            </NavLink>
          )}
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          {!isAuthenticated ? (
            <>
              <NavLink to="/sign-up" className="text-lg font-semibold">
                Sign Up
              </NavLink>
              <NavLink to="/sign-in" className="text-lg font-semibold">
                Sign In
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="text-lg font-semibold text-red-500 hover:underline"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <NavLink
            to="/"
            className="block text-lg font-semibold"
            onClick={() => setIsMenuOpen(false)}  // Close menu after selection
          >
            Home
          </NavLink>
          {/* Conditionally render the "Your Product" link */}
          {isAuthenticated && (
            <NavLink
              to="/your-product"
              className="block text-lg font-semibold"
              onClick={() => setIsMenuOpen(false)}  // Close menu after selection
            >
              Your Product
            </NavLink>
          )}
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/sign-up"
                className="block text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}  // Close menu after selection
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/sign-in"
                className="block text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}  // Close menu after selection
              >
                Sign In
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleSignOut();
              }}
              className="block text-lg font-semibold text-red-500">
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
