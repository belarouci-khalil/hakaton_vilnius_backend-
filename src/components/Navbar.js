import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAdmin, isSeller } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-green-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <span className="mr-2">🌱</span>
          <p>Join our eco-friendly community and make a difference today!</p>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white bg-opacity-95 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M15.312 4.688a8.002 8.002 0 00-11.313 0A7.998 7.998 0 001 10c0 2.945 1.6 5.518 3.99 6.893A8.003 8.003 0 0010 18c2.122 0 4.078-.828 5.523-2.227A7.998 7.998 0 0019 10a7.998 7.998 0 00-3.688-5.312zM10 16a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    Eco<span className="text-green-600">Connect</span>
                  </span>
                </Link>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-6">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/products', label: 'Products' },
                  { path: '/collection-requests', label: 'Collection' },
                  { path: '/contact', label: 'Contact' }
                ].map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                      isActivePath(path)
                        ? 'text-green-700 bg-green-50 hover:bg-green-100'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Link 
                      to="/admin-dashboard" 
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  
                  {isSeller && (
                    <Link 
                      to="/seller-dashboard" 
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  
                  <div className="relative group">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{user.name}</span>
                      </div>
                      <Link 
                        to="/profile" 
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
              >
                <span className="sr-only">Open main menu</span>
                <svg 
                  className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg 
                  className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden border-t border-gray-200`}>
          <div className="pt-2 pb-3 space-y-1 bg-white">
            {[
              { path: '/', label: 'Home' },
              { path: '/products', label: 'Products' },
              { path: '/collection-requests', label: 'Collection' },
              { path: '/contact', label: 'Contact' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-4 py-2 text-base font-medium ${
                  isActivePath(path)
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
            {user ? (
              <div className="space-y-1">
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                </div>
                
                {isAdmin && (
                  <Link 
                    to="/admin-dashboard" 
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                {isSeller && (
                  <Link 
                    to="/seller-dashboard" 
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Seller Dashboard
                  </Link>
                )}
                
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-4 py-2">
                <Link 
                  to="/login" 
                  className="block text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block text-base font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar; 