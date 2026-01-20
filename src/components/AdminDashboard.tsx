import React, { useState, useEffect } from 'react';
import { User } from '../App';
import { Layout } from './Layout';
import { Package, AlertTriangle, TrendingUp, Archive } from 'lucide-react';
import { mockProducts, mockSales } from '../utils/mockData';

interface AdminDashboardProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({ user, onNavigate, onLogout }: AdminDashboardProps) {
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [weekSales, setWeekSales] = useState(0);

  useEffect(() => {
    // Calculate analytics
    setTotalProducts(mockProducts.length);
    
    const lowStock = mockProducts.filter(p => p.stock <= p.lowStockThreshold);
    setLowStockCount(lowStock.length);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const todayTotal = mockSales
      .filter(s => new Date(s.date) >= today)
      .reduce((sum, s) => sum + s.total, 0);
    setTodaySales(todayTotal);

    const weekTotal = mockSales
      .filter(s => new Date(s.date) >= weekAgo)
      .reduce((sum, s) => sum + s.total, 0);
    setWeekSales(weekTotal);
  }, []);

  const lowStockProducts = mockProducts.filter(p => p.stock <= p.lowStockThreshold);

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.username}</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Total Products</p>
          <p className="text-gray-900">{totalProducts}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Low Stock Alerts</p>
          <p className="text-gray-900">{lowStockCount}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Today's Sales</p>
          <p className="text-gray-900">₱{todaySales.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Archive className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Week's Sales</p>
          <p className="text-gray-900">₱{weekSales.toLocaleString()}</p>
        </div>
      </div>

      {/* Low Stock Alert Section */}
      {lowStockCount > 0 && (
        <div className="bg-amber-50 border border-amber-400 rounded-lg p-6 mb-8">
          <div className="flex items-start mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-amber-900 mb-1">Low Stock Warning</h3>
              <p className="text-amber-800">The following products are running low on stock:</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between bg-white rounded p-3">
                <div>
                  <p className="text-gray-900">{product.name}</p>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-600">{product.stock} units</p>
                  <p className="text-gray-500 text-sm">Threshold: {product.lowStockThreshold}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => onNavigate('products')}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-md transition-colors"
          >
            Manage Products
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('products')}
            className="p-4 border-2 border-gray-200 hover:border-yellow-400 rounded-lg transition-colors text-left"
          >
            <Package className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-gray-900">Manage Products</p>
            <p className="text-gray-600 text-sm">Add, edit, or remove products</p>
          </button>
          
          <button
            onClick={() => onNavigate('sales')}
            className="p-4 border-2 border-gray-200 hover:border-yellow-400 rounded-lg transition-colors text-left"
          >
            <TrendingUp className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-gray-900">Process Sales</p>
            <p className="text-gray-600 text-sm">Make a new sale transaction</p>
          </button>
          
          <button
            onClick={() => onNavigate('reports')}
            className="p-4 border-2 border-gray-200 hover:border-yellow-400 rounded-lg transition-colors text-left"
          >
            <Archive className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-gray-900">View Reports</p>
            <p className="text-gray-600 text-sm">Sales analytics and insights</p>
          </button>
        </div>
      </div>
    </Layout>
  );
}