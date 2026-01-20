import React, { useState, useEffect } from 'react';
import { User } from '../App';
import { Layout } from './Layout';
import { mockSales, mockProducts } from '../utils/mockData';
import { BarChart, Calendar, TrendingUp } from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface ReportsProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

type ReportPeriod = 'daily' | 'weekly' | 'monthly';

export function Reports({ user, onNavigate, onLogout }: ReportsProps) {
  const [period, setPeriod] = useState<ReportPeriod>('daily');
  const [salesData, setSalesData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    generateReportData();
  }, [period]);

  const generateReportData = () => {
    const now = new Date();
    let data: any[] = [];
    
    if (period === 'daily') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const daySales = mockSales.filter(sale => {
          const saleDate = new Date(sale.date);
          return saleDate.toDateString() === date.toDateString();
        });
        
        const total = daySales.reduce((sum, sale) => sum + sale.total, 0);
        const count = daySales.length;
        
        data.push({ date: dateStr, sales: total, transactions: count });
      }
    } else if (period === 'weekly') {
      // Last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i * 7) - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        const weekLabel = `Week ${4 - i}`;
        
        const weekSales = mockSales.filter(sale => {
          const saleDate = new Date(sale.date);
          return saleDate >= weekStart && saleDate <= weekEnd;
        });
        
        const total = weekSales.reduce((sum, sale) => sum + sale.total, 0);
        const count = weekSales.length;
        
        data.push({ date: weekLabel, sales: total, transactions: count });
      }
    } else {
      // Last 6 months
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now);
        monthDate.setMonth(monthDate.getMonth() - i);
        const monthStr = monthDate.toLocaleDateString('en-US', { month: 'short' });
        
        const monthSales = mockSales.filter(sale => {
          const saleDate = new Date(sale.date);
          return saleDate.getMonth() === monthDate.getMonth() &&
                 saleDate.getFullYear() === monthDate.getFullYear();
        });
        
        const total = monthSales.reduce((sum, sale) => sum + sale.total, 0);
        const count = monthSales.length;
        
        data.push({ date: monthStr, sales: total, transactions: count });
      }
    }
    
    setSalesData(data);
    
    // Calculate total revenue
    const revenue = mockSales.reduce((sum, sale) => sum + sale.total, 0);
    setTotalRevenue(revenue);
    
    // Calculate top products
    const productSales: { [key: string]: { name: string; quantity: number; revenue: number } } = {};
    
    mockSales.forEach(sale => {
      sale.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            name: item.productName,
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.price * item.quantity;
      });
    });
    
    const topProductsArray = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    
    setTopProducts(topProductsArray);
  };

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Sales Reports & Analytics</h1>
        <p className="text-gray-600">View sales performance and insights</p>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div className="flex space-x-2">
            <button
              onClick={() => setPeriod('daily')}
              className={`px-4 py-2 rounded-md transition-colors ${
                period === 'daily'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setPeriod('weekly')}
              className={`px-4 py-2 rounded-md transition-colors ${
                period === 'weekly'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-2 rounded-md transition-colors ${
                period === 'monthly'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Total Revenue</p>
          <p className="text-gray-900">₱{totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Total Transactions</p>
          <p className="text-gray-900">{mockSales.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Average Sale</p>
          <p className="text-gray-900">
            ₱{mockSales.length > 0 ? Math.round(totalRevenue / mockSales.length).toLocaleString() : 0}
          </p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-gray-900 mb-6">Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#facc15"
              strokeWidth={3}
              name="Sales (₱)"
              dot={{ fill: '#facc15', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-gray-900 mb-6">Top Selling Products</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#facc15" name="Revenue (₱)" />
          </RechartsBarChart>
        </ResponsiveContainer>

        {/* Top Products Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Rank</th>
                <th className="px-6 py-3 text-left text-gray-700">Product</th>
                <th className="px-6 py-3 text-left text-gray-700">Units Sold</th>
                <th className="px-6 py-3 text-left text-gray-700">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">#{index + 1}</td>
                  <td className="px-6 py-4 text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.quantity}</td>
                  <td className="px-6 py-4 text-gray-900">₱{product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}