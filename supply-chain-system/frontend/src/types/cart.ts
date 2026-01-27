/**
 * Cart Types
 * TypeScript interfaces for cart-related data structures
 */

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  sku?: string;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
}

export interface CartContextType extends CartState {
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
