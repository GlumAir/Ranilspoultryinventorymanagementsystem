import React, { useState } from 'react';
import { User, UserRole } from '../App';
import { Lock, User as UserIcon } from 'lucide-react';
import logo from 'figma:asset/b931500383989f12d93392d612e5c8d5411786fd.png';

interface LoginProps {
  onLogin: (user: User) => void;
}

// Mock users for demonstration
const mockUsers = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' as UserRole, active: true },
  { id: '2', username: 'seller', password: 'seller123', role: 'seller' as UserRole, active: true },
];

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = mockUsers.find(
      u => u.username === username && u.password === password && u.active
    );

    if (user) {
      onLogin({
        id: user.id,
        username: user.username,
        role: user.role,
        active: user.active,
      });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img src={logo} alt="Ranil's Poultry Supply Logo" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h1 className="text-gray-900 mb-2">Ranil's Poultry Supply</h1>
            <p className="text-gray-600">Inventory Management System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-amber-50 border border-amber-400 text-amber-800 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-md transition-colors"
            >
              Login
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>Admin: admin / admin123</p>
              <p>Seller: seller / seller123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}