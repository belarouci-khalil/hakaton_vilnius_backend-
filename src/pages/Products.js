import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Sample eco-friendly products data (you should move this to your backend/API)
const sampleProducts = [
  {
    id: 1,
    name: "Bamboo Cutlery Set",
    description: "Portable, reusable bamboo cutlery set including fork, knife, spoon, and chopsticks. Perfect for reducing plastic waste.",
    price: 19.99,
    category: "Kitchen",
    location: "Vilnius, Lithuania",
    sustainability: "100% Biodegradable",
    image: "https://images.unsplash.com/photo-1584972191378-d49632cf7f48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ecoMetrics: {
      plasticSaved: "500g per year",
      carbonFootprint: "Low",
      recyclable: true
    },
    sellerInfo: {
      name: "EcoBaltic",
      rating: 4.8
    }
  },
  {
    id: 2,
    name: "Solar-Powered Phone Charger",
    description: "Portable solar panel charger with high efficiency. Includes 2 USB ports and LED light for emergency use.",
    price: 49.99,
    category: "Electronics",
    location: "Kaunas, Lithuania",
    sustainability: "Renewable Energy",
    image: "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ecoMetrics: {
      energySaving: "100Wh per month",
      carbonFootprint: "Zero in use",
      recyclable: true
    },
    sellerInfo: {
      name: "GreenTech LT",
      rating: 4.9
    }
  },
  {
    id: 3,
    name: "Organic Cotton Tote Bag",
    description: "Durable, washable shopping bag made from 100% organic cotton. Replaces hundreds of plastic bags.",
    price: 15.99,
    category: "Bags",
    location: "Klaipėda, Lithuania",
    sustainability: "Organic Materials",
    image: "https://images.unsplash.com/photo-1605488770605-b80e5ef33312?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ecoMetrics: {
      plasticSaved: "1kg per month",
      carbonFootprint: "Very Low",
      recyclable: true
    },
    sellerInfo: {
      name: "EcoTextiles",
      rating: 4.7
    }
  },
  {
    id: 4,
    name: "Beeswax Food Wraps",
    description: "Reusable food wraps made with organic cotton and local beeswax. Set of 3 different sizes.",
    price: 24.99,
    category: "Kitchen",
    location: "Vilnius, Lithuania",
    sustainability: "Zero Waste",
    image: "https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ecoMetrics: {
      plasticSaved: "300g per year",
      carbonFootprint: "Minimal",
      recyclable: true
    },
    sellerInfo: {
      name: "BeeLithuanian",
      rating: 5.0
    }
  },
  {
    id: 5,
    name: "Recycled Glass Water Bottle",
    description: "1L water bottle made from recycled glass with bamboo cap. Includes protective silicone sleeve.",
    price: 29.99,
    category: "Kitchen",
    location: "Vilnius, Lithuania",
    sustainability: "Recycled Materials",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ecoMetrics: {
      plasticSaved: "2kg per year",
      carbonFootprint: "Low",
      recyclable: true
    },
    sellerInfo: {
      name: "GlassWorks LT",
      rating: 4.9
    }
  },
  {
    id: 6,
    name: "Biodegradable Plant Pots",
    description: "Set of 12 biodegradable seed starting pots made from coconut coir. Perfect for garden starting.",
    price: 12.99,
    category: "Garden",
    location: "Kaunas, Lithuania",
    sustainability: "100% Biodegradable",
    image: "https://images.unsplash.com/photo-1534710961216-75c88202f43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ecoMetrics: {
      plasticSaved: "200g per set",
      carbonFootprint: "Minimal",
      recyclable: true
    },
    sellerInfo: {
      name: "GreenGarden LT",
      rating: 4.8
    }
  },
  {
    id: 7,
    name: "Recycled Paper Notebook",
    description: "A5 notebook made from 100% recycled paper with seed-embedded cover. 160 pages.",
    price: 9.99,
    category: "Stationery",
    location: "Šiauliai, Lithuania",
    sustainability: "Recycled & Plantable",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ecoMetrics: {
      treeSaved: "0.1 trees per notebook",
      carbonFootprint: "Very Low",
      recyclable: true
    },
    sellerInfo: {
      name: "PaperCycle",
      rating: 4.7
    }
  },
  {
    id: 8,
    name: "Wooden Phone Stand",
    description: "Handcrafted phone stand made from sustainable Lithuanian oak. Fits all phone sizes.",
    price: 34.99,
    category: "Electronics",
    location: "Panevėžys, Lithuania",
    sustainability: "Sustainable Wood",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ecoMetrics: {
      materialSource: "Local sustainable forest",
      carbonFootprint: "Low",
      recyclable: true
    },
    sellerInfo: {
      name: "WoodCraft LT",
      rating: 4.9
    }
  }
];

function Products() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories from products
  const categories = ['all', ...new Set(sampleProducts.map(product => product.category))];

  // Filter and sort products
  const filteredProducts = sampleProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.sellerInfo.rating - a.sellerInfo.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Sustainable Products</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover eco-friendly products from local sellers committed to sustainability and environmental responsibility.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Search sustainable products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <Link 
            to={`/products/${product.id}`} 
            key={product.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Eco+Product';
                  }}
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  €{product.price}
                </div>
                <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{product.sellerInfo.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <span className="text-sm text-gray-500">{product.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {product.sustainability}
                  </span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Seller: {product.sellerInfo.name}</span>
                    {product.ecoMetrics.carbonFootprint && (
                      <span className="text-green-600">🌱 {product.ecoMetrics.carbonFootprint}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No sustainable products found matching your criteria.</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}

export default Products; 