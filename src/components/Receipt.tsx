import React from 'react';
import { SaleItem } from '../App';
import { CheckCircle, Printer, X } from 'lucide-react';
import logo from 'figma:asset/b931500383989f12d93392d612e5c8d5411786fd.png';

interface ReceiptProps {
  items: SaleItem[];
  total: number;
  onClose: () => void;
}

export function Receipt({ items, total, onClose }: ReceiptProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const timeStr = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-gray-900">Sale Completed</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6" id="receipt-content">
        {/* Business Header */}
        <div className="text-center mb-6 pb-6 border-b-2 border-dashed border-gray-300">
          <img src={logo} alt="Ranil's Poultry Supply Logo" className="w-16 h-16 rounded-full mx-auto mb-3" />
          <h3 className="text-gray-900 mb-1">Ranil's Poultry Supply</h3>
          <p className="text-gray-600 text-sm">Inventory Management System</p>
        </div>

        {/* Date and Time */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">{dateStr}</p>
          <p className="text-gray-600 text-sm">{timeStr}</p>
        </div>

        {/* Items */}
        <div className="mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2 text-gray-700">Item</th>
                <th className="text-center py-2 text-gray-700">Qty</th>
                <th className="text-right py-2 text-gray-700">Price</th>
                <th className="text-right py-2 text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 text-gray-900 text-sm">{item.productName}</td>
                  <td className="py-2 text-center text-gray-900 text-sm">{item.quantity}</td>
                  <td className="py-2 text-right text-gray-900 text-sm">
                    {item.price.toLocaleString()}
                  </td>
                  <td className="py-2 text-right text-gray-900 text-sm">
                    {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="border-t-2 border-gray-300 pt-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-900">Total Amount</p>
            <p className="text-gray-900">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm border-t border-dashed border-gray-300 pt-4">
          <p>Thank you for your business!</p>
          <p>Please come again</p>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 flex space-x-3">
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Receipt
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md transition-colors"
        >
          Close
        </button>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}