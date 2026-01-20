import React, { useState } from 'react';
import { User, UserRole } from '../App';
import { Layout } from './Layout';
import { mockUsers as initialUsers } from '../utils/mockData';
import { Plus, UserX, UserCheck, X } from 'lucide-react';

interface ManageUsersProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function ManageUsers({ user, onNavigate, onLogout }: ManageUsersProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [disableConfirm, setDisableConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    role: 'seller' as UserRole,
  });

  const handleOpenModal = () => {
    setFormData({
      username: '',
      role: 'seller',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: User = {
      id: Date.now().toString(),
      username: formData.username,
      role: formData.role,
      active: true,
    };
    
    setUsers([...users, newUser]);
    handleCloseModal();
  };

  const handleToggleActive = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, active: !u.active } : u
    ));
    setDisableConfirm(null);
  };

  const activeUsers = users.filter(u => u.active);
  const inactiveUsers = users.filter(u => !u.active);

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Manage Users</h1>
        <p className="text-gray-600">Add and manage system users</p>
      </div>

      {/* Add User Button */}
      <div className="mb-6">
        <button
          onClick={handleOpenModal}
          className="flex items-center px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Active Users */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Active Users</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Username</th>
                <th className="px-6 py-3 text-left text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeUsers.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{u.username}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      u.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role === 'admin' ? 'Admin' : 'Seller'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-green-600">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setDisableConfirm(u.id)}
                      className="px-4 py-2 text-amber-600 hover:bg-amber-50 rounded transition-colors"
                      disabled={u.id === user.id}
                    >
                      {u.id === user.id ? 'Current User' : 'Disable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inactive Users */}
      {inactiveUsers.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">Inactive Users</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Username</th>
                  <th className="px-6 py-3 text-left text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inactiveUsers.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 opacity-60">
                    <td className="px-6 py-4 text-gray-900">{u.username}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        u.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {u.role === 'admin' ? 'Admin' : 'Seller'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center text-gray-600">
                        <UserX className="w-4 h-4 mr-2" />
                        Inactive
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(u.id)}
                        className="px-4 py-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                      >
                        Enable
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Add New User</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                >
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-400 rounded p-4">
                <p className="text-yellow-800 text-sm">
                  Note: Default password will be set to "password123". User should change it after first login.
                </p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Disable Confirmation Modal */}
      {disableConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-gray-900 mb-4">Disable User Account</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to disable this user account? They will not be able to log in until re-enabled.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDisableConfirm(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleToggleActive(disableConfirm)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
              >
                Disable
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
