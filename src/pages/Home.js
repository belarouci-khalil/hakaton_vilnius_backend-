import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-green-50 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
          Welcome to EcoConnect
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connecting sustainable products with conscious consumers and promoting local recycling initiatives.
        </p>
        <div className="space-x-4">
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Browse Products
          </Link>
          <Link
            to="/collection-requests"
            className="bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition"
          >
            Request Collection
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-green-600 text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold mb-2">Sustainable Products</h3>
          <p className="text-gray-600">
            Discover eco-friendly products from local sellers committed to sustainability.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-green-600 text-4xl mb-4">♻️</div>
          <h3 className="text-xl font-semibold mb-2">Recycling Service</h3>
          <p className="text-gray-600">
            Easy collection requests for your recyclable materials, supporting the circular economy.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-green-600 text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Local Community</h3>
          <p className="text-gray-600">
            Connect with local sellers and contribute to a more sustainable future.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-green-800 text-white rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Sustainable Community</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Whether you're a seller of sustainable products or a conscious consumer, EcoConnect is your platform for making a difference.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-white text-green-800 px-6 py-3 rounded-lg hover:bg-green-50 transition"
          >
            Get Started
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home; 