# Performance Test Data Requirements

**Feature**: Cart Icon with Item Count Badge  
**Test Scenarios**: TS-CART-P-001 to TS-CART-P-015  
**Date**: January 28, 2026  

---

## Performance Test Data Summary Table

| Test ID | Scenario | Cart Size | Data Size | Key Metrics | Setup Function |
|---------|----------|-----------|-----------|-------------|----------------|
| TS-CART-P-001 | Badge update (add) | 0 → 1 | ~200 bytes | <100ms update | `p001InitialCart` |
| TS-CART-P-002 | Badge update (remove) | 5 → 4 | ~1 KB | <100ms update | `p002InitialCart` |
| TS-CART-P-003 | Large cart update | 50 → 51 | ~10 KB | <100ms update | `generateP003LargeCart()` |
| TS-CART-P-004 | Render 100+ items | 120 items | ~25 KB | FPS >30, no blocking | `generateP004MaxCart()` |
| TS-CART-P-005 | No UI blocking | 0 → 10 rapid | ~2 KB | No tasks >50ms | `p005RapidAddProducts` |
| TS-CART-P-006 | localStorage save | 1 item × 10 | ~200 bytes | <50ms avg | `p006TestCart` + `measureP006SaveTime()` |
| TS-CART-P-007 | localStorage load | 20 items | ~4 KB | <100ms load | `p007LoadTestCart` |
| TS-CART-P-008 | Large data ops | 150 items | ~100 KB | Save <50ms, load <100ms | `generateP008LargeDataCart()` |
| TS-CART-P-009 | Quota management | 1000 items | ~1 MB | No quota errors, <5MB | `generateP009NearQuotaCart()` |
| TS-CART-P-010 | Time to Interactive | 0 items | ~100 bytes | <100ms TTI | `p010InitialState` |
| TS-CART-P-011 | Toast timing | 1 item × 5 | ~200 bytes | <200ms display | `p011ToastProduct` |
| TS-CART-P-012 | Animation FPS | 3 items | ~600 bytes | 55-60 FPS | `p012AnimationCart` |
| TS-CART-P-013 | Memory leaks | 100 operations | Varies | <5MB growth | `performP013MemoryLeakTest()` |
| TS-CART-P-014 | Context cleanup | 1 item | ~200 bytes | No leaks on unmount | `p014CleanupCart` |
| TS-CART-P-015 | Toast cleanup | 10 toasts | ~2 KB | 0 stale DOM elements | `triggerP015RapidToasts()` |

---

## Quick Setup Script for Performance Tests

```javascript
// Performance Test Data Quick Setup
const performanceTestData = {
  p001: { items: [] },
  
  p002: { items: Array.from({ length: 5 }, (_, i) => ({
    productId: `perf-00${i+1}`, 
    name: `Test Product ${i+1}`, 
    price: 19.99, 
    quantity: 1, 
    imageUrl: "/images/p.jpg"
  })) },
  
  p003: { items: Array.from({ length: 50 }, (_, i) => ({
    productId: `perf-${String(i+1).padStart(3,'0')}`, 
    name: `Large Cart Product ${i+1}`, 
    price: 29.99, 
    quantity: 1, 
    imageUrl: "/images/p.jpg"
  })) },
  
  p004: { items: Array.from({ length: 120 }, (_, i) => ({
    productId: `max-${String(i+1).padStart(3,'0')}`, 
    name: `Max Cart Product ${i+1}`, 
    price: 19.99, 
    quantity: 1, 
    imageUrl: "/images/p.jpg"
  })) },
  
  p007: { items: Array.from({ length: 20 }, (_, i) => ({
    productId: `load-${String(i+1).padStart(3,'0')}`, 
    name: `Load Test Product ${i+1}`, 
    price: 29.99, 
    quantity: 1, 
    imageUrl: "/images/p.jpg"
  })) },
  
  p012: { items: Array.from({ length: 3 }, (_, i) => ({
    productId: `anim-00${i+1}`, 
    name: `Animation Test ${i+1}`, 
    price: 19.99, 
    quantity: 1, 
    imageUrl: "/images/p.jpg"
  })) },
  
  p014: { items: [{
    productId: "cleanup-001", 
    name: "Cleanup Test Product", 
    price: 29.99, 
    quantity: 1, 
    imageUrl: "/images/p.jpg"
  }] }
};

// Load specific performance test data
function loadPerformanceTestData(testId) {
  const key = testId.toLowerCase().replace('ts-cart-', '');
  const data = performanceTestData[key];
  
  if (data) {
    localStorage.setItem('octocat-cart', JSON.stringify(data));
    const size = new Blob([JSON.stringify(data)]).size;
    console.log(`✅ Loaded test data for ${testId}`);
    console.log(`   Items: ${data.items.length}`);
    console.log(`   Size: ${(size / 1024).toFixed(2)} KB`);
  } else {
    console.error(`❌ No test data found for ${testId}`);
    console.log('Available tests:', Object.keys(performanceTestData));
  }
}

// Usage examples:
// loadPerformanceTestData('p001');  // Load empty cart for TS-CART-P-001
// loadPerformanceTestData('p002');  // Load 5-item cart for TS-CART-P-002
// loadPerformanceTestData('p003');  // Load 50-item cart for TS-CART-P-003
// loadPerformanceTestData('p004');  // Load 120-item cart for TS-CART-P-004
// loadPerformanceTestData('p007');  // Load 20-item cart for TS-CART-P-007
```

---

## Usage Instructions

### 1. Quick Test Setup
Copy the quick setup script to your browser console, then use:

```javascript
// Load test data for specific test
loadPerformanceTestData('p003');  // Loads 50-item cart
location.reload();  // Refresh to see changes
```

### 2. Verify Data Loaded
```javascript
// Check what's in localStorage
const cart = JSON.parse(localStorage.getItem('octocat-cart'));
console.log('Cart items:', cart.items.length);
console.log('Cart data:', cart);
```

### 3. Clear Test Data
```javascript
localStorage.removeItem('octocat-cart');
location.reload();
```

---

## Test Data Specifications

### P-001: Badge Update After addItem()
- **Initial State**: Empty cart
- **Action**: Add 1 product
- **Expected**: Badge updates <100ms
- **Data Size**: ~200 bytes

### P-002: Badge Update After removeItem()
- **Initial State**: Cart with 5 items
- **Action**: Remove 1 product
- **Expected**: Badge updates <100ms
- **Data Size**: ~1 KB

### P-003: Large Cart Badge Update
- **Initial State**: Cart with 50 items
- **Action**: Add 1 more product
- **Expected**: Badge updates <100ms even with large cart
- **Data Size**: ~10 KB

### P-004: Rendering 100+ Items
- **Initial State**: Cart with 120 items
- **Action**: Add/remove items, observe FPS
- **Expected**: FPS >30, no UI blocking
- **Data Size**: ~25 KB

### P-005: No UI Blocking
- **Initial State**: Empty cart
- **Action**: Add 10 items rapidly (<1 second)
- **Expected**: No long tasks >50ms
- **Data Size**: ~2 KB final

### P-006: localStorage Save Time
- **Initial State**: Cart with 1 item
- **Action**: Save 10 times, measure average
- **Expected**: <50ms average save time
- **Data Size**: ~200 bytes

### P-007: localStorage Load Time
- **Initial State**: Cart with 20 items (pre-saved)
- **Action**: Refresh page, measure load time
- **Expected**: <100ms load time
- **Data Size**: ~4 KB

### P-008: Large Data Operations
- **Initial State**: Cart with 150 items
- **Action**: Save and load operations
- **Expected**: Save <50ms, Load <100ms
- **Data Size**: ~100 KB

### P-009: Quota Management
- **Initial State**: Cart with 1000 items (~1MB)
- **Action**: Save to localStorage, check quota
- **Expected**: No quota errors, total usage <5MB
- **Data Size**: ~1 MB

### P-010: Time to Interactive
- **Initial State**: Empty cart
- **Action**: Page load, test cart icon click
- **Expected**: Icon interactive <100ms after page load
- **Data Size**: ~100 bytes

### P-011: Toast Timing
- **Initial State**: Varying
- **Action**: Add item 5 times, measure toast display
- **Expected**: Toast appears <200ms average
- **Data Size**: ~200 bytes per operation

### P-012: Animation FPS
- **Initial State**: Cart with 3 items
- **Action**: Add/remove items, trigger badge animations
- **Expected**: 55-60 FPS, smooth animations
- **Data Size**: ~600 bytes

### P-013: Memory Leaks
- **Initial State**: Varying
- **Action**: 100 add/remove operations
- **Expected**: <5MB memory growth
- **Data Size**: Varies during test

### P-014: Context Cleanup
- **Initial State**: Cart with 1 item
- **Action**: Mount/unmount CartContext
- **Expected**: No lingering subscriptions
- **Data Size**: ~200 bytes

### P-015: Toast Cleanup
- **Initial State**: Varying
- **Action**: Trigger 10 toasts rapidly
- **Expected**: 0 stale toast DOM elements after auto-dismiss
- **Data Size**: ~2 KB total

---

## Notes

- All test data should be set using `localStorage.setItem('octocat-cart', JSON.stringify(data))`
- Remember to **refresh the page** after setting test data
- Use Chrome DevTools Performance tab for timing measurements
- Use Chrome DevTools Memory tab for memory leak detection
- Use Chrome DevTools FPS meter for animation performance
- Clear cache before running Time to Interactive tests (P-010)
- Force garbage collection before taking heap snapshots (P-013, P-014)

---

**Reference**: [docs/testing/phase1-scenarios/performance-test-scenarios.md](docs/testing/phase1-scenarios/performance-test-scenarios.md)
