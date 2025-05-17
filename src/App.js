import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerDashboard from './pages/SellerDashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CollectionRequests from './pages/CollectionRequests';
import UserProfile from './pages/UserProfile';
import Contact from './pages/Contact';
import AdminLayout from './layouts/AdminLayout';
import SellerLayout from './layouts/SellerLayout';

// Import seller pages
import ProductsManagement from './pages/seller/ProductsManagement';
import AddProduct from './pages/seller/AddProduct';
import EditProduct from './pages/seller/EditProduct';
import StoreSettings from './pages/seller/StoreSettings';

// Import admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsersManagement from './pages/admin/UsersManagement';
import AdminProductsManagement from './pages/admin/ProductsManagement';
import AdminCollectionRequestsManagement from './pages/admin/CollectionRequestsManagement';

// Layout component for public routes
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center">© 2024 EcoConnect - Promoting Sustainability</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes with AdminLayout */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersManagement />} />
          <Route path="collection-requests" element={<AdminCollectionRequestsManagement />} />
          <Route path="products" element={<AdminProductsManagement />} />
        </Route>
        
        {/* Seller Routes with SellerLayout */}
        <Route path="/seller-dashboard" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="store-settings" element={<StoreSettings />} />
        </Route>
        
        {/* Public Routes with Navbar */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
        <Route path="/products/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/collection-requests" element={<PublicLayout><CollectionRequests /></PublicLayout>} />
        <Route path="/profile" element={<PublicLayout><UserProfile /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
