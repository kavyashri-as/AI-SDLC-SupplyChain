# Cart Icon Implementation Quickstart

## Overview

This guide provides a rapid setup for the cart icon with item count badge feature. The implementation includes frontend components, backend API, and localStorage persistence.

## Prerequisites

- Node.js 18+
- SQLite 3
- Git repository with existing OctoCAT Supply Chain codebase
- Feature branch: `001-cart-icon-implementation`

## Architecture Overview

```
Frontend (React + TypeScript)
├── CartIcon Component (already implemented)
├── CartContext (needs API integration)
├── localStorage persistence
└── Toast notifications

Backend (Express.js + TypeScript)
├── Cart API routes
├── Cart repository
├── Database models
└── Session management

Database (SQLite)
├── cart_sessions table
├── cart_items table
└── Migration scripts
```

## Quick Setup (5 minutes)

### 1. Backend Setup

```bash
# Navigate to API directory
cd supply-chain-system/api

# Create database migration
cp database/migrations/001_init.sql database/migrations/003_add_cart_tables.sql
# Edit 003_add_cart_tables.sql with cart schema (see data-model.md)

# Create cart model
touch src/models/cartSession.ts
# Implement CartSession interface and database operations

# Create cart repository
touch src/repositories/cartRepository.ts
# Implement CartRepository class with CRUD operations

# Create cart routes
touch src/routes/cart.ts
# Implement Express routes for cart API

# Update main server
# Add cart routes to src/index.ts
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd supply-chain-system/frontend

# Install toast notifications
npm install react-hot-toast

# Create API client
mkdir -p src/api
touch src/api/cartApi.ts
# Implement API client functions

# Update types
# Add API response types to src/types/cart.ts

# Update CartContext
# Modify src/context/CartContext.tsx for API sync

# Update CartIcon
# Add toast notifications to src/components/cart/CartIcon.tsx

# Create component tests
mkdir -p tests/components/cart
touch tests/components/cart/CartIcon.test.tsx
```

### 3. Database Migration

```bash
# Run migration
cd supply-chain-system/api
npm run migrate

# Verify tables created
sqlite3 database/supply-chain.db ".tables"
# Should show: cart_sessions, cart_items
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get current cart contents |
| POST | `/api/cart/items` | Add item to cart |
| DELETE | `/api/cart` | Clear cart |

## Component Usage

```tsx
// CartIcon is already in Navigation component
// No additional setup needed for basic usage

// To add items programmatically:
import { useCart } from '../context/CartContext';

const { addItem } = useCart();

const handleAddToCart = () => {
  addItem({
    productId: 1,
    name: "Premium Widget",
    price: 29.99
  });
};
```

## Testing

```bash
# Run frontend tests
cd supply-chain-system/frontend
npm test

# Run backend tests
cd supply-chain-system/api
npm test

# Run E2E tests
npx playwright test
```

## Configuration

### Environment Variables

```bash
# Backend (.env)
CART_SESSION_TIMEOUT=2592000  # 30 days in seconds
CART_MAX_ITEMS=50

# Frontend (vite.config.ts or .env)
VITE_API_BASE_URL=http://localhost:3001/api
```

### localStorage Configuration

```typescript
// Key for cart storage
const CART_STORAGE_KEY = 'octocat-supply-chain-cart';
```

## Troubleshooting

### Common Issues

1. **Cart not persisting**
   - Check localStorage key matches spec: `'octocat-supply-chain-cart'`
   - Verify localStorage is not disabled in browser

2. **API calls failing**
   - Check backend server is running on port 3001
   - Verify CORS configuration
   - Check network tab for 500 errors

3. **Badge not updating**
   - Ensure CartContext is properly imported
   - Check CartIcon is wrapped with CartProvider

4. **Toast notifications not showing**
   - Verify react-hot-toast is installed
   - Check Toaster component is in App.tsx

### Debug Commands

```bash
# Check localStorage
console.log(localStorage.getItem('octocat-supply-chain-cart'));

# Check API connectivity
curl http://localhost:3001/api/cart

# Check database
sqlite3 database/supply-chain.db "SELECT * FROM cart_sessions;"
```

## Performance Benchmarks

- **Cart icon render**: <100ms
- **Add to cart operation**: <500ms
- **API response time**: <200ms
- **localStorage sync**: <50ms

## Next Steps

1. **Complete backend implementation** (Milestone 1)
2. **Add frontend-backend integration** (Milestone 2)
3. **Implement comprehensive tests** (Milestone 3)
4. **Performance optimization** (Milestone 4)

## Support

- **Documentation**: See `specs/001-cart-icon-implementation/`
- **Tests**: Run `npm test` for validation
- **API Docs**: See `contracts/cart-api.yaml`
- **Constitution**: Follow `.specify/memory/constitution.md` rules