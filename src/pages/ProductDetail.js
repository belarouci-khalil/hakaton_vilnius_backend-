import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const { products } = useAuth();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
        <Link to="/products" className="text-green-600 hover:text-green-700 mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/products" className="text-green-600 hover:text-green-700 mb-8 inline-block">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
            ${product.price.toFixed(2)}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="mb-6">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>
            {product.rating && (
              <span className="inline-block ml-3 text-yellow-500">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && '½'}
                {'☆'.repeat(5 - Math.ceil(product.rating))}
                <span className="text-gray-600 ml-1">({product.rating})</span>
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability</h3>
            <div className="flex items-center mb-3">
              <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                {product.sustainability}
              </span>
            </div>
            <p className="text-gray-600">{product.sustainabilityDetails}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index} className="mb-1">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600">{product.location}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Seller</h3>
            <p className="text-gray-600">{product.seller}</p>
          </div>

          <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200">
            Contact Seller
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(relatedProduct => (
              <Link 
                to={`/products/${relatedProduct.id}`} 
                key={relatedProduct.id}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                  <div className="relative h-48">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
                      ${relatedProduct.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm">{relatedProduct.description.substring(0, 100)}...</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail; 