# Technical Design Document (TDD) - Cart Feature Implementation

**Document Version**: 1.0  
**Last Updated**: January 27, 2026  
**Feature**: Cart Icon with Item Count Badge  
**System**: OctoCAT Supply Chain Management

---

## 1. Executive Summary

This document provides detailed technical specifications for implementing the missing Cart Icon feature in the OctoCAT Supply Chain application. The feature will enable users to visualize their cart state through an icon with a badge displaying the item count in the navigation header.

**Scope**: Frontend cart implementation with localStorage persistence (Phase 1)

**Out of Scope**: Backend API cart implementation (deferred to Phase 2)

---

## 2. Component Design

### 2.1 CartIcon Component

#### 2.1.1 Component Specification

**File Location**: `frontend/src/components/cart/CartIcon.tsx`

**Purpose**: Display a shopping cart icon with a badge showing the current number of items in the cart.

**Component Type**: Presentational/Dumb Component

#### 2.1.2 Props Interface

```typescript
interface CartIconProps {
  itemCount: number;          // Total number of items in cart
  onClick: () => void;        // Click handler (navigate to cart)
  className?: string;         // Additional Tailwind classes (optional)
}
```

#### 2.1.3 Component Structure

```tsx
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export interface CartIconProps {
  itemCount: number;
  onClick: () => void;
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-opacity hover:opacity-80 ${className}`}
      aria-label={`Shopping cart with ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
      type="button"
    >
      <ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
      
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center"
          aria-live="polite"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default React.memo(CartIcon);
```

#### 2.1.4 Visual Design Specifications

**Icon:**
- Size: 24px × 24px (Tailwind: `w-6 h-6`)
- Icon Library: Heroicons v2 (outline style)
- Icon Name: `ShoppingCartIcon`
- Color (Light Mode): `text-gray-700`
- Color (Dark Mode): `text-gray-200`

**Badge:**
- Shape: Circular
- Size: Minimum width 20px, height 20px (`min-w-5 h-5`)
- Background: Red (`bg-red-500`, #ef4444)
- Text Color: White (`text-white`)
- Font Size: Extra small (`text-xs`)
- Font Weight: Bold (`font-bold`)
- Position: Absolute, top-right corner (`-top-1 -right-1`)
- Display Logic: Only visible when `itemCount > 0`
- Badge Content: 
  - Show actual count if ≤ 99
  - Show "99+" if > 99

**Button Container:**
- Padding: 8px (`p-2`)
- Border Radius: Full circle (`rounded-full`)
- Focus Ring: 2px, primary color (`focus:ring-2 focus:ring-primary`)
- Hover State: Opacity 80% (`hover:opacity-80`)
- Transition: Smooth opacity change (`transition-opacity`)

#### 2.1.5 Accessibility Features

- **ARIA Label**: Dynamic label indicating item count
  - Example: "Shopping cart with 3 items"
  - Singular: "Shopping cart with 1 item"
  - Empty: "Shopping cart with 0 items"

- **ARIA Live Region**: Badge has `aria-live="polite"` for screen reader announcements

- **Keyboard Navigation**:
  - Focusable via Tab key
  - Activatable via Enter/Space keys
  - Visible focus indicator (focus ring)

- **Color Contrast**: 
  - Icon passes WCAG AA (4.5:1 contrast ratio)
  - Badge white-on-red passes AAA (>7:1 contrast ratio)

#### 2.1.6 Performance Optimizations

- **Memoization**: Component wrapped in `React.memo()` to prevent unnecessary re-renders
- **Conditional Rendering**: Badge only rendered when `itemCount > 0`

---

### 2.2 CartContext - State Management

#### 2.2.1 Context Specification

**File Location**: `frontend/src/context/CartContext.tsx`

**Purpose**: Manage global cart state, provide cart operations, and persist cart data to localStorage.

#### 2.2.2 Data Structures

```typescript
// Cart Item Interface
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgName?: string;
  sku: string;
}

// Cart State Interface
export interface CartState {
  items: CartItem[];
}

// Cart Context Type
export interface CartContextType {
  items: CartItem[];
  itemCount: number;              // Total number of items (sum of quantities)
  totalPrice: number;             // Total cart value
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Product interface (from Products component)
export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  sku: string;
  unit: string;
  supplierId: number;
  discount?: number;
}
```

#### 2.2.3 Context Implementation

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'octocat-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        // Validate cart structure
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  // Calculate total item count (sum of quantities)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Add item to cart (or increase quantity if already exists)
  const addItem = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.productId === product.productId);
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // New item, add to cart
        const newItem: CartItem = {
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity,
          imgName: product.imgName,
          sku: product.sku,
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Remove item from cart
  const removeItem = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
  };

  const value: CartContextType = {
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
```

#### 2.2.4 State Management Logic

**Add Item Logic:**
1. Check if item already exists in cart (by `productId`)
2. If exists: Increase quantity by the specified amount
3. If new: Create new CartItem object and add to items array
4. Trigger useEffect to save to localStorage

**Remove Item Logic:**
1. Filter out item with matching `productId`
2. Trigger useEffect to save to localStorage

**Update Quantity Logic:**
1. If quantity ≤ 0: Call `removeItem()`
2. Otherwise: Update quantity for matching item
3. Trigger useEffect to save to localStorage

**Clear Cart Logic:**
1. Set items to empty array
2. Trigger useEffect to save to localStorage (empty cart)

#### 2.2.5 localStorage Persistence

**Storage Key**: `'octocat-cart'`

**Data Format**: JSON string of `CartItem[]`

**Save Trigger**: Automatic via `useEffect` whenever `items` changes

**Load Trigger**: On component mount (app initialization)

**Error Handling**:
- Wrap `JSON.parse()` in try-catch
- If parse fails, clear localStorage key
- If invalid structure (not array), ignore and start fresh

#### 2.2.6 Performance Considerations

- **Memoization**: Cart calculations (`itemCount`, `totalPrice`) are computed inline (React will recompute on state change)
- **localStorage**: Synchronous operations (fast, but blocks thread)
- **Optimization Opportunity**: Debounce localStorage writes if performance issues arise

---

### 2.3 Header/Navigation Integration

#### 2.3.1 Current Header Structure Analysis

**File**: `frontend/src/components/Navigation.tsx`

**Current Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo + Brand]  [Nav Links]  [Theme Toggle] [Login/Logout] │
└─────────────────────────────────────────────────────────────┘
```

**Target Layout:**
```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo + Brand]  [Nav Links]  [Cart Icon] [Theme Toggle] [Login]   │
└────────────────────────────────────────────────────────────────────┘
```

#### 2.3.2 Integration Steps

**1. Import Statements:**
```typescript
import CartIcon from './cart/CartIcon';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
```

**2. Hook Usage:**
```typescript
export default function Navigation() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { itemCount } = useCart();  // NEW
  const navigate = useNavigate();   // NEW
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  // NEW: Cart icon click handler
  const handleCartClick = () => {
    navigate('/cart');
  };

  // ... rest of component
}
```

**3. Component Placement:**
```tsx
<div className="flex items-center space-x-4">
  {/* NEW: Cart Icon */}
  <CartIcon itemCount={itemCount} onClick={handleCartClick} />
  
  {/* Existing theme toggle */}
  <button onClick={toggleTheme}>...</button>
  
  {/* Existing login/logout */}
  {isLoggedIn ? ... : ...}
</div>
```

#### 2.3.3 Positioning & Styling

**Position in DOM**: Between navigation links and theme toggle button

**Responsive Behavior**:
- Desktop (>= 768px): Visible inline with other header items
- Mobile (< 768px): Include in mobile menu (future enhancement)

**Spacing**: Uses existing `space-x-4` (16px horizontal gap)

---

### 2.4 Products Component Integration

#### 2.4.1 Current Implementation Analysis

**File**: `frontend/src/components/entity/product/Products.tsx`

**Current `handleAddToCart` Function:**
```typescript
const handleAddToCart = (productId: number) => {
  const quantity = quantities[productId] || 0;
  if (quantity > 0) {
    // TODO: Implement cart functionality
    alert(`Added ${quantity} items to cart`);
    setQuantities((prev) => ({
      ...prev,
      [productId]: 0,
    }));
  }
};
```

**Problems:**
1. Uses browser `alert()` (poor UX)
2. Resets quantity to 0 (data loss)
3. No cart state update
4. No persistence

#### 2.4.2 Updated Implementation

**1. Import Statements:**
```typescript
import { useCart } from '../../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
```

**2. Hook Usage:**
```typescript
export default function Products() {
  const { addItem } = useCart();  // NEW
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { data: products, isLoading, error } = useQuery('products', fetchProducts);
  const { darkMode } = useTheme();
  // ... rest of state
}
```

**3. Updated `handleAddToCart` Function:**
```typescript
const handleAddToCart = (productId: number) => {
  const quantity = quantities[productId] || 0;
  if (quantity > 0) {
    // Find the product
    const product = products?.find((p) => p.productId === productId);
    if (!product) {
      toast.error('Product not found');
      return;
    }

    // Add to cart via context
    addItem(product, quantity);

    // Show success toast
    toast.success(`Added ${quantity} ${product.name} to cart`, {
      duration: 3000,
      position: 'top-right',
    });

    // Reset quantity for this product
    setQuantities((prev) => ({
      ...prev,
      [productId]: 0,
    }));
  }
};
```

**4. Add Toaster Component:**
```tsx
return (
  <div className={`min-h-screen ...`}>
    {/* Toast container */}
    <Toaster />
    
    {/* Rest of component */}
    <div className="max-w-7xl mx-auto">
      {/* Product grid */}
    </div>
  </div>
);
```

#### 2.4.3 Toast Notification Specifications

**Library**: react-hot-toast

**Installation**:
```bash
npm install react-hot-toast
```

**Configuration**:
- Duration: 3000ms (3 seconds)
- Position: `top-right`
- Style: Default (auto adapts to dark mode)

**Toast Messages**:
- Success: `"Added {quantity} {productName} to cart"`
- Error: `"Product not found"` (edge case)

---

## 3. Cart Page Component Design

### 3.1 Component Specification

**File Location**: `frontend/src/components/cart/Cart.tsx`

**Purpose**: Display all cart items, allow quantity updates, and provide checkout navigation.

### 3.2 Component Structure

```tsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const { items, itemCount, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  if (itemCount === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4`}>
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
            Your Cart is Empty
          </h1>
          <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Start shopping to add items to your cart!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-md font-medium"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 pb-16`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
            Shopping Cart ({itemCount} items)
          </h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Items */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
          {items.map((item) => (
            <div
              key={item.productId}
              className={`flex items-center p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} last:border-b-0`}
            >
              {/* Product Image */}
              <img
                src={`/${item.imgName}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />

              {/* Product Info */}
              <div className="flex-1 ml-4">
                <h3 className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                  {item.name}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  ${item.price.toFixed(2)} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className={`w-8 h-8 rounded-md ${darkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-gray-800'} hover:opacity-80`}
                >
                  -
                </button>
                <span className={`w-12 text-center ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className={`w-8 h-8 rounded-md ${darkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-gray-800'} hover:opacity-80`}
                >
                  +
                </button>
              </div>

              {/* Item Total */}
              <div className={`ml-6 font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.productId)}
                className="ml-4 p-2 text-red-500 hover:text-red-700"
                aria-label={`Remove ${item.name} from cart`}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
              Total:
            </span>
            <span className={`text-2xl font-bold ${darkMode ? 'text-primary' : 'text-primary'}`}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-primary hover:bg-accent text-white py-3 rounded-md font-medium text-lg"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => navigate('/products')}
            className={`w-full mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-primary py-2 font-medium`}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 3.3 Cart Page Features

**Empty Cart State:**
- Message: "Your Cart is Empty"
- Call-to-action: "Browse Products" button
- Navigation: Redirects to `/products`

**Cart Items Display:**
- Product image (80x80px)
- Product name
- Price per unit
- Quantity controls (+ and - buttons)
- Item subtotal (price × quantity)
- Remove button (trash icon)

**Cart Summary:**
- Total item count in heading
- Total price (sum of all items)
- "Proceed to Checkout" button
- "Continue Shopping" link
- "Clear Cart" button

**Responsive Design:**
- Mobile: Stack items vertically
- Desktop: Horizontal layout with all info visible

---

## 4. Routing Configuration

### 4.1 App.tsx Route Updates

**File**: `frontend/src/App.tsx`

**Add Cart Import:**
```typescript
import Cart from './components/cart/Cart';
```

**Add Cart Route:**
```tsx
<Routes>
  <Route path="/" element={<Welcome />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products />} />
  <Route path="/cart" element={<Cart />} />  {/* NEW */}
  <Route path="/login" element={<Login />} />
  <Route path="/admin/products" element={<AdminProducts />} />
</Routes>
```

### 4.2 CartProvider Integration

**Update App.tsx Provider Hierarchy:**
```tsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>  {/* NEW */}
          <ThemedApp />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

**Import Statement:**
```typescript
import { CartProvider } from './context/CartContext';
```

---

## 5. Implementation Gaps & Solutions

### 5.1 Frontend Gaps

| Gap | Component | Solution |
|-----|-----------|----------|
| **Cart State** | Missing | Create CartContext with localStorage |
| **Cart Icon** | Missing | Create CartIcon component |
| **Cart Page** | Missing | Create Cart component |
| **Navigation Integration** | Missing | Add CartIcon to Navigation |
| **Product Integration** | Incomplete | Update handleAddToCart to use context |
| **Toast Notifications** | Missing | Install react-hot-toast, add Toaster |
| **Cart Route** | Missing | Add /cart route in App.tsx |
| **Provider Setup** | Missing | Wrap app in CartProvider |

### 5.2 Missing Dependencies

**npm Packages to Install:**

1. **react-hot-toast** (Toast notifications)
   ```bash
   cd frontend
   npm install react-hot-toast
   ```

2. **@heroicons/react** (Already installed based on existing code)
   - ShoppingCartIcon
   - TrashIcon

---

## 6. Testing Strategy

### 6.1 Unit Tests

**CartContext Tests** (`frontend/src/context/CartContext.test.tsx`):
- Test `addItem()`: New item added correctly
- Test `addItem()`: Existing item quantity incremented
- Test `removeItem()`: Item removed from cart
- Test `updateQuantity()`: Quantity updated correctly
- Test `updateQuantity()`: Item removed when quantity = 0
- Test `clearCart()`: All items removed
- Test `itemCount`: Correct sum of quantities
- Test `totalPrice`: Correct price calculation
- Test localStorage persistence: Cart saved and loaded

**CartIcon Tests** (`frontend/src/components/cart/CartIcon.test.tsx`):
- Test badge visibility: Hidden when count = 0
- Test badge visibility: Visible when count > 0
- Test badge content: Shows correct count
- Test badge content: Shows "99+" when count > 99
- Test onClick handler: Calls function when clicked
- Test accessibility: ARIA label is correct
- Test keyboard navigation: Enter/Space triggers onClick

**Cart Page Tests** (`frontend/src/components/cart/Cart.test.tsx`):
- Test empty cart state: Shows empty message
- Test cart items display: All items rendered
- Test quantity controls: + and - buttons work
- Test remove button: Item removed from cart
- Test clear cart button: All items removed
- Test total calculation: Correct total displayed

### 6.2 Integration Tests

**Products → Cart Flow:**
1. Add product to cart from Products page
2. Verify CartIcon badge updates
3. Navigate to Cart page
4. Verify product appears in cart
5. Verify quantity matches

**Cart → Navigation → Cart Flow:**
1. Add items to cart
2. Navigate away from cart
3. Click CartIcon in header
4. Verify cart page shows same items

**localStorage Persistence:**
1. Add items to cart
2. Refresh page
3. Verify cart items persisted
4. Verify CartIcon badge shows correct count

### 6.3 E2E Tests (Playwright)

**Test Scenarios:**
1. User adds product to cart and sees badge update
2. User clicks cart icon and navigates to cart page
3. User updates quantity in cart
4. User removes item from cart
5. User clears entire cart
6. User refreshes page and cart persists

---

## 7. Performance Considerations

### 7.1 Rendering Optimizations

- **CartIcon**: Memoized with `React.memo()`
- **Context Updates**: Only re-render components consuming changed context values
- **localStorage**: Synchronous, but fast (< 10ms for typical cart size)

### 7.2 Bundle Size Impact

| Addition | Size |
|----------|------|
| react-hot-toast | ~3.5 KB (gzipped) |
| @heroicons/react | ~2 KB per icon (tree-shaken) |
| CartContext | ~2 KB |
| CartIcon | ~1 KB |
| Cart Page | ~3 KB |
| **Total** | **~12 KB** |

---

## 8. Accessibility Checklist

- ✅ **ARIA Labels**: CartIcon has dynamic aria-label
- ✅ **ARIA Live Regions**: Badge has aria-live="polite"
- ✅ **Keyboard Navigation**: All interactive elements focusable
- ✅ **Focus Indicators**: Visible focus rings on buttons
- ✅ **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- ✅ **Semantic HTML**: Proper button, heading, list elements
- ✅ **Screen Reader Support**: Descriptive labels and announcements

---

## 9. Dark Mode Support

### 9.1 Components with Dark Mode

| Component | Light Mode | Dark Mode |
|-----------|------------|-----------|
| **CartIcon** | `text-gray-700` | `text-gray-200` |
| **Cart Page Background** | `bg-gray-100` | `bg-dark` |
| **Cart Item Cards** | `bg-white` | `bg-gray-800` |
| **Text Color** | `text-gray-800` | `text-light` |
| **Borders** | `border-gray-200` | `border-gray-700` |

### 9.2 Implementation Pattern

```tsx
className={`${darkMode ? 'bg-dark text-light' : 'bg-white text-gray-800'}`}
```

---

## 10. Error Handling

### 10.1 CartContext Error Scenarios

| Scenario | Handling |
|----------|----------|
| **localStorage unavailable** | Log error, continue with in-memory cart |
| **Invalid JSON in localStorage** | Clear localStorage, start fresh |
| **localStorage quota exceeded** | Log error, continue without persistence |

### 10.2 Component Error Scenarios

| Scenario | Handling |
|----------|----------|
| **useCart outside provider** | Throw error with helpful message |
| **Product not found** | Show toast error message |
| **Negative quantity** | Remove item from cart |

---

## 11. Browser Compatibility

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- localStorage API
- ES6 JavaScript
- React 18 features

---

## 12. Implementation Checklist

### 12.1 Frontend Tasks

- [ ] Install react-hot-toast dependency
- [ ] Create `frontend/src/context/CartContext.tsx`
- [ ] Create `frontend/src/components/cart/CartIcon.tsx`
- [ ] Create `frontend/src/components/cart/Cart.tsx`
- [ ] Update `frontend/src/App.tsx`:
  - [ ] Add CartProvider
  - [ ] Add /cart route
- [ ] Update `frontend/src/components/Navigation.tsx`:
  - [ ] Import CartIcon and useCart
  - [ ] Add CartIcon component
  - [ ] Add cart click handler
- [ ] Update `frontend/src/components/entity/product/Products.tsx`:
  - [ ] Import useCart hook
  - [ ] Update handleAddToCart function
  - [ ] Add Toaster component
  - [ ] Replace alert with toast
- [ ] Write unit tests for CartContext
- [ ] Write unit tests for CartIcon
- [ ] Write unit tests for Cart page
- [ ] Write integration tests
- [ ] Verify dark mode support
- [ ] Verify accessibility compliance
- [ ] Test on multiple browsers

---

## 13. Future Enhancements (Phase 2)

### 13.1 Backend API Integration

**Database:**
- Create `cart_items` table
- Store cart items by session/user

**API Endpoints:**
- `GET /api/cart` - Get cart items
- `POST /api/cart/items` - Add item
- `PUT /api/cart/items/:id` - Update quantity
- `DELETE /api/cart/items/:id` - Remove item
- `DELETE /api/cart` - Clear cart

**Frontend Changes:**
- Update CartContext to sync with API
- Optimistic UI updates
- Error handling for API failures

### 13.2 Advanced Features

- Cart expiry (auto-clear after X days)
- Product availability check before adding
- Stock quantity validation
- Cart merging (guest → logged-in user)
- Save for later functionality
- Cart sharing (social features)

---

## 14. Related Documentation

- **Investigation**: `docs/investigation/cart-issue-analysis.md`
- **HLD**: `docs/knowledge-repository/high-level-design.md`
- **Requirements**: `docs/knowledge-repository/current-requirements.md` (to be created)
- **Missing Requirements**: `docs/knowledge-repository/missing-requirements.md` (to be created)
- **Feature Specs**: `docs/specifications/cart-icon-feature-requirements.md` (to be created)

---

## 15. Appendix

### 15.1 File Structure After Implementation

```
frontend/src/
├── components/
│   ├── cart/
│   │   ├── CartIcon.tsx          # NEW
│   │   └── Cart.tsx               # NEW
│   ├── Navigation.tsx             # MODIFIED
│   └── entity/product/
│       └── Products.tsx           # MODIFIED
├── context/
│   ├── CartContext.tsx            # NEW
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
└── App.tsx                        # MODIFIED
```

### 15.2 Dependencies Summary

**New Dependencies:**
- `react-hot-toast: ^2.4.1`

**Existing Dependencies (Used):**
- `react: ^18.3.1`
- `react-router-dom: ^7.4.1`
- `@heroicons/react: (existing)`

---

**Document Status**: ✅ Complete  
**Next Document**: Current Requirements Document
