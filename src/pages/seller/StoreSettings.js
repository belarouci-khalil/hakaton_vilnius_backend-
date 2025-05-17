import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function StoreSettings() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Initialize form data with mock store settings
  const [formData, setFormData] = useState({
    storeName: 'EcoStore',
    storeDescription: 'Your one-stop shop for sustainable and eco-friendly products.',
    contactEmail: user?.email || '',
    contactPhone: '555-123-4567',
    address: '123 Green Street, Eco City, EC 12345',
    logo: null,
    logoPreview: 'https://via.placeholder.com/150',
    bannerImage: null,
    bannerPreview: 'https://via.placeholder.com/800x200',
    shippingPolicy: 'Free shipping on orders over $50. Standard shipping takes 3-5 business days.',
    returnPolicy: '30-day return policy for unused items in original packaging.',
    sustainabilityCommitment: 'We are committed to reducing our carbon footprint by using recycled packaging materials and offsetting our carbon emissions.'
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
        [`${name}Preview`]: URL.createObjectURL(files[0])
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      // Here you would typically make an API call to update the store settings
      console.log('Updating store settings:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccessMessage('Store settings updated successfully!');
    } catch (error) {
      console.error('Error updating store settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Store Settings</h1>
      
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    required
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Business Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">
                    Store Description *
                  </label>
                  <textarea
                    id="storeDescription"
                    name="storeDescription"
                    required
                    rows="3"
                    value={formData.storeDescription}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Store Visuals */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Store Visuals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Logo
                  </label>
                  <div className="mt-1 flex items-center">
                    <div className="flex-shrink-0 h-24 w-24 border border-gray-300 rounded-md overflow-hidden bg-gray-100">
                      {formData.logoPreview && (
                        <img
                          src={formData.logoPreview}
                          alt="Store logo preview"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <label
                      htmlFor="logo-upload"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                      Change Logo
                    </label>
                    <input
                      id="logo-upload"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Recommended size: 200x200 pixels
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Banner Image
                  </label>
                  <div className="mt-1">
                    <div className="border border-gray-300 rounded-md overflow-hidden bg-gray-100 w-full h-32">
                      {formData.bannerPreview && (
                        <img
                          src={formData.bannerPreview}
                          alt="Banner preview"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <label
                      htmlFor="banner-upload"
                      className="mt-2 inline-block bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                      Change Banner
                    </label>
                    <input
                      id="banner-upload"
                      name="bannerImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Recommended size: 1200x300 pixels
                  </p>
                </div>
              </div>
            </div>
            
            {/* Store Policies */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Store Policies</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="shippingPolicy" className="block text-sm font-medium text-gray-700">
                    Shipping Policy
                  </label>
                  <textarea
                    id="shippingPolicy"
                    name="shippingPolicy"
                    rows="3"
                    value={formData.shippingPolicy}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="returnPolicy" className="block text-sm font-medium text-gray-700">
                    Return Policy
                  </label>
                  <textarea
                    id="returnPolicy"
                    name="returnPolicy"
                    rows="3"
                    value={formData.returnPolicy}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="sustainabilityCommitment" className="block text-sm font-medium text-gray-700">
                    Sustainability Commitment
                  </label>
                  <textarea
                    id="sustainabilityCommitment"
                    name="sustainabilityCommitment"
                    rows="3"
                    value={formData.sustainabilityCommitment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoreSettings; 