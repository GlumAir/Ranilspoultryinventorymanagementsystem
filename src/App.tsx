import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { SellerDashboard } from './components/SellerDashboard';
import { ManageProducts } from './components/ManageProducts';
import { ManageSuppliers } from './components/ManageSuppliers';
import { ManageUsers } from './components/ManageUsers';
import { POSSales } from './components/POSSales';
import { Reports } from './components/Reports';

export type UserRole = 'admin' | 'seller';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  supplierId: string;
  lowStockThreshold: number;
  unit: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  date: Date;
  sellerId: string;
}

type View = 'login' | 'admin-dashboard' | 'seller-dashboard' | 'products' | 'suppliers' | 'users' | 'sales' | 'reports';

function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('seller-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      
      {currentView === 'admin-dashboard' && currentUser && (
        <AdminDashboard 
          user={currentUser} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'seller-dashboard' && currentUser && (
        <SellerDashboard 
          user={currentUser} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'products' && currentUser && (
        <ManageProducts 
          user={currentUser}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'suppliers' && currentUser && (
        <ManageSuppliers 
          user={currentUser}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'users' && currentUser && (
        <ManageUsers 
          user={currentUser}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'sales' && currentUser && (
        <POSSales 
          user={currentUser}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'reports' && currentUser && (
        <Reports 
          user={currentUser}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;