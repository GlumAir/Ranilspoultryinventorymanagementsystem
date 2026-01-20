import React, { useState } from 'react';
import { User, Product, SaleItem } from '../App';
import { Layout } from './Layout';
import { mockProducts } from '../utils/mockData';
import { ShoppingCart, Trash2, CheckCircle, X } from 'lucide-react';
import { Receipt } from './Receipt';

interface POSSalesProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface CartItem extends SaleItem {
  unit: string;
}

export function POSSales({ user, onNavigate, onLogout }: POSSalesProps) {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState<{ items: SaleItem[]; total: number } | null>(null);
  const [quantityModal, setQuantityModal] = useState<{ productId: string; productName: string; unit: string } | null>(null);
  const [customQuantity, setCustomQuantity] = useState('');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (product.stock > 0) {
      setQuantityModal({ 
        productId: product.id, 
        productName: product.name,
        unit: product.unit 
      });
      setCustomQuantity('');
    }
  };

  const handleAddQuantity = (quantity: number) => {
    if (!quantityModal) return;
    
    const product = products.find(p => p.id === quantityModal.productId);
    if (!product) return;

    const existingItem = cart.find(item => item.productId === quantityModal.productId);
    const currentQuantity = existingItem?.quantity || 0;
    const newQuantity = currentQuantity + quantity;

    if (newQuantity > product.stock) {
      alert(`Cannot add ${quantity} ${product.unit}. Only ${product.stock - currentQuantity} ${product.unit} available.`);
      return;
    }

    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === quantityModal.productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } else {
      const newItem: CartItem = {
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        price: product.price,
        unit: product.unit,
      };
      setCart([...cart, newItem]);
    }
    
    setQuantityModal(null);
  };

  const handleAddCustomQuantity = () => {
    const quantity = parseFloat(customQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    handleAddQuantity(quantity);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    if (newQuantity > product.stock) {
      alert(`Cannot set quantity to ${newQuantity}. Only ${product.stock} ${product.unit} available.`);
      return;
    }

    setCart(cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const total = calculateTotal();
    setLastSale({ items: [...cart], total });
    setShowReceipt(true);
    setCart([]);
  };

  const total = calculateTotal();

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Point of Sale</h1>
        <p className="text-gray-600">Select products to process a sale</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2">
          {/* Category Filter */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map(product => {
              const inCart = cart.find(item => item.productId === product.id);
              const availableStock = product.stock - (inCart?.quantity || 0);
              const isOutOfStock = availableStock === 0;

              return (
                <button
                  key={product.id}
                  onClick={() => handleAddToCart(product)}
                  disabled={isOutOfStock}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    inCart
                      ? 'border-yellow-400 bg-yellow-50'
                      : isOutOfStock
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-yellow-400 bg-white'
                  }`}
                >
                  <div className="mb-2">
                    <h3 className="text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900">₱{product.price.toLocaleString()}</p>
                    {inCart && (
                      <span className="bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded-full">
                        {inCart.quantity} {product.unit}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs">
                    {isOutOfStock ? (
                      <span className="text-red-600">Out of Stock</span>
                    ) : availableStock <= product.lowStockThreshold ? (
                      <span className="text-amber-600">Low: {availableStock} {product.unit}</span>
                    ) : (
                      <span className="text-green-600">Stock: {availableStock} {product.unit}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow sticky top-24">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <ShoppingCart className="w-6 h-6 text-yellow-600 mr-2" />
                <h2 className="text-gray-900">Cart ({cart.length})</h2>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Cart is empty</p>
                  <p className="text-gray-400 text-sm">Select products to add</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.productId} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-gray-900">{item.productName}</p>
                          <p className="text-gray-600 text-sm">₱{item.price.toLocaleString()} / {item.unit}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.productId)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="mb-2">
                        <label className="text-gray-600 text-sm block mb-1">Quantity ({item.unit})</label>
                        <input
                          type="number"
                          step="0.25"
                          min="0.25"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.productId, parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <span className="text-gray-600 text-sm">{item.quantity} {item.unit}</span>
                        <span className="text-gray-900">₱{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-900">Total</p>
                <p className="text-gray-900">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-3 rounded-md transition-colors flex items-center justify-center ${
                  cart.length === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                }`}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity Selection Modal */}
      {quantityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-gray-900">Add Quantity</h2>
                <p className="text-gray-600 text-sm">{quantityModal.productName}</p>
              </div>
              <button onClick={() => setQuantityModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">Select quantity in {quantityModal.unit}:</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => handleAddQuantity(0.25)}
                  className="px-6 py-4 bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-400 text-gray-900 rounded-md transition-colors"
                >
                  0.25 {quantityModal.unit}
                </button>
                <button
                  onClick={() => handleAddQuantity(0.5)}
                  className="px-6 py-4 bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-400 text-gray-900 rounded-md transition-colors"
                >
                  0.50 {quantityModal.unit}
                </button>
                <button
                  onClick={() => handleAddQuantity(0.75)}
                  className="px-6 py-4 bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-400 text-gray-900 rounded-md transition-colors"
                >
                  0.75 {quantityModal.unit}
                </button>
                <button
                  onClick={() => handleAddQuantity(1)}
                  className="px-6 py-4 bg-yellow-400 hover:bg-yellow-500 border-2 border-yellow-400 text-gray-900 rounded-md transition-colors"
                >
                  1.00 {quantityModal.unit}
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-gray-700 mb-2">Custom Quantity</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={customQuantity}
                    onChange={(e) => setCustomQuantity(e.target.value)}
                    placeholder="Enter amount"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={handleAddCustomQuantity}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && lastSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <Receipt
              items={lastSale.items}
              total={lastSale.total}
              onClose={() => setShowReceipt(false)}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
