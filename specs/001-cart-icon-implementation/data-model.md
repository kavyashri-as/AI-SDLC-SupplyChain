# Cart Data Model

## Overview

The cart system uses a hybrid persistence approach combining localStorage for immediate user experience with backend database storage for cross-session persistence. Cart data flows between frontend localStorage and backend SQLite database through session-based synchronization.

## Core Entities

### CartItem
Represents a single product in the shopping cart.

**Attributes:**
- `productId` (integer, required): References products.product_id
- `name` (string, required): Product display name
- `price` (decimal, required): Unit price at time of addition
- `quantity` (integer, required): Number of units (1-50)
- `imageUrl` (string, optional): Product image URL
- `sku` (string, optional): Stock keeping unit

**Constraints:**
- Quantity must be between 1 and 50
- Price must be positive decimal
- ProductId must reference existing product

### CartSession
Database entity managing cart persistence across sessions.

**Attributes:**
- `session_id` (string, primary key): Unique session identifier
- `created_at` (datetime, required): Session creation timestamp
- `updated_at` (datetime, required): Last modification timestamp
- `expires_at` (datetime, required): Session expiration (30 days from creation)

**Relationships:**
- One-to-many with CartItem entities
- Session cleanup after 30 days of inactivity

## Database Schema

### cart_sessions Table
```sql
CREATE TABLE cart_sessions (
    session_id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT NOT NULL
);

-- Index for efficient cleanup
CREATE INDEX idx_cart_sessions_expires_at ON cart_sessions(expires_at);
```

### cart_items Table
```sql
CREATE TABLE cart_items (
    cart_item_id INTEGER PRIMARY KEY,
    session_id TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    image_url TEXT,
    sku TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES cart_sessions(session_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

-- Indexes for performance
CREATE INDEX idx_cart_items_session_id ON cart_items(session_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
```

## Data Flow Patterns

### 1. Initial Load
```
Browser localStorage → CartContext → UI Components
                      ↓
                API Call (if available)
                      ↓
            Database CartSession → Merge with localStorage
```

### 2. Add Item Operation
```
User Action → CartContext.addItem() → Update localStorage
                                      → API POST /cart/items
                                      → Update Database
                                      → Return merged state
```

### 3. Session Synchronization
```
Frontend State ↔ Backend API ↔ Database Tables
     ↓              ↓              ↓
localStorage    REST Endpoints   cart_sessions
                                 cart_items
```

## Data Validation Rules

### Cart Item Validation
- Product must exist in products table
- Quantity must be 1-50 (configurable limit)
- Price must match current product price (or allow price lock?)
- Session must be valid and not expired

### Session Management
- Sessions expire after 30 days of inactivity
- Automatic cleanup via scheduled job
- Session ID generation: UUID-based with prefix
- Concurrent session handling: Last-write-wins

## Performance Considerations

### Database Indexes
- Session-based queries: `idx_cart_items_session_id`
- Product lookups: `idx_cart_items_product_id`
- Cleanup operations: `idx_cart_sessions_expires_at`

### Caching Strategy
- Frontend: localStorage for immediate access
- Backend: Session-based in-memory cache (optional)
- API: ETag headers for conditional requests

### Query Optimization
- Batch cart operations where possible
- Lazy loading of product details
- Pagination for large carts (future enhancement)

## Error Handling

### Data Integrity
- Foreign key constraints prevent orphaned cart items
- Transaction wrapping for multi-item operations
- Rollback on validation failures

### Conflict Resolution
- localStorage vs Database: Database wins on conflicts
- Concurrent updates: Last-write-wins with timestamp comparison
- Product changes: Validate product still exists before cart operations

## Migration Strategy

### From localStorage-only to Hybrid
1. Existing localStorage data remains functional
2. Optional backend sync on user consent
3. Gradual migration with fallback to localStorage
4. Database becomes primary after full rollout

### Schema Evolution
- Backward compatible changes only
- Migration scripts for schema updates
- Data preservation during upgrades
- Rollback capability for failed migrations