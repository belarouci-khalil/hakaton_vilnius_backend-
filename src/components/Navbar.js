import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAdmin, isSeller } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-green-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white font-bold text-xl">EcoConnect</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/products" className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link to="/collection-requests" className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium">
                Collection
              </Link>
              <Link to="/contact" className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link 
                    to="/admin-dashboard" 
                    className="bg-green-700 text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                {isSeller && (
                  <Link 
                    to="/seller-dashboard" 
                    className="bg-green-700 text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Seller Dashboard
                  </Link>
                )}
                
                <div className="relative">
                  <div className="flex items-center">
                    <span className="text-white mr-2">{user.name}</span>
                    <Link 
                      to="/profile" 
                      className="bg-green-700 text-white hover:bg-green-600 p-1 rounded-full"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-green-800 hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-200 focus:outline-none"
            >
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
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/collection-requests" 
            className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Collection
          </Link>
          <Link 
            to="/contact" 
            className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-green-700">
          {user ? (
            <div className="space-y-1">
              <div className="px-3 py-2 text-white font-medium">
                {user.name}
              </div>
              
              {isAdmin && (
                <Link 
                  to="/admin-dashboard" 
                  className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              
              {isSeller && (
                <Link 
                  to="/seller-dashboard" 
                  className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Seller Dashboard
                </Link>
              )}
              
              <Link 
                to="/profile" 
                className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link 
                to="/login" 
                className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block px-3 py-2 text-white hover:bg-green-700 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 