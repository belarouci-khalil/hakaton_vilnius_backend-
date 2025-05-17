import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AddProduct() {
  const navigate = useNavigate();
  const { authAxios, fetchProducts } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productType: '',
    sustainabilityDetails: '',
    price: '',
    purchaseLink: '',
    storeLocation: '',
    images: [],
    imagePreviews: [],
    availabilityStatus: 'available',
    expirationDate: '',
    recyclabilityInfo: '',
    tags: '',
    contactInfo: ''
  });
  
  // Predefined product types for sustainable products
  const productTypes = [
    'Eco-friendly Home',
    'Sustainable Fashion',
    'Zero Waste',
    'Organic Food',
    'Recycled Materials',
    'Energy Efficient',
    'Natural Beauty',
    'Reusable Goods',
    'Electronics',
    'Homeware',
    'Clothing',
    'Accessories'
  ];
  
  const availabilityOptions = [
    'available',
    'out of stock',
    'discontinued'
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Limit to maximum 5 images
      const selectedFiles = files.slice(0, 5);
      
      const newImages = [...formData.images, ...selectedFiles];
      const newPreviews = [
        ...formData.imagePreviews,
        ...selectedFiles.map(file => URL.createObjectURL(file))
      ];
      
      // Keep only the most recent 5 images
      const limitedImages = newImages.slice(-5);
      const limitedPreviews = newPreviews.slice(-5);
      
      setFormData({
        ...formData,
        images: limitedImages,
        imagePreviews: limitedPreviews
      });
    }
  };
  
  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create FormData object to handle file uploads
      const productFormData = new FormData();
      
      // Add text fields
      productFormData.append('name', formData.name);
      productFormData.append('description', formData.description);
      productFormData.append('productType', formData.productType);
      productFormData.append('sustainabilityDetails', formData.sustainabilityDetails);
      productFormData.append('price', formData.price);
      productFormData.append('purchaseLink', formData.purchaseLink);
      productFormData.append('storeLocation', formData.storeLocation);
      productFormData.append('availabilityStatus', formData.availabilityStatus);
      productFormData.append('expirationDate', formData.expirationDate);
      productFormData.append('recyclabilityInfo', formData.recyclabilityInfo);
      productFormData.append('tags', formData.tags);
      productFormData.append('contactInfo', formData.contactInfo);
      
      // Add image files
      formData.images.forEach((image, index) => {
        productFormData.append('images', image);
      });
      
      // Send API request
      await authAxios.post('/products', productFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh products list
      fetchProducts();
      
      // Redirect to products management page after successful creation
      navigate('/seller-dashboard/products');
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.response?.data?.error || 'Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Recycled Cotton T-Shirt"
                />
              </div>
              
              <div>
                <label htmlFor="productType" className="block text-sm font-medium text-gray-700">
                  Product Type *
                </label>
                <select
                  id="productType"
                  name="productType"
                  required
                  value={formData.productType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a product type</option>
                  {productTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 29.99"
                />
              </div>
              
              <div>
                <label htmlFor="purchaseLink" className="block text-sm font-medium text-gray-700">
                  Purchase Link
                </label>
                <input
                  type="url"
                  id="purchaseLink"
                  name="purchaseLink"
                  value={formData.purchaseLink}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/product"
                />
              </div>
              
              <div>
                <label htmlFor="storeLocation" className="block text-sm font-medium text-gray-700">
                  Store Location
                </label>
                <input
                  type="text"
                  id="storeLocation"
                  name="storeLocation"
                  value={formData.storeLocation}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 123 Green St, San Francisco, CA"
                />
              </div>
              
              <div>
                <label htmlFor="availabilityStatus" className="block text-sm font-medium text-gray-700">
                  Availability Status *
                </label>
                <select
                  id="availabilityStatus"
                  name="availabilityStatus"
                  required
                  value={formData.availabilityStatus}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {availabilityOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">Optional. Date after which the product will no longer be listed.</p>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Product Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Detailed description including features, usage, etc."
                />
              </div>
              
              <div>
                <label htmlFor="sustainabilityDetails" className="block text-sm font-medium text-gray-700">
                  Sustainability Details *
                </label>
                <textarea
                  id="sustainabilityDetails"
                  name="sustainabilityDetails"
                  required
                  rows="3"
                  value={formData.sustainabilityDetails}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Explain why this product is sustainable (e.g., recycled materials, eco-friendly packaging)"
                />
              </div>
              
              <div>
                <label htmlFor="recyclabilityInfo" className="block text-sm font-medium text-gray-700">
                  Recyclability Information *
                </label>
                <textarea
                  id="recyclabilityInfo"
                  name="recyclabilityInfo"
                  required
                  rows="2"
                  value={formData.recyclabilityInfo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Details on how to recycle the product or its packaging"
                />
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags *
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  required
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., eco-friendly, organic, recycled (comma separated)"
                />
              </div>
              
              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                  Contact Information
                </label>
                <textarea
                  id="contactInfo"
                  name="contactInfo"
                  rows="2"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional contact information for inquiries"
                />
              </div>
            </div>
          </div>
          
          {/* Product Images Section */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images * (Maximum 5)
            </label>
            <div className="flex flex-wrap gap-4 mb-4">
              {formData.imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Product preview ${index + 1}`}
                    className="h-32 w-32 object-cover border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {formData.imagePreviews.length < 5 && (
                <label
                  htmlFor="images-upload"
                  className="h-32 w-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500"
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-xs text-gray-500">Upload image</p>
                  </div>
                </label>
              )}
              <input
                id="images-upload"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="sr-only"
              />
            </div>
            <p className="text-xs text-gray-500">
              {formData.imagePreviews.length === 0 ? "At least one image is required. " : ""}
              You can upload up to 5 images.
            </p>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/seller-dashboard/products')}
              className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.imagePreviews.length === 0}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct; 