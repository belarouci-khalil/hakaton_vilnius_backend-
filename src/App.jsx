import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import AffiliateProgramPage from "./components/pages/AffiliateProgramPage";
import LoginPage from "./components/pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import TermsOfServicePage from "./components/pages/TermsOfServicePage";
import PrivacyPolicyPage from "./components/pages/PrivacyPolicyPage";
// Import other pages as needed

// Import our Auth Provider and RequireAuth
import { AuthProvider, RequireAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public routes with animated background */}
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/affiliate-program" element={<AffiliateProgramPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              {/* Add other public routes as needed */}
            </Route>

            {/* Protected Dashboard routes */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            
            <Route path="/dashboard/orders" element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            } />
          
            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App; 