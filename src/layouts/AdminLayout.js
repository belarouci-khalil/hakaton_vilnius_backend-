import React from 'react';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in or not an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm text-green-200 mt-1">Welcome, {user.name}</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 py-2 text-xs text-green-300 uppercase tracking-wider">
            Management
          </div>
          <NavLink 
            to="/admin-dashboard" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-green-700 ${isActive ? 'bg-green-700' : ''}`
            }
            end
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/admin-dashboard/users" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-green-700 ${isActive ? 'bg-green-700' : ''}`
            }
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Users
          </NavLink>
          
          <NavLink 
            to="/admin-dashboard/collection-requests" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-green-700 ${isActive ? 'bg-green-700' : ''}`
            }
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Collection Requests
          </NavLink>
          
          <NavLink 
            to="/admin-dashboard/products" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-green-700 ${isActive ? 'bg-green-700' : ''}`
            }
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Products
          </NavLink>
          
          <div className="px-4 py-2 mt-6 text-xs text-green-300 uppercase tracking-wider">
            Account
          </div>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-white hover:bg-green-700 ${isActive ? 'bg-green-700' : ''}`
            }
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </NavLink>
          
          <button 
            className="w-full flex items-center px-6 py-3 text-white hover:bg-green-700"
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

export default AdminLayout; 