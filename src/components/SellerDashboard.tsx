import React from 'react';
import { User } from '../App';
import { Layout } from './Layout';
import { ShoppingCart, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { mockProducts } from '../utils/mockData';

interface SellerDashboardProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function SellerDashboard({ user, onNavigate, onLogout }: SellerDashboardProps) {
  const inStockProducts = mockProducts.filter(p => p.stock > p.lowStockThreshold);
  const lowStockProducts = mockProducts.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold);
  const outOfStockProducts = mockProducts.filter(p => p.stock === 0);

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Seller Dashboard</h1>
        <p className="text-gray-600">Welcome, {user.username}</p>
      </div>

      {/* Quick Sale Action */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 mb-2">Ready to Make a Sale?</h2>
            <p className="text-gray-800 mb-4">Process transactions quickly with our POS system</p>
            <button
              onClick={() => onNavigate('sales')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md transition-colors inline-flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Start New Sale
            </button>
          </div>
          <ShoppingCart className="w-24 h-24 text-yellow-600 opacity-20" />
        </div>
      </div>

      {/* Stock Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">In Stock</p>
          <p className="text-gray-900">{inStockProducts.length} Products</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Low Stock</p>
          <p className="text-gray-900">{lowStockProducts.length} Products</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Out of Stock</p>
          <p className="text-gray-900">{outOfStockProducts.length} Products</p>
        </div>
      </div>

      {/* Product Availability List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Product Availability</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Product Name</th>
                <th className="px-6 py-3 text-left text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-gray-700">Stock</th>
                <th className="px-6 py-3 text-left text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockProducts.map(product => {
                let statusColor = 'bg-green-100 text-green-800';
                let statusText = 'In Stock';
                
                if (product.stock === 0) {
                  statusColor = 'bg-gray-100 text-gray-800';
                  statusText = 'Out of Stock';
                } else if (product.stock <= product.lowStockThreshold) {
                  statusColor = 'bg-amber-100 text-amber-800';
                  statusText = 'Low Stock';
                }
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                    <td className="px-6 py-4 text-gray-900">₱{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
                        {statusText}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}