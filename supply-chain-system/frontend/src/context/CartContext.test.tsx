/**
 * CartContext Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('provides cart state to children', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it('addItem adds product to cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Test Product',
        price: 10.99,
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      productId: 1,
      name: 'Test Product',
      price: 10.99,
      quantity: 1,
    });
    expect(result.current.itemCount).toBe(1);
  });

  it('addItem updates quantity for existing product', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Test Product',
        price: 10.99,
      });
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Test Product',
        price: 10.99,
      }, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.itemCount).toBe(3);
  });

  it('removeItem removes product from cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Test Product',
        price: 10.99,
      });
    });

    act(() => {
      result.current.removeItem(1);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
  });

  it('clearCart empties the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Test Product',
        price: 10.99,
      });
      result.current.addItem({
        productId: 2,
        name: 'Another Product',
        price: 20.00,
      });
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
  });

  it('itemCount calculates correctly', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Product 1',
        price: 10.99,
      }, 2);
      result.current.addItem({
        productId: 2,
        name: 'Product 2',
        price: 20.00,
      }, 3);
    });

    expect(result.current.itemCount).toBe(5);
  });

  it('total calculates correctly', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Product 1',
        price: 10.00,
      }, 2);
      result.current.addItem({
        productId: 2,
        name: 'Product 2',
        price: 20.00,
      }, 1);
    });

    expect(result.current.total).toBe(40.00);
  });

  it('saves to localStorage on change', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Test Product',
        price: 10.99,
      });
    });

    const saved = localStorage.getItem('octocat-cart');
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].productId).toBe(1);
  });

  it('loads from localStorage on mount', () => {
    const testCart = [
      {
        productId: 1,
        name: 'Saved Product',
        price: 15.99,
        quantity: 2,
      },
    ];

    localStorage.setItem('octocat-cart', JSON.stringify(testCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual(testCart);
    expect(result.current.itemCount).toBe(2);
  });

  it('handles invalid localStorage data gracefully', () => {
    localStorage.setItem('octocat-cart', 'invalid json');

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual([]);
  });

  it('useCart throws error outside provider', () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within a CartProvider');
  });

  it('updateItemQuantity updates item quantity', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Test Product',
        price: 10.99,
      });
    });

    act(() => {
      result.current.updateItemQuantity(1, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.itemCount).toBe(5);
  });

  it('updateItemQuantity removes item when quantity is 0', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addItem({
        productId: 1,
        name: 'Test Product',
        price: 10.99,
      });
    });

    act(() => {
      result.current.updateItemQuantity(1, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });
});
