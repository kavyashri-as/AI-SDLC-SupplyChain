/**
 * CartIcon Component
 * Displays shopping cart icon with item count badge in header
 * 
 * Features:
 * - Shows cart icon from Heroicons
 * - Displays badge with item count when cart has items
 * - Navigates to cart page on click
 * - Fully accessible with ARIA labels
 * - Responsive and dark mode support
 */

import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

interface CartIconProps {
  onClick?: () => void;
  className?: string;
}

/**
 * CartIcon component
 * @param onClick - Optional click handler
 * @param className - Optional additional CSS classes
 */
export const CartIcon: React.FC<CartIconProps> = React.memo(({ onClick, className = '' }) => {
  const { itemCount } = useCart();

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-colors ${className}`}
      aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
      type="button"
      data-testid="cart-icon"
    >
      <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
      
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[1.25rem]"
          aria-live="polite"
          aria-atomic="true"
          data-testid="cart-badge"
        >
          <span data-testid="cart-item-count">{itemCount > 99 ? '99+' : itemCount}</span>
        </span>
      )}
    </button>
  );
});

CartIcon.displayName = 'CartIcon';
