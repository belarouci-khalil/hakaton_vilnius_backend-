import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function CollectionRequestsManagement() {
  const { collectionRequests, fetchCollectionRequests, authAxios } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMaterial, setFilterMaterial] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    fetchCollectionRequests();
  }, [fetchCollectionRequests]);
  
  // Get unique materials from all collection requests
  const allMaterials = [...new Set(
    collectionRequests.flatMap(request => request.materials || [])
  )];
  
  // Filter requests based on search term and filters
  const filteredRequests = collectionRequests.filter(request => {
    const matchesSearch = 
      (request.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.address || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesMaterial = filterMaterial === 'all' || 
      (request.materials && request.materials.includes(filterMaterial));
    
    return matchesSearch && matchesStatus && matchesMaterial;
  });
  
  const handleUpdateStatus = async (requestId, newStatus) => {
    setIsUpdating(true);
    try {
      await authAxios.put(`/collection-requests/${requestId}/status`, { status: newStatus });
      fetchCollectionRequests(); // Refresh the collection requests
    } catch (error) {
      console.error('Error updating request status:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleDeleteRequest = async (requestId) => {
    if (window.confirm('Are you sure you want to delete this collection request?')) {
      try {
        await authAxios.delete(`/collection-requests/${requestId}`);
        fetchCollectionRequests(); // Refresh the collection requests
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };
  
  const handleViewDetails = (requestId) => {
    const request = collectionRequests.find(req => req._id === requestId);
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };
  
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedRequest(null);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Collection Requests Management</h1>
      
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <select
            value={filterMaterial}
            onChange={(e) => setFilterMaterial(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Materials</option>
            {allMaterials.map(material => (
              <option key={material} value={material}>
                {material.charAt(0).toUpperCase() + material.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Collection Requests Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materials</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity/Weight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map(request => (
              <tr key={request._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {request.materials && request.materials.map(material => (
                      <span 
                        key={material} 
                        className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {request.quantity} / {request.weight}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{request.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {request.date} ({request.preferredTime})
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(request._id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Details
                    </button>
                    
                    <select
                      value={request.status}
                      onChange={(e) => handleUpdateStatus(request._id, e.target.value)}
                      disabled={isUpdating}
                      className="text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                      <option value="completed">Complete</option>
                    </select>
                    
                    <button
                      onClick={() => handleDeleteRequest(request._id)}
                      disabled={isUpdating}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No collection requests found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Request Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Collection Request Details
                    </h3>
                    
                    <div className="border-t border-gray-200 py-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Request ID</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRequest._id}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Status</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              selectedRequest.status === 'approved' ? 'bg-green-100 text-green-800' :
                              selectedRequest.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {selectedRequest.status}
                            </span>
                          </dd>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">User Information</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <p><strong>Name:</strong> {selectedRequest.userName}</p>
                            <p><strong>Email:</strong> {selectedRequest.userEmail || 'Not provided'}</p>
                            <p><strong>Phone:</strong> {selectedRequest.userPhone || 'Not provided'}</p>
                          </dd>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Materials</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <div className="flex flex-wrap gap-1">
                              {selectedRequest.materials && selectedRequest.materials.map(material => (
                                <span 
                                  key={material} 
                                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700"
                                >
                                  {material}
                                </span>
                              ))}
                            </div>
                          </dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Quantity</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRequest.quantity || 'Not specified'}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Weight</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRequest.weight || 'Not specified'}</dd>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Collection Address</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRequest.address}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Collection Date</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRequest.date}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Preferred Time</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRequest.preferredTime}</dd>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Additional Notes</dt>
                          <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                            {selectedRequest.description || 'No additional notes provided.'}
                          </dd>
                        </div>
                        
                        {selectedRequest.images && selectedRequest.images.length > 0 && (
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Images</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <div className="grid grid-cols-2 gap-2">
                                {selectedRequest.images.map((image, index) => (
                                  <img 
                                    key={index}
                                    src={image}
                                    alt={`Material image ${index + 1}`}
                                    className="h-32 w-full object-cover rounded-md"
                                  />
                                ))}
                              </div>
                            </dd>
                          </div>
                        )}
                        
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Request Submitted</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {new Date(selectedRequest.createdAt).toLocaleString() || 'Unknown'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeDetailsModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedRequest._id, 'approved');
                    closeDetailsModal();
                  }}
                  disabled={isUpdating || selectedRequest.status === 'approved' || selectedRequest.status === 'completed'}
                  className={`mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    selectedRequest.status === 'approved' || selectedRequest.status === 'completed' || isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Approve
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedRequest._id, 'rejected');
                    closeDetailsModal();
                  }}
                  disabled={isUpdating || selectedRequest.status === 'rejected' || selectedRequest.status === 'completed'}
                  className={`mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    selectedRequest.status === 'rejected' || selectedRequest.status === 'completed' || isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionRequestsManagement; 