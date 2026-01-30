/**
 * CartContext
 * Provides cart state and operations throughout the application
 * 
 * Features:
 * - Add, remove, update items in cart
 * - Calculate total items and price
 * - Persist cart to localStorage
 * - Load cart from localStorage on mount
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { CartContextType, CartItem, CartState } from '../types/cart';

const CART_STORAGE_KEY = 'octocat-cart';

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider component
 * Wraps the application to provide cart functionality
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart structure
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  /**
   * Add item to cart or update quantity if already exists
   */
  const addItem = useCallback((product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  /**
   * Remove item from cart
   */
  const removeItem = useCallback((productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  }, []);

  /**
   * Update item quantity (or remove if quantity <= 0)
   */
  const updateItemQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  }, [removeItem]);

  /**
   * Clear all items from cart
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Calculate derived state
  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const value: CartContextType = {
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * useCart hook
 * Access cart state and operations
 * @throws Error if used outside CartProvider
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
