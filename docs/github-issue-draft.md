# [FEATURE] Implement Missing Cart Icon with Item Count Badge

## 🎯 Feature Request

### Problem Description

**What**: Cart icon is not visible in the application header  
**When**: After users add items to cart from Products page  
**Impact**: **Critical** - Users cannot see their cart or proceed to checkout  
**Repository**: OctoCAT Supply Chain Management System

### Current Behavior

1. ✅ Users can add products to cart (button exists on Products page)
2. ❌ No visual feedback showing cart icon in header
3. ❌ No way to see cart contents or item count
4. ❌ No way to navigate to cart/checkout page
5. ❌ Only browser alert appears: "Added X items to cart"
6. ❌ Cart state not persisted (data lost on refresh)
7. ❌ Users don't know if items were added successfully

### Expected Behavior

- ✅ Cart icon visible in header on all pages
- ✅ Badge showing number of items in cart
- ✅ Icon updates immediately when items added/removed
- ✅ Clicking icon navigates to cart page
- ✅ Visual feedback when adding items (toast notification)
- ✅ Cart state persists across page refreshes

### Environment

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, SQLite
- **Repository**: `CanarysPlayground/ai-sdlc-brownfield-workshop/supply-chain-system`
- **Affected Pages**: All pages (Home, Products, About, etc.)

---

## 📋 Requirements

### CART-ICON-001: Create Cart Icon Component

**User Story**: As a user, I want to see a cart icon in the header, so that I can access my cart and see how many items I've added.

**Scope**: Create a new CartIcon component with item count badge and integrate it into the Header component.

**Acceptance Criteria**:
- [ ] Cart icon visible in header on all pages (top-right position)
- [ ] Badge displays current cart item count
- [ ] Badge updates immediately when items added/removed
- [ ] Badge hidden when cart is empty (count = 0)
- [ ] Badge shows "99+" when item count exceeds 99
- [ ] Icon uses consistent design system (Heroicons, outline style)
- [ ] Clicking icon navigates to /cart route
- [ ] Support dark mode (icon changes color appropriately)
- [ ] Responsive design (visible on mobile & desktop)
- [ ] Accessible (ARIA labels, keyboard navigation, screen reader support)

**Technical Implementation**:
- **Create** new component: `frontend/src/components/cart/CartIcon.tsx`
  - Import ShoppingCartIcon from Heroicons (`@heroicons/react/24/outline`)
  - Props: `{ itemCount: number, onClick: () => void, className?: string }`
  - Render icon with badge overlay (badge shows item count)
  - Badge: Circular, red background (#ef4444), white text, 20px min size
  - Badge position: Absolute, top-right corner of icon (-1px, -1px)
  - Badge logic: Only render when itemCount > 0
  - Use Tailwind CSS for styling (`bg-red-500`, `text-white`, `rounded-full`)
  - Add focus ring: `focus:ring-2 focus:ring-primary`
  - ARIA label: "Shopping cart with {count} item(s)"
  - Memoize component with `React.memo()`

- **Modify** `frontend/src/components/Navigation.tsx`:
  - Import CartIcon component
  - Import `useCart` hook from CartContext
  - Import `useNavigate` from react-router-dom
  - Get itemCount from `useCart()` hook
  - Create `handleCartClick()` function to navigate to '/cart'
  - Add CartIcon to header (in flex container with theme toggle and login)
  - Position: Right side of header, before theme toggle button
  - Pass `itemCount` and `onClick` handler to CartIcon

**Styling**:
- Icon size: 24px × 24px (`w-6 h-6`)
- Icon color (light mode): `text-gray-700`
- Icon color (dark mode): `text-gray-200`
- Badge background: `bg-red-500` (#ef4444)
- Badge text: `text-white`, `font-bold`, `text-xs`
- Hover state: `opacity-80`
- Transition: Smooth opacity change

**Dependencies**:
- CartContext must provide `itemCount`
- Cart state must update correctly when items added
- /cart route must exist (see CART-ICON-006)

---

### CART-ICON-002: Implement Cart State Management (CartContext)

**User Story**: As a developer, I want a centralized cart state management solution, so that all components can access and modify cart data consistently.

**Scope**: Create CartContext using React Context API to manage global cart state with localStorage persistence.

**Acceptance Criteria**:
- [ ] CartContext created with CartProvider component
- [ ] Cart state includes: `items` array, `itemCount`, `totalPrice`
- [ ] `addItem()` method: Adds new item or increments existing item quantity
- [ ] `removeItem()` method: Removes item from cart by productId
- [ ] `updateQuantity()` method: Updates item quantity (removes if ≤ 0)
- [ ] `clearCart()` method: Empties entire cart
- [ ] Cart saved to localStorage on every state change
- [ ] Cart loaded from localStorage on app initialization
- [ ] `useCart()` custom hook throws error if used outside provider
- [ ] Invalid localStorage data handled gracefully (cleared, not crashed)

**Technical Implementation**:
- **Create** `frontend/src/context/CartContext.tsx`:
  - Define `CartItem` interface: `{ productId, name, price, quantity, imgName?, sku }`
  - Define `CartContextType` interface with state and methods
  - Create `CartContext` with `createContext()`
  - Create `CartProvider` component with `useState` for items
  - Implement `useEffect` to save cart to localStorage on items change
    - Key: `'octocat-cart'`
    - Format: `JSON.stringify(items)`
    - Error handling: Try-catch for quota exceeded
  - Implement `useEffect` to load cart from localStorage on mount
    - Parse JSON and validate (must be array)
    - Error handling: Try-catch for invalid JSON, clear on error
  - Calculate `itemCount`: `items.reduce((sum, item) => sum + item.quantity, 0)`
  - Calculate `totalPrice`: `items.reduce((sum, item) => sum + (item.price * item.quantity), 0)`
  - Implement `addItem(product, quantity)`:
    - Find existing item by productId
    - If exists: Increment quantity
    - If new: Add new CartItem to items array
  - Implement `removeItem(productId)`: Filter out item
  - Implement `updateQuantity(productId, quantity)`: Update or remove if qty ≤ 0
  - Implement `clearCart()`: Set items to empty array
  - Export `useCart()` hook with error check

**localStorage Operations**:
```typescript
// Save
useEffect(() => {
  try {
    localStorage.setItem('octocat-cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
}, [items]);

// Load
useEffect(() => {
  try {
    const saved = localStorage.getItem('octocat-cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setItems(parsed);
    }
  } catch (error) {
    console.error('Failed to load cart:', error);
    localStorage.removeItem('octocat-cart');
  }
}, []);
```

**Dependencies**:
- React (createContext, useContext, useState, useEffect)
- Product interface from Products component

---

### CART-ICON-003: Add Visual Feedback with Toast Notifications

**User Story**: As a user, I want to see a confirmation message when I add an item to my cart, so that I know my action was successful.

**Scope**: Replace browser `alert()` with modern toast notifications using react-hot-toast.

**Acceptance Criteria**:
- [ ] react-hot-toast library installed (`npm install react-hot-toast`)
- [ ] Toast notification appears when item added successfully
- [ ] Toast message format: "Added {quantity} {productName} to cart"
- [ ] Toast auto-dismisses after 3 seconds
- [ ] Toast appears in top-right corner
- [ ] Toast works in both dark and light modes
- [ ] Toast is non-blocking (doesn't prevent other actions)
- [ ] Multiple toasts stack vertically
- [ ] Toast accessible (screen reader announces)
- [ ] Error toast shown if product not found

**Technical Implementation**:
- **Install** dependency:
  ```bash
  cd frontend
  npm install react-hot-toast
  ```

- **Modify** `frontend/src/components/entity/product/Products.tsx`:
  - Import `useCart` from CartContext
  - Import `toast` and `Toaster` from `react-hot-toast`
  - Update `handleAddToCart()` function:
    - Find product by productId
    - If not found: Show error toast (`toast.error('Product not found')`)
    - Call `addItem(product, quantity)` from CartContext
    - Show success toast: `toast.success(`Added ${quantity} ${product.name} to cart`)`
    - Toast config: `{ duration: 3000, position: 'top-right' }`
    - Reset quantity: `setQuantities((prev) => ({ ...prev, [productId]: 0 }))`
  - Add `<Toaster />` component to component render (top level)

**Toast Configuration**:
```typescript
toast.success('Added ${quantity} ${product.name} to cart', {
  duration: 3000,
  position: 'top-right',
});
```

**Dependencies**:
- react-hot-toast library
- CartContext (`addItem` method)

---

### CART-ICON-004: Create Cart Page Component

**User Story**: As a user, I want to view all items in my cart on a dedicated page, so that I can review and edit my selections before checkout.

**Scope**: Create a Cart page component displaying all cart items with quantity controls, remove buttons, and totals.

**Acceptance Criteria**:
- [ ] Cart page component created at `frontend/src/components/cart/Cart.tsx`
- [ ] All cart items displayed in a list with product details
- [ ] Each item shows: image (80x80px), name, price per unit, quantity, subtotal
- [ ] Quantity controls (+ and - buttons) functional
- [ ] Remove button (trash icon) deletes item instantly
- [ ] Total item count displayed in heading ("Shopping Cart (X items)")
- [ ] Total cart value displayed prominently at bottom
- [ ] "Clear Cart" button empties entire cart
- [ ] Empty cart state shown when no items
- [ ] Empty state includes: Message "Your Cart is Empty", "Browse Products" button
- [ ] "Continue Shopping" link navigates to /products
- [ ] "Proceed to Checkout" button (placeholder, navigates to /checkout)
- [ ] Responsive design (mobile and desktop)
- [ ] Dark mode support (all backgrounds, text, borders)

**Technical Implementation**:
- **Create** `frontend/src/components/cart/Cart.tsx`:
  - Import `useCart`, `useNavigate`, `useTheme`
  - Import `TrashIcon` from `@heroicons/react/24/outline`
  - Get cart state: `{ items, itemCount, totalPrice, updateQuantity, removeItem, clearCart }` from `useCart()`
  - Get `darkMode` from `useTheme()`
  - Get `navigate` from `useNavigate()`
  
  - **Empty Cart State** (if `itemCount === 0`):
    - Show heading: "Your Cart is Empty"
    - Show message: "Start shopping to add items to your cart!"
    - Show button: "Browse Products" → `navigate('/products')`
  
  - **Cart Items Display**:
    - Map over `items` array
    - For each item, render:
      - Product image: `<img src={/${item.imgName}} alt={item.name} />`
      - Product name and price
      - Quantity controls: 
        - **-** button: `onClick={() => updateQuantity(item.productId, item.quantity - 1)}`
        - Display current quantity
        - **+** button: `onClick={() => updateQuantity(item.productId, item.quantity + 1)}`
      - Item subtotal: `${(item.price * item.quantity).toFixed(2)}`
      - Remove button: `onClick={() => removeItem(item.productId)}`
  
  - **Cart Summary**:
    - Total items: `{itemCount} items`
    - Total price: `${totalPrice.toFixed(2)}`
    - "Proceed to Checkout" button → `navigate('/checkout')`
    - "Continue Shopping" link → `navigate('/products')`
  
  - **Clear Cart Button**: Top-right, small, red text, `onClick={clearCart}`

**Styling**:
- Page background: `bg-gray-100` (light), `bg-dark` (dark)
- Card background: `bg-white` (light), `bg-gray-800` (dark)
- Text color: `text-gray-800` (light), `text-light` (dark)
- Borders: `border-gray-200` (light), `border-gray-700` (dark)
- Buttons: Primary color for main actions, gray for secondary

**Dependencies**:
- CartContext (all cart methods)
- React Router (useNavigate)
- ThemeContext (darkMode)
- @heroicons/react (TrashIcon)

---

### CART-ICON-005: Configure Cart Route and Provider

**User Story**: As a developer, I want the cart page accessible via /cart route and cart state available globally.

**Scope**: Add /cart route to React Router and wrap app in CartProvider.

**Acceptance Criteria**:
- [ ] /cart route added to App.tsx Routes
- [ ] /cart route renders Cart component
- [ ] CartProvider wraps app in provider hierarchy
- [ ] Provider order: AuthProvider → ThemeProvider → CartProvider → ThemedApp
- [ ] Route accessible by typing URL directly (`http://localhost:5173/cart`)
- [ ] Route accessible via cart icon click
- [ ] Browser back button works correctly

**Technical Implementation**:
- **Modify** `frontend/src/App.tsx`:
  - Import Cart component: `import Cart from './components/cart/Cart';`
  - Import CartProvider: `import { CartProvider } from './context/CartContext';`
  
  - **Add Route**:
    ```tsx
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />  {/* NEW */}
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/products" element={<AdminProducts />} />
    </Routes>
    ```
  
  - **Add Provider**:
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

**Dependencies**:
- Cart component (CART-ICON-004)
- CartContext (CART-ICON-002)

---

### CART-ICON-006: Implement Accessibility Features

**User Story**: As a user with disabilities, I want the cart feature to be accessible, so that I can use it with assistive technologies.

**Scope**: Ensure all cart components meet WCAG 2.1 Level AA accessibility standards.

**Acceptance Criteria**:
- [ ] CartIcon has dynamic aria-label: "Shopping cart with {count} item(s)"
- [ ] Cart badge has `aria-live="polite"` for screen reader announcements
- [ ] All interactive elements keyboard accessible (Tab, Enter, Space keys)
- [ ] Visible focus indicators on all focusable elements (`focus:ring-2 focus:ring-primary`)
- [ ] Color contrast ≥ 4.5:1 (WCAG AA) for icon and text
- [ ] Color contrast ≥ 7:1 (WCAG AAA) for badge (white on red)
- [ ] Screen reader announces cart count changes
- [ ] Remove buttons have aria-label: "Remove {productName} from cart"
- [ ] Quantity buttons have aria-label: "Increase/Decrease quantity"
- [ ] Semantic HTML elements used (button, heading, list)
- [ ] No accessibility violations in axe-core automated tests
- [ ] Manual testing with screen reader (NVDA/JAWS/VoiceOver)

**Technical Implementation**:
- **CartIcon**:
  - Add dynamic `aria-label`: `` aria-label={`Shopping cart with ${itemCount} item${itemCount !== 1 ? 's' : ''}`} ``
  - Add `aria-live="polite"` to badge span
  - Ensure button is focusable and has visible focus ring

- **Cart Page**:
  - Remove buttons: Add `aria-label={`Remove ${item.name} from cart`}`
  - Quantity + button: `aria-label="Increase quantity"`
  - Quantity - button: `aria-label="Decrease quantity"`
  - Use semantic HTML: `<button>`, `<h1>`, etc.

- **Testing**:
  - Run axe-core tests
  - Test with keyboard (Tab, Enter, Space)
  - Test with screen reader

**Dependencies**:
- Axe DevTools or WAVE for testing
- Screen reader software (NVDA, JAWS, VoiceOver)

---

### CART-ICON-007: Write Unit Tests

**User Story**: As a developer, I want comprehensive unit tests, so that I can ensure code quality and prevent regressions.

**Scope**: Write unit tests for CartContext, CartIcon, and Cart components using Vitest and React Testing Library.

**Acceptance Criteria**:
- [ ] CartContext tests written (`frontend/src/context/CartContext.test.tsx`)
- [ ] CartIcon component tests written (`frontend/src/components/cart/CartIcon.test.tsx`)
- [ ] Cart page component tests written (`frontend/src/components/cart/Cart.test.tsx`)
- [ ] Test coverage ≥ 80% for all cart components
- [ ] All edge cases tested (empty cart, qty = 0, invalid data)
- [ ] All tests passing (`npm run test`)

**Test Coverage**:

**CartContext Tests**:
- Test addItem: New item added
- Test addItem: Existing item quantity incremented
- Test removeItem: Item removed
- Test updateQuantity: Quantity updated
- Test updateQuantity: Item removed when qty = 0
- Test clearCart: All items removed
- Test itemCount: Correct sum
- Test totalPrice: Correct total
- Test localStorage save and load

**CartIcon Tests**:
- Badge hidden when itemCount = 0
- Badge visible when itemCount > 0
- Badge shows correct count
- Badge shows "99+" when count > 99
- onClick handler called
- aria-label is correct

**Cart Page Tests**:
- Empty cart state displayed
- All items rendered
- Quantity controls work
- Remove button works
- Total calculated correctly

**Dependencies**:
- Vitest (test runner)
- React Testing Library (@testing-library/react)
- @testing-library/user-event

---

## 🛠️ Technical Specifications

### Files to Create (9)

1. **`frontend/src/context/CartContext.tsx`**
   - Purpose: Cart state management with localStorage persistence
   - Exports: CartProvider, useCart hook, CartItem interface, CartContextType interface

2. **`frontend/src/components/cart/CartIcon.tsx`**
   - Purpose: Display cart icon with item count badge
   - Props: `{ itemCount: number, onClick: () => void, className?: string }`

3. **`frontend/src/components/cart/Cart.tsx`**
   - Purpose: Cart page displaying all cart items
   - Features: Item list, quantity controls, remove buttons, totals, empty state

4. **`frontend/src/context/CartContext.test.tsx`**
   - Purpose: Unit tests for CartContext

5. **`frontend/src/components/cart/CartIcon.test.tsx`**
   - Purpose: Unit tests for CartIcon component

6. **`frontend/src/components/cart/Cart.test.tsx`**
   - Purpose: Unit tests for Cart page

7. **`frontend/src/components/cart/README.md`**
   - Purpose: Documentation for cart components

8. **`frontend/src/components/cart/cart-integration.test.tsx`**
   - Purpose: Integration tests for cart flow

### Files to Modify (3)

1. **`frontend/src/App.tsx`**
   - Changes:
     - Import Cart component
     - Import CartProvider
     - Add /cart route to Routes
     - Wrap app in CartProvider

2. **`frontend/src/components/Navigation.tsx`**
   - Changes:
     - Import CartIcon component
     - Import useCart hook
     - Import useNavigate hook
     - Add CartIcon to header with itemCount and onClick handler

3. **`frontend/src/components/entity/product/Products.tsx`**
   - Changes:
     - Import useCart hook
     - Import toast and Toaster from react-hot-toast
     - Update handleAddToCart to use CartContext.addItem()
     - Replace alert() with toast.success()
     - Add <Toaster /> component to render

### Dependencies to Install (1)

```bash
cd frontend
npm install react-hot-toast
```

---

## 📚 Documentation References

- **Investigation Report**: `docs/investigation/cart-issue-analysis.md`
- **High-Level Design (HLD)**: `docs/knowledge-repository/high-level-design.md`
- **Technical Design Document (TDD)**: `docs/knowledge-repository/technical-design-document.md`
- **Current Requirements**: `docs/knowledge-repository/current-requirements.md`
- **Missing Requirements**: `docs/knowledge-repository/missing-requirements.md`
- **Enriched Feature Requirements**: `docs/specifications/cart-icon-feature-requirements.md`

---

## ✅ Definition of Done

- [ ] CartIcon component created and tested
- [ ] CartIcon integrated into Navigation component
- [ ] Cart icon displays correct item count
- [ ] Cart icon badge updates in real-time
- [ ] Clicking cart icon navigates to /cart page
- [ ] CartContext created with all cart operations
- [ ] Cart state persists in localStorage
- [ ] Toast notification appears on add to cart
- [ ] Cart page displays all cart items
- [ ] Quantity controls work (update cart state)
- [ ] Remove item functionality works
- [ ] Clear cart functionality works
- [ ] Empty cart state displayed when cart is empty
- [ ] Dark mode supported for all cart components
- [ ] Responsive design verified (mobile & desktop)
- [ ] Accessibility validated (ARIA, keyboard nav, screen reader)
- [ ] Color contrast meets WCAG AA standards
- [ ] Unit tests written and passing (≥ 80% coverage)
- [ ] Integration tests written and passing
- [ ] Code reviewed and approved
- [ ] Documentation updated (README.md, JSDoc comments)
- [ ] Deployed to staging environment for QA testing
- [ ] Manual testing completed
- [ ] Accessibility testing completed (axe-core, screen reader)
- [ ] Product Owner approval

---

## 🏷️ Labels

`feature`, `enhancement`, `frontend`, `cart`, `ui`, `ux-improvement`, `accessibility`, `high-priority`, `p1`

---

## 📊 Effort Estimation

**Total Effort**: 15-16 Story Points (17-23 hours)

| Task | Story Points | Time |
|------|--------------|------|
| Create CartContext | 3 SP | 3-4 hrs |
| Create CartIcon | 2 SP | 2-3 hrs |
| Integrate into Navigation | 1 SP | 1 hr |
| Add Toast Notifications | 1 SP | 1 hr |
| Create Cart Page | 2 SP | 2-3 hrs |
| Configure Routes & Provider | 0.5 SP | 0.5 hr |
| Implement Accessibility | 1 SP | 1-2 hrs |
| localStorage Persistence | 1 SP | 1 hr |
| Write Unit Tests | 2 SP | 2-3 hrs |
| Write Integration Tests | 1 SP | 1-2 hrs |
| Dark Mode Support | 0.5 SP | 0.5 hr |
| Documentation | 0.5 SP | 0.5 hr |
| **TOTAL** | **15.5 SP** | **17-23 hrs** |

**Recommended Sprint**: 1 sprint (1-2 weeks with testing and code review)

---

## 🚀 Implementation Milestones

### Phase 1: Core Functionality (Critical - P0)
1. ✅ Create CartContext
2. ✅ Create CartIcon component
3. ✅ Integrate CartIcon into Navigation
4. ✅ Add /cart route and CartProvider
5. ✅ Create Cart page
6. ✅ Update Products component (add to cart)
7. ✅ Add toast notifications

**Goal**: Users can add items to cart, see cart icon with badge, and view cart page.

### Phase 2: Enhancement & Quality (High - P1)
1. ✅ Implement localStorage persistence
2. ✅ Add accessibility features
3. ✅ Write unit tests
4. ✅ Dark mode support

**Goal**: Cart persists, accessible, tested, and polished.

### Phase 3: Polish & Documentation (Medium - P2)
1. ✅ Write integration tests
2. ✅ Add documentation
3. ✅ Code review and refactoring

**Goal**: Production-ready, well-documented code.

---

## 🔗 Related Issues

- Relates to: Backend API integration (Phase 2 - future)
- Blocks: Checkout feature implementation

---

## 📝 Notes

- **Phase 1 Scope**: Frontend-only implementation with localStorage persistence
- **Phase 2 (Future)**: Backend API cart endpoints, database cart storage, user authentication integration
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Design System**: Follows existing Tailwind CSS patterns and dark mode implementation
- **Accessibility**: WCAG 2.1 Level AA compliance required

---

**Created**: January 27, 2026  
**Status**: Ready for Implementation  
**Assignee**: TBD  
**Milestone**: Phase 1 - Core Features
