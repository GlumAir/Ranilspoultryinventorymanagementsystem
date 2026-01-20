import React, { useState } from 'react';
import { User, Product } from '../App';
import { Layout } from './Layout';
import { mockProducts as initialProducts, mockSuppliers } from '../utils/mockData';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';

interface ManageProductsProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function ManageProducts({ user, onNavigate, onLogout }: ManageProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: 0,
    price: 0,
    supplierId: '',
    lowStockThreshold: 0,
  });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        stock: product.stock,
        price: product.price,
        supplierId: product.supplierId,
        lowStockThreshold: product.lowStockThreshold,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        stock: 0,
        price: 0,
        supplierId: mockSuppliers[0]?.id || '',
        lowStockThreshold: 0,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id ? { ...p, ...formData } : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
      };
      setProducts([...products, newProduct]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Manage Products</h1>
        <p className="text-gray-600">Add, edit, or remove products from inventory</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Product Name</th>
                <th className="px-6 py-3 text-left text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-gray-700">Stock</th>
                <th className="px-6 py-3 text-left text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-gray-700">Supplier</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => {
                const supplier = mockSuppliers.find(s => s.id === product.supplierId);
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
                    <td className="px-6 py-4 text-gray-600">{supplier?.name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
                        {statusText}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Dog Food">Dog Food</option>
                  <option value="Cat Food">Cat Food</option>
                  <option value="Cat Litter">Cat Litter</option>
                  <option value="Poultry Feed">Poultry Feed</option>
                  <option value="Hog Feed">Hog Feed</option>
                  <option value="Aqua Feed">Aqua Feed</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Chemical">Chemical</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Price (₱)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Supplier</label>
                <select
                  value={formData.supplierId}
                  onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                >
                  {mockSuppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Low Stock Threshold</label>
                <input
                  type="number"
                  value={formData.lowStockThreshold}
                  onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                  min="0"
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
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-gray-900 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}