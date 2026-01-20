import React, { useState } from 'react';
import { User } from '../App';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import logo from 'figma:asset/b931500383989f12d93392d612e5c8d5411786fd.png';

interface LayoutProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function Layout({ user, onNavigate, onLogout, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'sales', label: 'Sales', icon: ShoppingCart },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const sellerMenuItems = [
    { id: 'seller-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Make Sale', icon: ShoppingCart },
  ];

  const menuItems = user.role === 'admin' ? adminMenuItems : sellerMenuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 lg:hidden text-gray-600 hover:text-gray-900"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center">
              <img src={logo} alt="Ranil's Poultry Supply Logo" className="w-12 h-12 rounded-full mr-3" />
              <div>
                <h2 className="text-gray-900">Ranil's Poultry Supply</h2>
                <p className="text-gray-600 text-sm">{user.role === 'admin' ? 'Admin Panel' : 'Seller Panel'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-gray-900">{user.username}</p>
              <p className="text-gray-600 text-sm capitalize">{user.role}</p>
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 transition-transform lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          style={{ top: '73px' }}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setShowLogoutConfirm(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}