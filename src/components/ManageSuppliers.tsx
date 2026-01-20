import React, { useState } from 'react';
import { User, Supplier } from '../App';
import { Layout } from './Layout';
import { mockSuppliers as initialSuppliers, mockProducts } from '../utils/mockData';
import { Plus, Edit, X, Phone, Mail } from 'lucide-react';

interface ManageSuppliersProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function ManageSuppliers({ user, onNavigate, onLogout }: ManageSuppliersProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
  });

  const handleOpenModal = (supplier?: Supplier) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
      });
    } else {
      setEditingSupplier(null);
      setFormData({
        name: '',
        contact: '',
        email: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSupplier(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSupplier) {
      setSuppliers(suppliers.map(s =>
        s.id === editingSupplier.id ? { ...s, ...formData } : s
      ));
    } else {
      const newSupplier: Supplier = {
        id: Date.now().toString(),
        ...formData,
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    
    handleCloseModal();
  };

  const getSupplierProducts = (supplierId: string) => {
    return mockProducts.filter(p => p.supplierId === supplierId);
  };

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Manage Suppliers</h1>
        <p className="text-gray-600">View and manage supplier information</p>
      </div>

      {/* Add Supplier Button */}
      <div className="mb-6">
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Supplier
        </button>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map(supplier => {
          const products = getSupplierProducts(supplier.id);
          
          return (
            <div key={supplier.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-gray-900">{supplier.name}</h3>
                  <button
                    onClick={() => handleOpenModal(supplier)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{supplier.contact}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{supplier.email}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm mb-2">Products Supplied: {products.length}</p>
                  <button
                    onClick={() => setSelectedSupplier(supplier)}
                    className="text-yellow-600 hover:text-yellow-700 text-sm"
                  >
                    View Products →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-900">{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Supplier Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
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
                  {editingSupplier ? 'Update' : 'Add'} Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supplier Products Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-gray-900">{selectedSupplier.name}</h2>
                <p className="text-gray-600">Products Supplied</p>
              </div>
              <button onClick={() => setSelectedSupplier(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-3">
                {getSupplierProducts(selectedSupplier.id).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-gray-900">{product.name}</p>
                      <p className="text-gray-600 text-sm">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900">₱{product.price.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm">Stock: {product.stock}</p>
                    </div>
                  </div>
                ))}
                {getSupplierProducts(selectedSupplier.id).length === 0 && (
                  <p className="text-gray-500 text-center py-8">No products from this supplier</p>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedSupplier(null)}
                className="w-full px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}