import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function SalesAnalytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock sales data - in a real application, this would come from an API
  const mockSalesData = {
    totalSales: 12850.75,
    totalOrders: 87,
    averageOrderValue: 147.71,
    
    // Monthly data for chart
    monthlySales: [
      { month: 'Jan', sales: 1250.50 },
      { month: 'Feb', sales: 1450.25 },
      { month: 'Mar', sales: 1325.75 },
      { month: 'Apr', sales: 1850.00 },
      { month: 'May', sales: 2100.50 },
      { month: 'Jun', sales: 1975.25 },
      { month: 'Jul', sales: 2250.75 },
      { month: 'Aug', sales: 2450.00 },
      { month: 'Sep', sales: 2350.25 },
      { month: 'Oct', sales: 2675.50 },
      { month: 'Nov', sales: 2950.00 },
      { month: 'Dec', sales: 3200.75 }
    ],
    
    // Top selling products
    topProducts: [
      { id: 1, name: 'Bamboo Toothbrush Set', sales: 125, revenue: 1250.00 },
      { id: 2, name: 'Reusable Food Wraps', sales: 98, revenue: 980.00 },
      { id: 3, name: 'Organic Cotton Tote Bag', sales: 87, revenue: 870.00 },
      { id: 4, name: 'Stainless Steel Water Bottle', sales: 76, revenue: 1520.00 },
      { id: 5, name: 'Recycled Paper Notebook', sales: 65, revenue: 650.00 }
    ]
  };
  
  // Calculate the maximum sales value for the chart
  const maxSales = Math.max(...mockSalesData.monthlySales.map(item => item.sales));
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    switch(timeRange) {
      case 'week':
        // In a real app, you would filter to show only the last week
        return mockSalesData.monthlySales.slice(-4);
      case 'month':
        // Show last 30 days / current month
        return mockSalesData.monthlySales.slice(-1);
      case 'quarter':
        // Show last 3 months
        return mockSalesData.monthlySales.slice(-3);
      case 'year':
        // Show all months
        return mockSalesData.monthlySales;
      default:
        return mockSalesData.monthlySales;
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sales Analytics</h1>
      
      {/* Time Range Selector */}
      <div className="mb-6">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 w-fit">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'week' ? 'bg-white shadow' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'month' ? 'bg-white shadow' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'quarter' ? 'bg-white shadow' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setTimeRange('quarter')}
          >
            Quarter
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'year' ? 'bg-white shadow' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">${mockSalesData.totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{mockSalesData.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900">${mockSalesData.averageOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h2>
        
        <div className="h-64">
          <div className="flex h-full items-end">
            {getFilteredData().map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ 
                    height: `${(item.sales / maxSales) * 100}%`,
                    maxWidth: '50px',
                    margin: '0 auto'
                  }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                <div className="text-xs font-medium">${item.sales.toFixed(0)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Top Selling Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Top Selling Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSalesData.topProducts.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.sales}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.revenue.toFixed(2)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesAnalytics; 