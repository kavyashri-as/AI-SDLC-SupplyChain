/**
 * Cart Page
 * Displays all items in the shopping cart with CRUD operations
 * 
 * Features:
 * - Display cart items with images, names, prices, quantities
 * - Update item quantities (increase/decrease)
 * - Remove individual items
 * - Clear entire cart
 * - Show cart summary (total items, total price)
 * - Empty state when no items
 * - Responsive design
 * - Accessibility compliant
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { items, itemCount, total, updateItemQuantity, removeItem, clearCart } = useCart();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateItemQuantity(productId, newQuantity);
      toast.success('Quantity updated');
    }
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeItem(productId);
    toast.success(`Removed ${productName} from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  const handleBrowseProducts = () => {
    navigate('/products');
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div className={`min-h-screen pt-24 ${darkMode ? 'bg-dark' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className={`mt-4 text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
              Your cart is empty
            </h2>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Start adding some products to your cart!
            </p>
            <button
              onClick={handleBrowseProducts}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-dark' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
            Shopping Cart
          </h1>
          <button
            onClick={handleClearCart}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              darkMode
                ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className={`${
                    darkMode ? 'bg-dark-card' : 'bg-white'
                  } rounded-lg shadow-md p-4 transition-colors`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24">
                      <img
                        src={item.imageUrl || '/placeholder-product.png'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-lg font-semibold ${
                          darkMode ? 'text-light' : 'text-gray-900'
                        }`}
                      >
                        {item.name}
                      </h3>
                      {item.sku && (
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          SKU: {item.sku}
                        </p>
                      )}
                      <p className={`text-lg font-bold text-primary mt-2`}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity, -1)}
                        className={`p-2 rounded-md ${
                          darkMode
                            ? 'hover:bg-dark text-gray-400 hover:text-light'
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        } transition-colors focus:outline-none focus:ring-2 focus:ring-primary`}
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="w-5 h-5" />
                      </button>
                      <span
                        className={`text-lg font-semibold min-w-[3rem] text-center ${
                          darkMode ? 'text-light' : 'text-gray-900'
                        }`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity, 1)}
                        className={`p-2 rounded-md ${
                          darkMode
                            ? 'hover:bg-dark text-gray-400 hover:text-light'
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        } transition-colors focus:outline-none focus:ring-2 focus:ring-primary`}
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[100px]">
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Subtotal
                      </p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.productId, item.name)}
                      className={`p-2 rounded-md ${
                        darkMode
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                          : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                      } transition-colors focus:outline-none focus:ring-2 focus:ring-red-500`}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div
              className={`${
                darkMode ? 'bg-dark-card' : 'bg-white'
              } rounded-lg shadow-md p-6 sticky top-24 transition-colors`}
            >
              <h2
                className={`text-xl font-bold mb-4 ${darkMode ? 'text-light' : 'text-gray-900'}`}
              >
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Items ({itemCount})
                  </span>
                  <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                    ${total.toFixed(2)}
                  </span>
                </div>
                
                <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className={`${darkMode ? 'text-light' : 'text-gray-900'}`}>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                disabled
                className="w-full bg-gray-400 text-white py-3 px-4 rounded-md font-medium cursor-not-allowed opacity-60"
                title="Checkout coming soon"
              >
                Proceed to Checkout (Coming Soon)
              </button>

              <button
                onClick={handleBrowseProducts}
                className={`w-full mt-3 py-3 px-4 rounded-md font-medium border ${
                  darkMode
                    ? 'border-gray-600 text-light hover:bg-dark'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
