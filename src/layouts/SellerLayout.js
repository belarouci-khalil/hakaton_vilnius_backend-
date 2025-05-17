import React from 'react';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SellerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in or not a seller
  if (!user || user.role !== 'seller') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Seller Dashboard</h2>
          <p className="text-sm text-blue-200 mt-1">Welcome, {user.name}</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 py-2 text-xs text-blue-300 uppercase tracking-wider">
            Products
          </div>
          <NavLink 
            to="/seller-dashboard" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`
            }
            end
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/seller-dashboard/products" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`
            }
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            My Products
          </NavLink>
          
          <NavLink 
            to="/seller-dashboard/add-product" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`
            }
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Product
          </NavLink>
          
          <div className="px-4 py-2 mt-6 text-xs text-blue-300 uppercase tracking-wider">
            Account
          </div>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`
            }
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </NavLink>
          
          <NavLink 
            to="/seller-dashboard/store-settings" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`
            }
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Store Settings
          </NavLink>
          
          <button 
            className="w-full flex items-center px-6 py-3 text-white hover:bg-blue-700"
            onClick={handleLogout}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SellerLayout; 