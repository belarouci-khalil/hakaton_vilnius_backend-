import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the auth context
const AuthContext = createContext();

// API base URL - use environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Static users for authentication
const staticUsers = [
  {
    _id: 'admin-1',
    username: 'admin',
    email: 'admin@ecoconnect.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    _id: 'seller-1',
    username: 'ecoSeller',
    email: 'seller@ecoconnect.com',
    password: 'seller123',
    role: 'seller'
  }
];

// Static collection requests
const staticCollectionRequests = [
  {
    id: 'request-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    address: '123 Green Street',
    city: 'Ecoville',
    postalCode: '12345',
    materials: ['plastic', 'paper', 'glass'],
    quantity: '3',
    weight: '15.5',
    description: 'Monthly recycling collection, mostly packaging materials from online orders.',
    preferredDate: '2023-12-10',
    preferredTime: 'morning',
    status: 'pending',
    createdAt: '2023-12-01T10:30:00Z',
    userId: 'user-1'
  },
  {
    id: 'request-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '555-987-6543',
    address: '456 Sustainable Avenue',
    city: 'Greentown',
    postalCode: '54321',
    materials: ['electronics', 'batteries'],
    quantity: '1',
    weight: '8.2',
    description: 'Old laptop, smartphone, and several used batteries for proper disposal.',
    preferredDate: '2023-12-15',
    preferredTime: 'afternoon',
    status: 'approved',
    createdAt: '2023-12-02T14:15:00Z',
    userId: 'user-2'
  },
  {
    id: 'request-3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael@example.com',
    phone: '555-456-7890',
    address: '789 Recycling Road',
    city: 'Ecoville',
    postalCode: '12345',
    materials: ['furniture', 'textiles'],
    quantity: '4',
    weight: '75',
    description: 'Moving out, have old sofa, chair, and several bags of clothes for donation or recycling.',
    preferredDate: '2023-12-18',
    preferredTime: 'evening',
    status: 'completed',
    createdAt: '2023-12-03T09:45:00Z',
    userId: 'user-3'
  }
];

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(staticUsers);
  const [products, setProducts] = useState([
    {
      id: 'eco-tech-1',
      name: 'SolarLeaf Portable Solar Charger',
      description: 'Revolutionary portable solar charger with built-in battery storage. The leaf-shaped design maximizes solar absorption while being aesthetically pleasing. Made from recycled materials and biodegradable components.',
      price: 89.99,
      category: 'Energy Efficient',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad0b25180b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      location: 'Global Shipping',
      sustainability: 'Carbon Negative Production',
      sellerId: 'eco-tech-1',
      status: 'active',
      seller: 'EcoTech Innovations',
      rating: 4.8,
      features: [
        'Charges smartphones in 2-3 hours of sunlight',
        'Waterproof and shock-resistant',
        'Foldable design for easy transport',
        'Biodegradable outer shell',
        'Recycled components'
      ],
      sustainabilityDetails: 'Each SolarLeaf removes more carbon from the atmosphere than is used in production. We plant 5 trees for every unit sold and use only recycled or biodegradable materials in our packaging and products.'
    },
    {
      id: 'zero-waste-1',
      name: 'BambooBlend Cutlery Set',
      description: 'Portable bamboo cutlery set including fork, knife, spoon, chopsticks, and straw with cleaning brush. All packed in a compact hemp carrying case. The perfect zero-waste solution for eating on the go.',
      price: 24.99,
      category: 'Zero Waste',
      image: 'https://images.unsplash.com/photo-1584346133934-2d8b3d1d42f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      location: 'North America',
      sustainability: 'Plastic-Free Alternative',
      sellerId: 'zero-waste-living',
      status: 'active',
      seller: 'Zero Waste Living Co.',
      rating: 4.9,
      features: [
        'Durable bamboo construction',
        'Compact hemp carrying case',
        'Dishwasher safe',
        'Naturally antibacterial',
        'Compostable at end of life'
      ],
      sustainabilityDetails: 'Our bamboo is sourced from sustainable farms that use no pesticides or chemical fertilizers. The hemp case is made from organic hemp grown using regenerative farming practices.'
    },
    {
      id: 'eco-fashion-1',
      name: 'OceanWeave Recycled Backpack',
      description: 'Stylish and functional backpack made from recycled ocean plastic. Each backpack removes 50 plastic bottles from the ocean. Features multiple compartments, padded laptop sleeve, and water-resistant exterior.',
      price: 119.99,
      category: 'Sustainable Fashion',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      location: 'Europe',
      sustainability: 'Ocean Plastic Recycling',
      sellerId: 'ocean-cleanup-collective',
      status: 'active',
      seller: 'Ocean Cleanup Collective',
      rating: 4.7,
      features: [
        'Made from 100% recycled ocean plastic',
        'Water-resistant exterior',
        'Padded laptop sleeve fits up to 15" laptop',
        'Adjustable padded straps',
        'Lifetime warranty'
      ],
      sustainabilityDetails: 'We work directly with coastal communities to collect plastic waste before it enters the ocean. Our manufacturing process uses 70% less water and 50% less energy than conventional backpack production.'
    },
    {
      id: 'eco-home-1',
      name: 'MycoLight Mushroom Lamp',
      description: 'Biodegradable lamp grown from mycelium (mushroom roots). This innovative lighting solution combines natural materials with modern design. The lamp shade is literally grown, not manufactured, creating a unique pattern for each piece.',
      price: 149.99,
      category: 'Eco-friendly Home',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      location: 'United States',
      sustainability: 'Biodegradable Innovation',
      sellerId: 'fungi-futures',
      status: 'active',
      seller: 'Fungi Futures',
      rating: 4.6,
      features: [
        'Grown from agricultural waste and mycelium',
        'LED light with warm color temperature',
        'Each piece is unique with natural variations',
        'Fully biodegradable at end of life',
        'Energy-efficient design'
      ],
      sustainabilityDetails: 'Our lamps are grown using agricultural waste products like corn husks and coffee grounds combined with mycelium. The growing process sequesters carbon, and at the end of its life, the lamp can be composted in your garden.'
    }
  ]);
  const [collectionRequests, setCollectionRequests] = useState(staticCollectionRequests);
  
  // Create axios instance with auth header
  const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  
  // Authentication functions
  const login = async (email, password) => {
    try {
      // Check against static users first
      const foundUser = staticUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Generate a mock token
        const mockToken = `mock-token-${Date.now()}`;
        
        setUser(foundUser);
        setToken(mockToken);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('token', mockToken);
        
        return foundUser;
      }
      
      // If no static user matches, try the API (fallback)
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { data, token: authToken } = response.data;
      setUser(data);
      setToken(authToken);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', authToken);
      
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };
  
  const register = async (username, email, password, role = 'seller') => {
    try {
      // For demo purposes, create a new static user
      const newUser = {
        _id: `user-${Date.now()}`,
        username,
        email,
        password,
        role
      };
      
      // Add to users array
      setUsers(prevUsers => [...prevUsers, newUser]);
      
      // Generate a mock token
      const mockToken = `mock-token-${Date.now()}`;
      
      setUser(newUser);
      setToken(mockToken);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', mockToken);
      
      return newUser;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  // Fetch data functions
  const fetchUsers = async () => {
    if (!token || !user?.role === 'admin') return;
    
    // We already have static users, no need to fetch
    // This function is kept for compatibility
    try {
      // If API is available, fetch additional users
      const response = await authAxios.get('/users');
      const apiUsers = response.data.data;
      
      // Merge with static users, avoiding duplicates
      const mergedUsers = [...staticUsers];
      
      apiUsers.forEach(apiUser => {
        if (!mergedUsers.some(u => u.email === apiUser.email)) {
          mergedUsers.push(apiUser);
        }
      });
      
      setUsers(mergedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const fetchCollectionRequests = async () => {
    if (!token) return;
    
    // We already have static collection requests, no need to fetch
    // This function is kept for compatibility
    try {
      // If API is available, fetch additional collection requests
      const response = await authAxios.get('/collection-requests');
      const apiRequests = response.data.data;
      
      // Merge with static collection requests, avoiding duplicates
      const mergedRequests = [...staticCollectionRequests];
      
      apiRequests.forEach(apiRequest => {
        if (!mergedRequests.some(r => r.id === apiRequest.id)) {
          mergedRequests.push(apiRequest);
        }
      });
      
      setCollectionRequests(mergedRequests);
    } catch (error) {
      console.error('Error fetching collection requests:', error);
    }
  };
  
  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    
    setLoading(false);
  }, []);
  
  // Fetch data when user or token changes
  useEffect(() => {
    if (token) {
      fetchProducts();
      fetchCollectionRequests();
      
      if (user?.role === 'admin') {
        fetchUsers();
      }
    }
  }, [user, token]);
  
  // Role-based authorization
  const isAdmin = user && user.role === 'admin';
  const isSeller = user && user.role === 'seller';
  
  // Get products for current seller
  const sellerProducts = user && user.role === 'seller' 
    ? products.filter(product => product.sellerId === user._id || product.seller === 'EcoTech Innovations')
    : [];
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAdmin,
        isSeller,
        users,
        products,
        collectionRequests,
        sellerProducts,
        fetchUsers,
        fetchProducts,
        fetchCollectionRequests,
        authAxios
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 