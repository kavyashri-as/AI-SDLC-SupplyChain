# Feature Requirements Document (FRD) - Cart Icon Feature
## Enriched & Comprehensive Requirements

**Document Version**: 1.0  
**Last Updated**: January 27, 2026  
**Feature**: Cart Icon with Item Count Badge  
**System**: OctoCAT Supply Chain Management  
**Phase**: 1 (Frontend Implementation)

---

## Document Overview

This document provides enriched, comprehensive requirements for implementing the missing Cart Icon feature in the OctoCAT Supply Chain application. All requirements include detailed user stories, acceptance criteria, technical specifications, dependencies, and priorities.

**Total Requirements**: 12 Core + 8 Supporting = 20 Requirements  
**Estimated Effort**: 8-10 Story Points (10-12 hours)

---

## REQUIREMENT: CART-ICON-001
### Create Cart Icon Component with Badge

**Priority**: Critical (P0)  
**Category**: UI Component  
**Estimated Effort**: 2 Story Points (2-3 hours)

#### User Story
> **As a** user  
> **I want** to see a cart icon in the header  
> **So that** I can access my cart and see how many items I've added

#### Description
Create a reusable CartIcon component that displays a shopping cart icon with an overlaid badge showing the current number of items in the cart. The badge should only appear when the cart contains items.

#### Acceptance Criteria
- [ ] Cart icon visible in header on all pages (top-right position)
- [ ] Badge displays current cart item count (sum of quantities)
- [ ] Badge updates immediately when items added/removed (< 100ms)
- [ ] Badge hidden when cart is empty (itemCount = 0)
- [ ] Badge shows "99+" when item count exceeds 99
- [ ] Icon uses consistent design system (Heroicons, 24px)
- [ ] Clicking icon navigates to /cart route
- [ ] Support dark mode (icon changes color)
- [ ] Responsive design (visible on mobile & desktop)
- [ ] Accessible (ARIA labels, keyboard navigation, screen reader support)

####Technical Implementation

**Component File**: `frontend/src/components/cart/CartIcon.tsx`

**Props Interface**:
```typescript
interface CartIconProps {
  itemCount: number;          // Total number of items in cart
  onClick: () => void;        // Click handler (navigate to cart)
  className?: string;         // Additional Tailwind classes (optional)
}
```

**Component Structure**:
```tsx
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

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

**Styling Specifications**:
- **Icon**: 24px × 24px, Heroicons ShoppingCartIcon (outline)
- **Icon Color (Light)**: `text-gray-700`
- **Icon Color (Dark)**: `text-gray-200`
- **Badge**: Circular, min 20px × 20px
- **Badge Background**: Red (`bg-red-500`, #ef4444)
- **Badge Text**: White, bold, extra small
- **Badge Position**: Absolute, top-right (-1px, -1px)
- **Hover**: Opacity 80%
- **Focus Ring**: 2px primary color

**Dependencies**:
- @heroicons/react (ShoppingCartIcon)
- CartContext (useCart hook for itemCount)
- React Router (useNavigate hook)

**Related Files**:
- Integrates with: `frontend/src/components/Navigation.tsx`
- Uses context from: `frontend/src/context/CartContext.tsx`

---

## REQUIREMENT: CART-ICON-002
### Implement Cart State Management (CartContext)

**Priority**: Critical (P0)  
**Category**: State Management  
**Estimated Effort**: 3 Story Points (3-4 hours)

#### User Story
> **As a** developer  
> **I want** a centralized cart state management solution  
> **So that** all components can access and modify cart data consistently

#### Description
Create a CartContext using React Context API to manage global cart state. The context will provide cart items, item count, total price, and methods for adding, removing, updating, and clearing cart items. Cart state will persist to localStorage.

#### Acceptance Criteria
- [ ] CartContext created with CartProvider component
- [ ] Cart state includes: items array, itemCount, totalPrice
- [ ] addItem() method: Adds new item or increments existing item quantity
- [ ] removeItem() method: Removes item from cart by productId
- [ ] updateQuantity() method: Updates item quantity (removes if ≤ 0)
- [ ] clearCart() method: Empties entire cart
- [ ] Cart saved to localStorage on every state change
- [ ] Cart loaded from localStorage on app initialization
- [ ] useCart() custom hook throws error if used outside provider
- [ ] Invalid localStorage data handled gracefully

#### Technical Implementation

**Component File**: `frontend/src/context/CartContext.tsx`

**Data Structures**:
```typescript
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgName?: string;
  sku: string;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
```

**Implementation Details**:
- **localStorage Key**: `'octocat-cart'`
- **Save Trigger**: useEffect on items change
- **Load Trigger**: useEffect on component mount
- **Error Handling**: Try-catch for JSON parse/stringify, clear on error

**State Calculations**:
```typescript
const itemCount = items.reduce((total, item) => total + item.quantity, 0);
const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
```

**Dependencies**:
- React (createContext, useContext, useState, useEffect)
- Product interface from Products component

**Related Files**:
- Used in: `frontend/src/App.tsx` (CartProvider wraps app)
- Used in: `frontend/src/components/Navigation.tsx` (useCart hook)
- Used in: `frontend/src/components/entity/product/Products.tsx` (addItem)
- Used in: `frontend/src/components/cart/Cart.tsx` (all methods)

---

## REQUIREMENT: CART-ICON-003
### Integrate CartIcon into Header/Navigation

**Priority**: Critical (P0)  
**Category**: UI Integration  
**Estimated Effort**: 1 Story Point (1 hour)

#### User Story
> **As a** user  
> **I want** the cart icon to appear in the navigation header  
> **So that** I can access my cart from any page

#### Description
Integrate the CartIcon component into the existing Navigation component, positioned between the navigation links and the theme toggle button. The icon should display the current cart item count and navigate to the cart page when clicked.

#### Acceptance Criteria
- [ ] CartIcon imported in Navigation.tsx
- [ ] useCart hook imported and used to get itemCount
- [ ] useNavigate hook imported for navigation
- [ ] CartIcon component added to header (right side, before theme toggle)
- [ ] handleCartClick function navigates to '/cart'
- [ ] Icon spacing consistent with existing nav items (space-x-4)
- [ ] Icon aligned vertically with other navigation elements
- [ ] No layout breaks on mobile or desktop
- [ ] Dark mode support maintained

#### Technical Implementation

**File to Modify**: `frontend/src/components/Navigation.tsx`

**Import Statements**:
```typescript
import CartIcon from './cart/CartIcon';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
```

**Hook Usage**:
```typescript
const { itemCount } = useCart();
const navigate = useNavigate();

const handleCartClick = () => {
  navigate('/cart');
};
```

**Component Placement**:
```tsx
<div className="flex items-center space-x-4">
  <CartIcon itemCount={itemCount} onClick={handleCartClick} />
  <button onClick={toggleTheme}>...</button>
  {isLoggedIn ? ... : ...}
</div>
```

**Dependencies**:
- CartIcon component
- CartContext (useCart hook)
- React Router (useNavigate)

---

## REQUIREMENT: CART-ICON-004
### Add Visual Feedback with Toast Notifications

**Priority**: High (P1)  
**Category**: User Experience  
**Estimated Effort**: 1 Story Point (1 hour)

#### User Story
> **As a** user  
> **I want** to see a confirmation message when I add an item to my cart  
> **So that** I know my action was successful

#### Description
Replace the existing browser alert() with a modern toast notification system using react-hot-toast. Toast notifications should appear in the top-right corner, show the product name and quantity added, and auto-dismiss after 3 seconds.

#### Acceptance Criteria
- [ ] react-hot-toast library installed
- [ ] Toast notification appears when item added successfully
- [ ] Toast shows: "Added {quantity} {productName} to cart"
- [ ] Toast auto-dismisses after 3 seconds
- [ ] Toast appears in top-right corner
- [ ] Toast works in both dark and light modes
- [ ] Toast is non-blocking (doesn't prevent other actions)
- [ ] Multiple toasts stack vertically
- [ ] Toast is accessible (screen reader announces)
- [ ] Error toast shown if product not found

#### Technical Implementation

**Installation**:
```bash
cd frontend
npm install react-hot-toast
```

**File to Modify**: `frontend/src/components/entity/product/Products.tsx`

**Import Statements**:
```typescript
import { useCart } from '../../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
```

**Updated handleAddToCart Function**:
```typescript
const handleAddToCart = (productId: number) => {
  const quantity = quantities[productId] || 0;
  if (quantity > 0) {
    const product = products?.find((p) => p.productId === productId);
    if (!product) {
      toast.error('Product not found');
      return;
    }

    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`, {
      duration: 3000,
      position: 'top-right',
    });

    setQuantities((prev) => ({ ...prev, [productId]: 0 }));
  }
};
```

**Add Toaster Component**:
```tsx
return (
  <div className={`min-h-screen ...`}>
    <Toaster />  {/* Add this */}
    {/* Rest of component */}
  </div>
);
```

**Dependencies**:
- react-hot-toast library
- CartContext (addItem method)

---

## REQUIREMENT: CART-ICON-005
### Create Cart Page Component

**Priority**: Critical (P0)  
**Category**: UI Component  
**Estimated Effort**: 2 Story Points (2-3 hours)

#### User Story
> **As a** user  
> **I want** to view all items in my cart on a dedicated page  
> **So that** I can review and edit my selections before checkout

#### Description
Create a Cart page component that displays all cart items with images, names, prices, and quantities. Users should be able to update quantities, remove items, and see the total cart value. An empty cart state should encourage users to browse products.

#### Acceptance Criteria
- [ ] Cart page component created at `frontend/src/components/cart/Cart.tsx`
- [ ] All cart items displayed in a list with product details
- [ ] Each item shows: image, name, price, quantity, subtotal
- [ ] Quantity controls (+ and - buttons) functional
- [ ] Remove button (trash icon) deletes item
- [ ] Total item count displayed in heading
- [ ] Total cart value displayed prominently
- [ ] "Clear Cart" button empties entire cart
- [ ] Empty cart state shown when no items
- [ ] Empty state includes: message and "Browse Products" CTA
- [ ] "Continue Shopping" link navigates to /products
- [ ] "Proceed to Checkout" button (navigates to /checkout - placeholder)
- [ ] Responsive design (mobile and desktop)
- [ ] Dark mode support

#### Technical Implementation

**Component File**: `frontend/src/components/cart/Cart.tsx`

**Features**:
- **Empty State**: Message, image (optional), CTA button
- **Cart Items List**: Product cards with controls
- **Quantity Controls**: + and - buttons
- **Remove Button**: TrashIcon from Heroicons
- **Cart Summary**: Total items, total price
- **Action Buttons**: Clear Cart, Continue Shopping, Checkout

**Dependencies**:
- CartContext (items, itemCount, totalPrice, updateQuantity, removeItem, clearCart)
- React Router (useNavigate)
- ThemeContext (darkMode)
- @heroicons/react (TrashIcon)

**Related Files**:
- Route added in: `frontend/src/App.tsx`

---

## REQUIREMENT: CART-ICON-006
### Configure Cart Route and Provider

**Priority**: Critical (P0)  
**Category**: Routing & Configuration  
**Estimated Effort**: 0.5 Story Points (30 minutes)

#### User Story
> **As a** developer  
> **I want** the cart page accessible via /cart route  
> **So that** users can navigate to their cart

#### Description
Add the /cart route to the application's React Router configuration and wrap the app in CartProvider to make cart state available to all components.

#### Acceptance Criteria
- [ ] /cart route added to App.tsx
- [ ] /cart route renders Cart component
- [ ] CartProvider wraps app in provider hierarchy
- [ ] Provider order: AuthProvider → ThemeProvider → CartProvider → App
- [ ] Route accessible by typing URL directly
- [ ] Route accessible via navigation
- [ ] Browser back button works correctly

#### Technical Implementation

**File to Modify**: `frontend/src/App.tsx`

**Imports**:
```typescript
import Cart from './components/cart/Cart';
import { CartProvider } from './context/CartContext';
```

**Add Route**:
```tsx
<Routes>
  <Route path="/" element={<Welcome />} />
  <Route path="/products" element={<Products />} />
  <Route path="/cart" element={<Cart />} />  {/* NEW */}
  {/* ... other routes */}
</Routes>
```

**Add Provider**:
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

---

## REQUIREMENT: CART-ICON-007
### Implement Accessibility Features

**Priority**: High (P1)  
**Category**: Accessibility  
**Estimated Effort**: 1 Story Point (1-2 hours)

#### User Story
> **As a** user with disabilities  
> **I want** the cart feature to be accessible  
> **So that** I can use it with assistive technologies

#### Description
Ensure all cart components meet WCAG 2.1 Level AA accessibility standards, including proper ARIA labels, keyboard navigation, screen reader support, and color contrast.

#### Acceptance Criteria
- [ ] CartIcon has dynamic aria-label: "Shopping cart with X item(s)"
- [ ] Cart badge has aria-live="polite" for count announcements
- [ ] All interactive elements keyboard accessible (Tab, Enter, Space)
- [ ] Visible focus indicators on all focusable elements
- [ ] Color contrast ≥ 4.5:1 (WCAG AA) for icon and text
- [ ] Color contrast ≥ 7:1 (WCAG AAA) for badge (white on red)
- [ ] Screen reader announces cart count changes
- [ ] Remove buttons have aria-label: "Remove {productName} from cart"
- [ ] Quantity buttons have aria-label: "Increase/Decrease quantity"
- [ ] Semantic HTML elements used (button, heading, list)
- [ ] No accessibility violations in axe-core tests

#### Technical Implementation

**ARIA Labels**:
- Cart icon: Dynamic label with count
- Badge: aria-live for announcements
- Buttons: Descriptive labels for actions

**Keyboard Navigation**:
- All buttons focusable
- Tab order logical
- Enter/Space trigger actions

**Color Contrast**:
- Verify with Axe DevTools or WAVE
- Test in light and dark modes

**Testing**:
- Manual testing with NVDA/JAWS/VoiceOver
- Automated testing with axe-core

---

## REQUIREMENT: CART-ICON-008
### Persist Cart State with localStorage

**Priority**: High (P1)  
**Category**: Data Persistence  
**Estimated Effort**: 1 Story Point (1 hour)

#### User Story
> **As a** user  
> **I want** my cart to persist when I refresh the page  
> **So that** I don't lose my selected items

#### Description
Implement cart persistence using browser localStorage. Cart data should be saved automatically on every change and loaded when the application initializes.

#### Acceptance Criteria
- [ ] Cart items saved to localStorage on every change
- [ ] Cart items loaded from localStorage on app initialization
- [ ] localStorage key: `'octocat-cart'`
- [ ] Data format: JSON string of CartItem array
- [ ] Cart icon shows correct item count after page refresh
- [ ] Cart works across browser tabs (same cart data)
- [ ] Invalid localStorage data handled gracefully (cleared, not crashed)
- [ ] JSON.parse errors caught and handled
- [ ] localStorage quota exceeded errors caught
- [ ] Empty cart initialized if no saved data

#### Technical Implementation

**localStorage Operations**:
```typescript
// Save to localStorage
useEffect(() => {
  try {
    localStorage.setItem('octocat-cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
}, [items]);

// Load from localStorage
useEffect(() => {
  try {
    const savedCart = localStorage.getItem('octocat-cart');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        setItems(parsedCart);
      }
    }
  } catch (error) {
    console.error('Failed to load cart:', error);
    localStorage.removeItem('octocat-cart');
  }
}, []);
```

**Error Handling**:
- Try-catch for JSON.parse (invalid JSON)
- Type validation (ensure array)
- Quota exceeded handling
- Clear invalid data

---

## REQUIREMENT: CART-ICON-009
### Write Unit Tests for Cart Components

**Priority**: High (P1)  
**Category**: Testing  
**Estimated Effort**: 2 Story Points (2-3 hours)

#### User Story
> **As a** developer  
> **I want** comprehensive unit tests for cart components  
> **So that** I can ensure code quality and prevent regressions

#### Description
Write unit tests for CartContext, CartIcon, and Cart page components using Vitest and React Testing Library. Tests should cover all cart operations, edge cases, and component behaviors.

#### Acceptance Criteria
- [ ] CartContext tests written (`CartContext.test.tsx`)
- [ ] CartIcon component tests written (`CartIcon.test.tsx`)
- [ ] Cart page component tests written (`Cart.test.tsx`)
- [ ] Test coverage ≥ 80% for cart components
- [ ] All edge cases tested (empty cart, qty = 0, invalid data)
- [ ] All tests passing
- [ ] Tests run in CI/CD pipeline

#### Test Coverage

**CartContext Tests**:
- addItem: New item added correctly
- addItem: Existing item quantity incremented
- removeItem: Item removed from cart
- updateQuantity: Quantity updated correctly
- updateQuantity: Item removed when qty ≤ 0
- clearCart: All items removed
- itemCount: Correct sum calculated
- totalPrice: Correct total calculated
- localStorage: Save and load operations

**CartIcon Tests**:
- Badge hidden when itemCount = 0
- Badge visible when itemCount > 0
- Badge shows correct count
- Badge shows "99+" when count > 99
- onClick handler called when clicked
- aria-label is correct
- Keyboard navigation works

**Cart Page Tests**:
- Empty cart state displayed when no items
- All cart items rendered
- Quantity controls work (+/-)
- Remove button deletes item
- Clear cart button empties cart
- Total calculation correct

---

## REQUIREMENT: CART-ICON-010
### Write Integration Tests

**Priority**: Medium (P2)  
**Category**: Testing  
**Estimated Effort**: 1 Story Point (1-2 hours)

#### User Story
> **As a** developer  
> **I want** integration tests for cart flow  
> **So that** I can ensure components work together correctly

#### Description
Write integration tests that verify the end-to-end cart flow: adding items from Products page, updating cart icon badge, navigating to cart page, and modifying cart contents.

#### Acceptance Criteria
- [ ] Integration test file created (`cart-integration.test.tsx`)
- [ ] Test: Add product → Badge updates → Navigate to cart
- [ ] Test: Update quantity in cart → Badge updates
- [ ] Test: Remove item → Badge decrements
- [ ] Test: Clear cart → Badge disappears
- [ ] Test: localStorage persistence across sessions
- [ ] All tests passing

#### Test Scenarios

**Flow Tests**:
1. User adds product from Products page
2. CartIcon badge updates immediately
3. User clicks cart icon
4. Cart page displays added product
5. User updates quantity
6. Badge updates to reflect change
7. User removes item
8. Badge decrements
9. User refreshes page
10. Cart persists (localStorage)

---

## REQUIREMENT: CART-ICON-011
### Implement Dark Mode Support

**Priority**: Medium (P2)  
**Category**: UI/UX  
**Estimated Effort**: 0.5 Story Points (30 minutes)

#### User Story
> **As a** user  
> **I want** the cart icon to adapt to dark mode  
> **So that** the interface remains consistent

#### Description
Ensure all cart components (CartIcon, Cart page) support the application's existing dark mode theme, with appropriate color changes for backgrounds, text, and borders.

#### Acceptance Criteria
- [ ] CartIcon changes color in dark mode
- [ ] Cart page background changes in dark mode
- [ ] All text readable in dark mode
- [ ] Borders visible in dark mode
- [ ] Badge remains highly visible in both modes
- [ ] Smooth transitions when theme toggled (< 300ms)
- [ ] Consistent with existing dark mode patterns

#### Implementation

**CartIcon Dark Mode**:
```tsx
<ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
```

**Cart Page Dark Mode**:
```tsx
className={`${darkMode ? 'bg-dark text-light' : 'bg-white text-gray-800'}`}
```

**Pattern**:
- Use `darkMode` from ThemeContext
- Apply conditional Tailwind classes
- Match existing component patterns

---

## REQUIREMENT: CART-ICON-012
### Create Cart Component Documentation

**Priority**: Low (P3)  
**Category**: Documentation  
**Estimated Effort**: 0.5 Story Points (30 minutes)

#### User Story
> **As a** developer  
> **I want** documentation for cart components  
> **So that** I can understand and maintain the code

#### Description
Create README files and inline JSDoc comments for cart components, documenting component APIs, props, usage examples, and architecture decisions.

#### Acceptance Criteria
- [ ] README.md created in `frontend/src/components/cart/`
- [ ] CartIcon component has JSDoc comments
- [ ] CartContext has JSDoc comments and usage examples
- [ ] Cart page component has JSDoc comments
- [ ] Props interfaces documented with TSDoc
- [ ] Architecture decisions documented
- [ ] Code examples provided

---

## Implementation Summary

### Files to Create (8)
1. `frontend/src/context/CartContext.tsx` - Cart state management
2. `frontend/src/components/cart/CartIcon.tsx` - Cart icon component
3. `frontend/src/components/cart/Cart.tsx` - Cart page component
4. `frontend/src/context/CartContext.test.tsx` - CartContext tests
5. `frontend/src/components/cart/CartIcon.test.tsx` - CartIcon tests
6. `frontend/src/components/cart/Cart.test.tsx` - Cart page tests
7. `frontend/src/components/cart/cart-integration.test.tsx` - Integration tests
8. `frontend/src/components/cart/README.md` - Documentation

### Files to Modify (3)
1. `frontend/src/App.tsx` - Add CartProvider, add /cart route
2. `frontend/src/components/Navigation.tsx` - Integrate CartIcon
3. `frontend/src/components/entity/product/Products.tsx` - Update handleAddToCart, add toast

### Dependencies to Install (1)
1. `react-hot-toast` - Toast notification library

---

## Effort Estimation

| Requirement | Effort (SP) | Time (hrs) |
|-------------|-------------|------------|
| CART-ICON-001 | 2 | 2-3 |
| CART-ICON-002 | 3 | 3-4 |
| CART-ICON-003 | 1 | 1 |
| CART-ICON-004 | 1 | 1 |
| CART-ICON-005 | 2 | 2-3 |
| CART-ICON-006 | 0.5 | 0.5 |
| CART-ICON-007 | 1 | 1-2 |
| CART-ICON-008 | 1 | 1 |
| CART-ICON-009 | 2 | 2-3 |
| CART-ICON-010 | 1 | 1-2 |
| CART-ICON-011 | 0.5 | 0.5 |
| CART-ICON-012 | 0.5 | 0.5 |
| **TOTAL** | **15.5** | **17-23** |

**Recommended Sprint**: 1 sprint (2 weeks)

---

## Related Documentation

- **Investigation**: `docs/investigation/cart-issue-analysis.md`
- **HLD**: `docs/knowledge-repository/high-level-design.md`
- **TDD**: `docs/knowledge-repository/technical-design-document.md`
- **Current Requirements**: `docs/knowledge-repository/current-requirements.md`
- **Missing Requirements**: `docs/knowledge-repository/missing-requirements.md`
- **GitHub Issue**: `docs/github-issue-draft.md` (to be created)

---

**Document Status**: ✅ Complete  
**Ready for**: GitHub Issue Creation & Implementation
