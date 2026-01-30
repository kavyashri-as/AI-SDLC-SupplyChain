# High-Level Design (HLD) - OctoCAT Supply Chain System

**Document Version**: 1.0  
**Last Updated**: January 27, 2026  
**System**: OctoCAT Supply Chain Management  
**Focus**: Cart Feature Analysis

---

## 1. System Architecture Overview

### 1.1 Application Type
- **Type**: Full-stack web application
- **Architecture**: Monorepo with separate frontend and backend services
- **Communication**: RESTful API architecture
- **Deployment**: Containerized (Docker) with local development support

### 1.2 High-Level Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           React Frontend (Port 5173)                  │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │ Navigation  │  │   Products   │  │   Context   │ │  │
│  │  │ Component   │  │   Component  │  │  Providers  │ │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘ │  │
│  │          │                │                 │         │  │
│  │          └────────────────┴─────────────────┘         │  │
│  │                           │                            │  │
│  │                     React Router                       │  │
│  └─────────────────────────│─────────────────────────────┘  │
└────────────────────────────│──────────────────────────────┘
                             │ HTTP/REST
                             │ (axios)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                Express API Server (Port 3001)                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                     Routes Layer                       │  │
│  │  /api/products │ /api/orders │ /api/suppliers         │  │
│  └────────────────────────┬──────────────────────────────┘  │
│  ┌────────────────────────▼──────────────────────────────┐  │
│  │               Repositories Layer                       │  │
│  │  productsRepo │ ordersRepo │ suppliersRepo            │  │
│  └────────────────────────┬──────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────▼──────────────────────────────┐  │
│  │                  SQLite Database                       │  │
│  │  api/data/app.db (file) or :memory: (tests)           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React | 18.3.1 |
| **Language** | TypeScript | ~5.7.2 |
| **Build Tool** | Vite | 7.2.6 |
| **Styling** | Tailwind CSS | 3.3.0 |
| **Routing** | React Router DOM | 7.4.1 |
| **HTTP Client** | Axios | 1.8.1 |
| **State Fetching** | React Query | 3.39.3 |
| **Testing** | Vitest | 4.0.10 |
| **E2E Testing** | Playwright | 1.49.0 |

### 2.2 Project Structure

```
frontend/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Root component with providers
│   ├── index.css                # Global styles
│   ├── components/              # React components
│   │   ├── Navigation.tsx       # Main navigation/header
│   │   ├── Welcome.tsx          # Home page
│   │   ├── About.tsx            # About page
│   │   ├── Footer.tsx           # Footer component
│   │   ├── Login.tsx            # Login page
│   │   ├── entity/              # Entity-specific components
│   │   │   └── product/
│   │   │       └── Products.tsx # Products listing & add to cart
│   │   └── admin/               # Admin components
│   │       └── AdminProducts.tsx
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── ThemeContext.tsx     # Dark/light mode state
│   └── api/
│       └── config.ts            # API configuration
├── public/                      # Static assets
├── package.json
├── vite.config.ts              # Vite configuration
└── tailwind.config.js          # Tailwind CSS configuration
```

### 2.3 State Management Architecture

#### Current State Management
- **Authentication State**: `AuthContext` (React Context API)
- **Theme State**: `ThemeContext` (React Context API)
- **Server State**: React Query for API data fetching

#### State Management Pattern
```typescript
// Pattern used in existing contexts
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>
```

**Current Context Providers:**
1. **AuthContext**
   - State: `isLoggedIn`, `isAdmin`, `user`
   - Actions: `login()`, `logout()`
   - Storage: localStorage for persistence

2. **ThemeContext**
   - State: `darkMode` (boolean)
   - Actions: `toggleTheme()`
   - Storage: localStorage (`darkMode` key)

#### Missing: Cart State Management
- **No CartContext exists**
- **No cart state shared across components**
- **No cart persistence mechanism**

---

## 3. Component Structure

### 3.1 Navigation Component (Header)

**File**: `frontend/src/components/Navigation.tsx`

**Current Structure:**
- Fixed position navigation bar
- Logo and brand name
- Navigation links: Home, Products, About us
- Admin dropdown menu (conditional)
- Theme toggle button (sun/moon icon)
- Login/Logout button
- Responsive design (hidden mobile menu not yet implemented)

**Styling Features:**
- Dark mode support (toggles bg and text colors)
- Backdrop blur effect
- Fixed positioning with z-index
- Tailwind CSS utilities

**Missing:**
- ❌ **Cart icon** (no cart icon component integrated)
- ❌ **Cart badge** (no item count display)
- ❌ **Cart navigation** (no /cart route link)

**Expected Integration Point:**
```tsx
// Expected location in Navigation.tsx
<div className="flex items-center space-x-4">
  {/* Cart Icon should go here */}
  <button onClick={toggleTheme}>...</button>
  {isLoggedIn ? ... : ...}
</div>
```

---

### 3.2 Products Component

**File**: `frontend/src/components/entity/product/Products.tsx`

**Current Features:**
- Fetches products from API using React Query
- Product grid display with images
- Search/filter functionality
- Quantity controls (+ and - buttons)
- "Add to Cart" button
- Product modal/detail view
- Dark mode support
- Loading and error states

**Current "Add to Cart" Implementation:**
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

**Issues:**
- ✅ Quantity state managed locally (component-level)
- ❌ No cart state integration
- ❌ Uses browser `alert()` instead of toast notification
- ❌ Resets quantity after adding (no persistence)
- ❌ No cart API call
- ❌ No visual feedback (badge update)

---

### 3.3 Cart Components (Missing)

#### CartIcon Component (TO BE CREATED)
**Expected Location**: `frontend/src/components/cart/CartIcon.tsx`

**Requirements:**
- Display shopping cart icon
- Show badge with item count
- Badge hidden when cart is empty (count = 0)
- Click handler to navigate to /cart
- Dark mode support
- Accessibility (ARIA labels, keyboard navigation)

**Expected Props Interface:**
```typescript
interface CartIconProps {
  itemCount: number;
  onClick: () => void;
  className?: string;
}
```

#### Cart Context (TO BE CREATED)
**Expected Location**: `frontend/src/context/CartContext.tsx`

**Requirements:**
- Manage cart state globally
- Provide cart operations (add, remove, update, clear)
- Persist cart to localStorage
- Expose cart data to components
- Calculate total item count

**Expected Context Interface:**
```typescript
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgName?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
```

#### Cart Page Component (TO BE CREATED)
**Expected Location**: `frontend/src/components/cart/Cart.tsx`

**Requirements:**
- Display all cart items
- Show product details (image, name, price, quantity)
- Quantity update controls
- Remove item buttons
- Subtotal and total calculations
- Empty cart state
- Checkout button (navigate to checkout flow)

---

## 4. Backend Architecture

### 4.1 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | N/A |
| **Framework** | Express.js | 4.21.2 |
| **Language** | TypeScript | 5.9.3 |
| **Database** | SQLite (better-sqlite3) | 12.4.1 |
| **API Docs** | Swagger/OpenAPI | 6.2.8 |
| **Testing** | Vitest | 4.0.10 |
| **Development** | tsx | 4.20.6 |

### 4.2 Project Structure

```
api/
├── src/
│   ├── index.ts                 # Express app entry point
│   ├── init-db.ts               # Database initialization
│   ├── seedData.ts              # Seed data script
│   ├── db/
│   │   ├── config.ts            # Database configuration
│   │   ├── migrate.ts           # Migration runner
│   │   ├── seed.ts              # Seed runner
│   │   └── sqlite.ts            # SQLite connection
│   ├── models/                  # TypeScript interfaces
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── supplier.ts
│   │   └── ...
│   ├── repositories/            # Data access layer
│   │   ├── productsRepo.ts
│   │   ├── ordersRepo.ts
│   │   ├── suppliersRepo.ts
│   │   └── ...
│   ├── routes/                  # API route handlers
│   │   ├── product.ts           # /api/products
│   │   ├── order.ts             # /api/orders
│   │   ├── supplier.ts          # /api/suppliers
│   │   └── ...
│   └── utils/
│       └── errors.ts            # Error handling utilities
├── database/
│   ├── migrations/              # SQL migration files
│   │   ├── 001_init.sql
│   │   └── 002_add_supplier_status_fields.sql
│   └── seed/                    # Seed SQL files
│       ├── 001_suppliers.sql
│       ├── 002_headquarters.sql
│       ├── 003_branches.sql
│       └── 004_products.sql
├── data/
│   └── app.db                   # SQLite database file
└── package.json
```

### 4.3 API Architecture Pattern

**Layer Structure:**
```
Route Handler → Repository → Database
     ↓              ↓            ↓
 Express.js    Data Access    SQLite
 (routing)      (queries)    (storage)
```

**Example Pattern:**
```typescript
// Route: api/src/routes/product.ts
router.get('/products', async (req, res) => {
  const products = await productsRepo.getAllProducts();
  res.json(products);
});

// Repository: api/src/repositories/productsRepo.ts
export function getAllProducts(): Product[] {
  const query = db.prepare('SELECT * FROM products');
  return query.all() as Product[];
}
```

### 4.4 Existing API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Get all products |
| `/api/products/:id` | GET | Get product by ID |
| `/api/orders` | GET/POST | Orders management |
| `/api/suppliers` | GET/POST | Suppliers management |
| `/api/branches` | GET/POST | Branches management |
| `/api/headquarters` | GET/POST | Headquarters management |
| `/api/deliveries` | GET/POST | Deliveries management |

### 4.5 Missing: Cart API Endpoints

**Expected Cart Endpoints (TO BE CREATED):**

| Endpoint | Method | Description | Request Body |
|----------|--------|-------------|--------------|
| `/api/cart` | GET | Get current cart items | None |
| `/api/cart/items` | POST | Add item to cart | `{ productId, quantity }` |
| `/api/cart/items/:id` | PUT | Update item quantity | `{ quantity }` |
| `/api/cart/items/:id` | DELETE | Remove item from cart | None |
| `/api/cart` | DELETE | Clear entire cart | None |

**Expected Files:**
- `api/src/routes/cart.ts` - Route handlers
- `api/src/repositories/cartRepository.ts` - Data access
- `api/database/migrations/003_add_cart_items.sql` - Database schema

---

## 5. Database Architecture

### 5.1 Database Technology
- **Type**: SQLite (embedded database)
- **Library**: better-sqlite3
- **Storage**: File-based (`api/data/app.db`) or in-memory (tests)
- **Migration Strategy**: SQL migration files in `api/database/migrations/`

### 5.2 Current Database Schema (Relevant Tables)

**Products Table:**
```sql
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    img_name TEXT,
    sku TEXT UNIQUE NOT NULL,
    unit TEXT NOT NULL,
    supplier_id INTEGER NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);
```

**Orders Table:**
```sql
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    branch_id INTEGER NOT NULL,
    order_date TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);
```

**Order Details Table:**
```sql
CREATE TABLE order_details (
    order_detail_id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### 5.3 Missing: Cart Items Table

**Expected Schema (TO BE CREATED):**
```sql
-- Migration: 003_add_cart_items.sql
CREATE TABLE cart_items (
    cart_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,           -- For guest carts
    user_id INTEGER,                     -- For logged-in users (optional)
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE INDEX idx_cart_items_session_id ON cart_items(session_id);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
```

**Design Considerations:**
- Support both guest and logged-in user carts
- `session_id` for guest cart identification
- `user_id` for authenticated user carts
- Foreign key to products table
- Timestamps for cart item tracking

---

## 6. Data Flow Analysis

### 6.1 Current Product Browse & Add Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Navigates to /products
     ▼
┌─────────────────────┐
│ Products Component  │
│ - Fetches products  │
│   via React Query   │
└────┬────────────────┘
     │ 2. GET /api/products
     ▼
┌─────────────────────┐
│   Express API       │
│ - productsRepo      │
│ - Query SQLite      │
└────┬────────────────┘
     │ 3. Returns product list
     ▼
┌─────────────────────┐
│ Products Component  │
│ - Displays products │
│ - Quantity controls │
└────┬────────────────┘
     │ 4. User clicks "Add to Cart"
     ▼
┌─────────────────────┐
│ handleAddToCart()   │
│ - Shows alert()     │
│ - Resets quantity   │
│ - NO cart update    │ ❌
└─────────────────────┘
```

**Problem**: Cart data is not stored, managed, or displayed anywhere.

---

### 6.2 Expected Cart Flow (TO BE IMPLEMENTED)

#### Frontend-Only Cart (Phase 1 - Minimum Viable)
```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Clicks "Add to Cart"
     ▼
┌─────────────────────┐
│ Products Component  │
│ - handleAddToCart() │
└────┬────────────────┘
     │ 2. Call CartContext.addItem()
     ▼
┌─────────────────────┐
│   CartContext       │
│ - Update items[]    │
│ - Save to           │
│   localStorage      │
└────┬────────────────┘
     │ 3. Trigger re-render
     ▼
┌─────────────────────┐
│   CartIcon (Header) │
│ - Read itemCount    │
│ - Update badge      │
│ - Show "3"          │ ✅
└─────────────────────┘
     │ 4. User clicks cart icon
     ▼
┌─────────────────────┐
│  Cart Page          │
│ - Display all items │
│ - Edit quantities   │
│ - Remove items      │
└─────────────────────┘
```

#### Full-Stack Cart (Phase 2 - Optional Backend Integration)
```
┌──────────┐
│  User    │
└────┬─────┘
     │ 1. Clicks "Add to Cart"
     ▼
┌─────────────────────┐
│ Products Component  │
│ - handleAddToCart() │
└────┬────────────────┘
     │ 2. POST /api/cart/items
     │    { productId: 1, quantity: 2 }
     ▼
┌─────────────────────┐
│   Cart API          │
│ - cartRepository    │
│ - INSERT INTO       │
│   cart_items        │
└────┬────────────────┘
     │ 3. Returns updated cart
     │    { items: [...], itemCount: 3 }
     ▼
┌─────────────────────┐
│   CartContext       │
│ - Update state      │
│ - Sync localStorage │
└────┬────────────────┘
     │ 4. Trigger re-render
     ▼
┌─────────────────────┐
│   CartIcon (Header) │
│ - Update badge      │ ✅
└─────────────────────┘
```

---

## 7. Routing Architecture

### 7.1 Current Routes

**Frontend Routes (React Router):**

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Welcome | Home/landing page |
| `/about` | About | About us page |
| `/products` | Products | Product catalog |
| `/login` | Login | Login page |
| `/admin/products` | AdminProducts | Admin product management |

### 7.2 Missing Routes

**Expected Cart Routes:**

| Route | Component | Description |
|-------|-----------|-------------|
| `/cart` | Cart | Cart page (view/edit cart) |
| `/checkout` | Checkout | Checkout flow (future) |

**Route Configuration Update Required:**
```tsx
// In App.tsx
<Routes>
  <Route path="/" element={<Welcome />} />
  <Route path="/products" element={<Products />} />
  <Route path="/cart" element={<Cart />} />  {/* TO ADD */}
  {/* ... other routes */}
</Routes>
```

---

## 8. Styling & Design System

### 8.1 Design System

**CSS Framework**: Tailwind CSS 3.3.0

**Key Design Tokens:**
- **Primary Color**: Custom primary color (configured in tailwind.config.js)
- **Accent Color**: Custom accent color
- **Dark Mode**: `bg-dark`, `text-light` utilities
- **Spacing**: Standard Tailwind spacing scale
- **Typography**: Default Tailwind font stack

### 8.2 Dark Mode Implementation

**Strategy**: Class-based dark mode toggling

**Pattern:**
```tsx
className={`${darkMode ? 'bg-dark text-light' : 'bg-white text-gray-700'}`}
```

**Storage**: `localStorage.getItem('darkMode')`

**Cart Icon Requirements:**
- Must support dark mode
- Must use consistent color scheme
- Must match existing navigation icons

---

## 9. Current Implementation Gaps

### 9.1 Frontend Gaps

| Component | Status | Impact |
|-----------|--------|--------|
| **CartContext** | ❌ Missing | No cart state management |
| **CartIcon Component** | ❌ Missing | No cart visibility |
| **Cart Page** | ❌ Missing | Cannot view cart contents |
| **Cart Route** | ❌ Missing | No navigation to cart |
| **Toast Notifications** | ❌ Missing | No user feedback (uses alert) |
| **localStorage Persistence** | ❌ Missing | Cart not saved |
| **Cart Integration in Products** | ❌ Incomplete | Only shows alert |
| **Cart Integration in Navigation** | ❌ Missing | No cart icon in header |

### 9.2 Backend Gaps (Optional for Phase 1)

| Component | Status | Impact |
|-----------|--------|--------|
| **Cart API Routes** | ❌ Missing | No backend cart support |
| **Cart Repository** | ❌ Missing | No data access layer |
| **Cart Database Table** | ❌ Missing | No cart storage |
| **Session Management** | ❌ Missing | Cannot track guest carts |

---

## 10. Performance Considerations

### 10.1 Frontend Performance

**Current Optimizations:**
- React Query for data caching
- Lazy loading with code splitting (potential)
- Vite for fast builds and HMR

**Cart-Specific Considerations:**
- Cart state updates should be instant (optimistic UI)
- localStorage operations are synchronous (fast but blocks thread)
- Badge updates should not cause full navigation re-renders

### 10.2 Backend Performance

**Current Optimizations:**
- SQLite indexes on foreign keys
- better-sqlite3 (synchronous, fast)
- No ORM overhead (raw SQL queries)

**Cart-Specific Considerations:**
- Cart queries should be fast (<10ms)
- Index on session_id for guest cart lookups
- Consider cart item count caching

---

## 11. Security Considerations

### 11.1 Current Security Measures

**CORS Configuration:**
- Configured CORS origins
- Supports Codespaces and Azure Container Apps
- Credentials: true

**Authentication:**
- Basic login flow exists (AuthContext)
- Admin role check (isAdmin)

### 11.2 Cart Security Requirements

**Frontend:**
- Validate product IDs before adding to cart
- Prevent negative quantities
- Sanitize localStorage data (JSON.parse errors)

**Backend (if implementing API):**
- Validate session IDs
- Prevent cart data leakage between users
- Rate limiting on cart API endpoints
- Input validation (quantity > 0, valid product IDs)

---

## 12. Testing Strategy

### 12.1 Current Testing Setup

**Frontend:**
- Vitest for unit tests
- Playwright for E2E tests
- React Testing Library

**Backend:**
- Vitest for unit tests
- Supertest for API testing

### 12.2 Cart Testing Requirements

**Frontend Tests:**
- CartContext: add, remove, update, clear operations
- CartIcon: badge visibility, item count display
- Cart Page: item display, quantity updates
- Integration: Products → CartContext → CartIcon flow
- localStorage persistence

**Backend Tests (if implementing API):**
- Cart API routes (GET, POST, PUT, DELETE)
- Cart Repository queries
- Session management
- Edge cases (invalid product, invalid quantity)

---

## 13. Accessibility Requirements

### 13.1 Current Accessibility

**Existing Patterns:**
- `aria-label` on theme toggle button
- Keyboard navigation for links
- Focus states on interactive elements

### 13.2 Cart Accessibility Requirements

**CartIcon:**
- `aria-label`: "Shopping cart with X items"
- Keyboard accessible (focus ring)
- Screen reader announces item count

**Cart Page:**
- Semantic HTML (table or list for cart items)
- Keyboard navigation for quantity controls
- Focus management when items removed

---

## 14. Integration Points

### 14.1 Existing Integration Points

**App.tsx Provider Hierarchy:**
```tsx
<AuthProvider>
  <ThemeProvider>
    <ThemedApp />
  </ThemeProvider>
</AuthProvider>
```

**Expected Cart Integration:**
```tsx
<AuthProvider>
  <ThemeProvider>
    <CartProvider>  {/* TO ADD */}
      <ThemedApp />
    </CartProvider>
  </ThemeProvider>
</AuthProvider>
```

### 14.2 Component Integration

**Navigation.tsx:**
- Import `CartIcon`
- Import `useCart` hook
- Add `CartIcon` component in header (right side)
- Pass `itemCount` and `onClick` handler

**Products.tsx:**
- Import `useCart` hook
- Replace `alert()` with `addItem()` from CartContext
- Add toast notification (react-hot-toast or similar)
- Remove quantity reset (keep in cart)

---

## 15. Technology Decisions

### 15.1 State Management Decision

**Options:**
1. **React Context API** ✅ (Recommended)
   - Already used in the project (AuthContext, ThemeContext)
   - Simple and sufficient for cart state
   - No additional dependencies

2. Redux Toolkit
   - Overkill for simple cart state
   - Adds complexity and bundle size

3. Zustand
   - Lightweight alternative to Redux
   - Not consistent with existing patterns

**Decision**: Use React Context API for consistency

### 15.2 Persistence Strategy

**Options:**
1. **localStorage Only** ✅ (Phase 1 - Recommended)
   - Simplest implementation
   - No backend changes required
   - Sufficient for MVP

2. Backend API + localStorage
   - More robust
   - Supports cart across devices
   - Requires backend work

**Decision**: Start with localStorage, add API in Phase 2

### 15.3 Toast Notification Library

**Options:**
1. **react-hot-toast** ✅ (Recommended)
   - Lightweight (3.5 KB)
   - Simple API
   - Customizable

2. react-toastify
   - More features
   - Larger bundle size

**Decision**: Use react-hot-toast

---

## 16. Migration Path

### 16.1 Phase 1: Frontend-Only Cart (Minimum Viable)
1. Create CartContext with localStorage persistence
2. Create CartIcon component
3. Integrate CartIcon into Navigation
4. Create Cart page
5. Update Products component to use CartContext
6. Add toast notifications
7. Add /cart route

**Timeline**: 2-3 days  
**Dependencies**: None

### 16.2 Phase 2: Backend Integration (Optional)
1. Create cart_items database table
2. Create cart API routes
3. Create cart repository
4. Update CartContext to sync with API
5. Add session management

**Timeline**: 2-3 days  
**Dependencies**: Phase 1 completed

---

## 17. Open Questions & Decisions Needed

### 17.1 Business Logic Questions

1. **Cart Expiry**: Should cart items expire after X days?
2. **Max Quantity**: What's the maximum quantity per item?
3. **Stock Validation**: Should we validate stock before adding to cart?
4. **Guest vs. Logged-In Carts**: Merge guest cart on login?

### 17.2 Technical Questions

1. **Cart Limit**: Maximum number of unique items in cart?
2. **Badge Display**: Show "99+" for counts > 99?
3. **Currency**: How to handle currency formatting?
4. **Shipping**: Calculate shipping in cart or checkout only?

---

## 18. Success Criteria

### 18.1 Functional Success Criteria
- ✅ Cart icon visible in header on all pages
- ✅ Badge shows correct item count
- ✅ Badge updates instantly when items added/removed
- ✅ Clicking cart icon navigates to cart page
- ✅ Cart state persists across page refreshes
- ✅ Dark mode support for cart components
- ✅ Toast notification on add to cart

### 18.2 Technical Success Criteria
- ✅ No console errors
- ✅ Tests passing (unit + integration)
- ✅ Accessible (WCAG 2.1 Level AA)
- ✅ Performance: Cart operations < 100ms
- ✅ Code follows existing patterns and conventions

---

## 19. Related Documentation

- **Investigation**: `docs/investigation/cart-issue-analysis.md`
- **TDD**: `docs/knowledge-repository/technical-design-document.md` (to be created)
- **Requirements**: `docs/knowledge-repository/current-requirements.md` (to be created)
- **API Docs**: `api/api-swagger.json`

---

## 20. Appendix

### 20.1 Key Files Reference

| Category | File Path |
|----------|-----------|
| **Frontend Entry** | `frontend/src/main.tsx` |
| **Root Component** | `frontend/src/App.tsx` |
| **Navigation** | `frontend/src/components/Navigation.tsx` |
| **Products** | `frontend/src/components/entity/product/Products.tsx` |
| **Auth Context** | `frontend/src/context/AuthContext.tsx` |
| **Theme Context** | `frontend/src/context/ThemeContext.tsx` |
| **API Entry** | `api/src/index.ts` |
| **DB Init** | `api/src/init-db.ts` |
| **Migrations** | `api/database/migrations/` |

### 20.2 Glossary

- **HLD**: High-Level Design
- **TDD**: Technical Design Document
- **MVP**: Minimum Viable Product
- **WCAG**: Web Content Accessibility Guidelines
- **CORS**: Cross-Origin Resource Sharing
- **E2E**: End-to-End (testing)

---

**Document Status**: ✅ Complete  
**Next Document**: Technical Design Document (TDD)
