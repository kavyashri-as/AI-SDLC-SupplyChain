# Test Data Requirements - Cart Icon Feature

**Feature**: Cart Icon with Item Count Badge  
**Date**: January 28, 2026  
**Version**: 1.0  

---

## Overview

This document specifies all test data required for comprehensive testing of the Cart Icon feature. Test data includes product catalog, cart states, localStorage scenarios, and error conditions.

---

## 1. Product Test Data

### 1.1 Standard Products (10 required)

Minimum 10 products with complete, valid data:

```json
{
  "productId": "prod-001",
  "name": "Premium Cat Food - Salmon Flavor",
  "price": 24.99,
  "quantity": 1,
  "imageUrl": "/images/products/cat-food-salmon.jpg",
  "sku": "CAT-FOOD-001",
  "category": "Food",
  "inStock": true
}
```

**Required Product Mix:**
- 5 products: Price range $10-$30
- 3 products: Price range $31-$100
- 2 products: Price range $101-$500
- Mix of categories: Food, Toys, Accessories, Supplies
- All products must have unique productId
- All products must have valid images

### 1.2 Edge Case Products (5 required)

Products with boundary conditions:

**1. Very Long Product Name**
```json
{
  "productId": "prod-long-001",
  "name": "Super Premium Ultra Deluxe Organic Free-Range Grass-Fed Natural Salmon Flavored Grain-Free Gluten-Free High-Protein Low-Fat Cat Food For Senior Cats With Sensitive Stomachs",
  "price": 49.99,
  "quantity": 1,
  "imageUrl": "/images/products/long-name-product.jpg",
  "sku": "LONG-NAME-001"
}
```

**2. Minimum Price Product**
```json
{
  "productId": "prod-min-price",
  "name": "Cat Treat Sample",
  "price": 0.01,
  "quantity": 1,
  "imageUrl": "/images/products/treat-sample.jpg",
  "sku": "TREAT-SAMPLE-001"
}
```

**3. Maximum Price Product**
```json
{
  "productId": "prod-max-price",
  "name": "Luxury Cat Tower Deluxe Edition",
  "price": 99999.99,
  "quantity": 1,
  "imageUrl": "/images/products/luxury-tower.jpg",
  "sku": "TOWER-LUX-001"
}
```

**4. Special Characters in Name**
```json
{
  "productId": "prod-special-char",
  "name": "Cat Food & Treats (Mix) - 50% Off! $$$",
  "price": 19.99,
  "quantity": 1,
  "imageUrl": "/images/products/special-char.jpg",
  "sku": "SPECIAL-CHAR-001"
}
```

**5. Unicode/International Characters**
```json
{
  "productId": "prod-unicode",
  "name": "고양이 사료 / кошачья еда / القط الغذاء",
  "price": 29.99,
  "quantity": 1,
  "imageUrl": "/images/products/unicode-product.jpg",
  "sku": "UNICODE-001"
}
```

---

## 2. Cart State Test Data

### 2.1 Empty Cart
```json
{
  "items": []
}
```
**Usage**: Default state, badge hidden tests

### 2.2 Single Item Cart
```json
{
  "items": [
    {
      "productId": "prod-001",
      "name": "Cat Food",
      "price": 24.99,
      "quantity": 1,
      "imageUrl": "/images/products/cat-food.jpg"
    }
  ]
}
```
**Usage**: Badge appears, count = 1 tests

### 2.3 Multiple Items Cart (5 items)
```json
{
  "items": [
    {"productId": "prod-001", "name": "Cat Food", "price": 24.99, "quantity": 2},
    {"productId": "prod-002", "name": "Cat Toy", "price": 9.99, "quantity": 1},
    {"productId": "prod-003", "name": "Litter Box", "price": 39.99, "quantity": 1},
    {"productId": "prod-004", "name": "Cat Treats", "price": 7.99, "quantity": 5},
    {"productId": "prod-005", "name": "Cat Bed", "price": 54.99, "quantity": 1}
  ]
}
```
**Total Item Count**: 10  
**Usage**: Badge count tests, multiple items display

### 2.4 Large Cart (50 items)
```javascript
// Generate 50 items programmatically
const largeCart = {
  items: Array.from({ length: 50 }, (_, i) => ({
    productId: `prod-${String(i + 1).padStart(3, '0')}`,
    name: `Product ${i + 1}`,
    price: Math.random() * 100 + 10,
    quantity: Math.floor(Math.random() * 5) + 1,
    imageUrl: `/images/products/product-${i + 1}.jpg`
  }))
};
```
**Usage**: Performance tests, large cart handling

### 2.5 Maximum Cart (100+ items)
```javascript
// Generate 100+ items
const maxCart = {
  items: Array.from({ length: 120 }, (_, i) => ({
    productId: `prod-max-${String(i + 1).padStart(3, '0')}`,
    name: `Max Product ${i + 1}`,
    price: 19.99,
    quantity: 1,
    imageUrl: `/images/products/default.jpg`
  }))
};
```
**Total Item Count**: 120  
**Expected Badge**: "99+"  
**Usage**: Badge "99+" display, performance, localStorage quota tests

### 2.6 Cart with High Quantity Single Item
```json
{
  "items": [
    {
      "productId": "prod-001",
      "name": "Cat Food",
      "price": 24.99,
      "quantity": 150,
      "imageUrl": "/images/products/cat-food.jpg"
    }
  ]
}
```
**Total Item Count**: 150  
**Expected Badge**: "99+"  
**Usage**: Badge "99+" with single item

---

## 3. localStorage Test Data

### 3.1 Valid localStorage Data
```javascript
// Set valid cart in localStorage
localStorage.setItem('octocat-cart', JSON.stringify({
  items: [
    {productId: "prod-001", name: "Cat Food", price: 24.99, quantity: 2},
    {productId: "prod-002", name: "Cat Toy", price: 9.99, quantity: 1}
  ]
}));
```

### 3.2 Corrupted localStorage Data

**Invalid JSON Syntax**
```javascript
localStorage.setItem('octocat-cart', '{items: [invalid json}');
```

**Missing Closing Bracket**
```javascript
localStorage.setItem('octocat-cart', '{"items": [{"productId": "prod-001"}');
```

**Wrong Data Type**
```javascript
localStorage.setItem('octocat-cart', '12345'); // number instead of object
localStorage.setItem('octocat-cart', '"string"'); // string instead of object
```

**Missing Required Fields**
```javascript
localStorage.setItem('octocat-cart', JSON.stringify({
  items: [
    {productId: "prod-001"} // missing name, price, quantity
  ]
}));
```

### 3.3 Empty localStorage
```javascript
localStorage.removeItem('octocat-cart');
// or
localStorage.clear();
```

### 3.4 localStorage with Large Data (Near Quota)
```javascript
// Generate ~5MB of cart data (approaching typical 5-10MB quota)
const largeDataCart = {
  items: Array.from({ length: 5000 }, (_, i) => ({
    productId: `prod-large-${i}`,
    name: `Product with very long description to increase data size ${i}`.repeat(10),
    price: 99.99,
    quantity: 10,
    imageUrl: `/images/products/large-data-${i}.jpg`,
    metadata: {
      longField: 'x'.repeat(1000)
    }
  }))
};
localStorage.setItem('octocat-cart', JSON.stringify(largeDataCart));
```

### 3.5 localStorage with Other App Data
```javascript
// Simulate multiple apps using localStorage
localStorage.setItem('other-app-data', 'some data');
localStorage.setItem('user-preferences', JSON.stringify({theme: 'dark'}));
localStorage.setItem('octocat-cart', JSON.stringify({items: [...]}));
localStorage.setItem('session-token', 'abc123');
```

---

## 4. Test Data Setup Scripts

### 4.1 Browser Console Script - Set Test Cart

```javascript
// Copy-paste into browser console to set test cart

function setTestCart(itemCount) {
  const testCart = {
    items: Array.from({ length: itemCount }, (_, i) => ({
      productId: `test-prod-${i + 1}`,
      name: `Test Product ${i + 1}`,
      price: Math.round((Math.random() * 50 + 10) * 100) / 100,
      quantity: Math.floor(Math.random() * 5) + 1,
      imageUrl: `/images/products/test-${i + 1}.jpg`
    }))
  };
  
  localStorage.setItem('octocat-cart', JSON.stringify(testCart));
  console.log(`✅ Set cart with ${itemCount} items`);
  console.log('Reload page to see changes');
  return testCart;
}

// Usage:
setTestCart(5);   // Set cart with 5 items
setTestCart(50);  // Set cart with 50 items
setTestCart(100); // Set cart with 100 items (badge shows "99+")
```

### 4.2 Browser Console Script - Clear Cart

```javascript
function clearTestCart() {
  localStorage.removeItem('octocat-cart');
  console.log('✅ Cart cleared from localStorage');
  console.log('Reload page to see changes');
}

// Usage:
clearTestCart();
```

### 4.3 Browser Console Script - Corrupt Cart Data

```javascript
function corruptCartData(type = 'syntax') {
  switch(type) {
    case 'syntax':
      localStorage.setItem('octocat-cart', '{invalid json}');
      break;
    case 'type':
      localStorage.setItem('octocat-cart', '12345');
      break;
    case 'missing-fields':
      localStorage.setItem('octocat-cart', JSON.stringify({items: [{productId: "prod-001"}]}));
      break;
    case 'empty-string':
      localStorage.setItem('octocat-cart', '');
      break;
    default:
      localStorage.setItem('octocat-cart', 'corrupted');
  }
  console.log(`✅ Set corrupted cart data (type: ${type})`);
  console.log('Reload page to test error handling');
}

// Usage:
corruptCartData('syntax');
corruptCartData('type');
corruptCartData('missing-fields');
```

### 4.4 Node.js Script - Generate Test Products

```javascript
// generate-test-products.js
// Run with: node generate-test-products.js

const fs = require('fs');

const categories = ['Food', 'Toys', 'Accessories', 'Supplies'];
const adjectives = ['Premium', 'Deluxe', 'Natural', 'Organic', 'High-Quality'];
const productTypes = ['Cat Food', 'Cat Toy', 'Litter Box', 'Cat Bed', 'Scratching Post'];

const products = Array.from({ length: 15 }, (_, i) => ({
  productId: `prod-${String(i + 1).padStart(3, '0')}`,
  name: `${adjectives[i % adjectives.length]} ${productTypes[i % productTypes.length]}`,
  price: Math.round((Math.random() * 100 + 10) * 100) / 100,
  category: categories[i % categories.length],
  sku: `SKU-${String(i + 1).padStart(5, '0')}`,
  imageUrl: `/images/products/product-${i + 1}.jpg`,
  inStock: true,
  description: `High-quality ${productTypes[i % productTypes.length].toLowerCase()} for your pet`
}));

fs.writeFileSync('test-products.json', JSON.stringify(products, null, 2));
console.log('✅ Generated 15 test products in test-products.json');
```

---

## 5. Test Data Management

### 5.1 Before Each Test
```javascript
// Reset to known state
beforeEach(() => {
  localStorage.clear();
  // Set specific test cart if needed
  const testCart = { items: [] };
  localStorage.setItem('octocat-cart', JSON.stringify(testCart));
});
```

### 5.2 After Each Test
```javascript
// Cleanup
afterEach(() => {
  localStorage.clear();
});
```

---

## 6. Database Seed Data (if applicable)

If products are stored in a database, seed with:

```sql
-- seed-products.sql
INSERT INTO products (product_id, name, price, category, sku, image_url, in_stock) VALUES
('prod-001', 'Premium Cat Food - Salmon', 24.99, 'Food', 'CAT-FOOD-001', '/images/products/cat-food-salmon.jpg', 1),
('prod-002', 'Interactive Cat Toy', 9.99, 'Toys', 'CAT-TOY-001', '/images/products/cat-toy.jpg', 1),
('prod-003', 'Self-Cleaning Litter Box', 149.99, 'Supplies', 'LITTER-001', '/images/products/litter-box.jpg', 1),
('prod-004', 'Organic Cat Treats', 7.99, 'Food', 'CAT-TREAT-001', '/images/products/cat-treats.jpg', 1),
('prod-005', 'Luxury Cat Bed', 54.99, 'Accessories', 'CAT-BED-001', '/images/products/cat-bed.jpg', 1);
-- Add 10 more products...
```

---

## 7. Test Data Validation Checklist

Before starting testing, verify:

- [ ] At least 15 products available in test environment
- [ ] Product data includes all required fields
- [ ] Product images accessible
- [ ] localStorage accessible in test browser
- [ ] Test scripts validated in browser console
- [ ] Database seeded (if applicable)
- [ ] Edge case products created (long names, special characters, etc.)
- [ ] Large cart data (100+ items) prepared for performance tests
- [ ] Corrupted data samples prepared for error handling tests

---

## 8. Summary

**Total Test Products Required**: 15 (10 standard + 5 edge cases)  
**Cart State Variations**: 6 (empty, single, multiple, large, max, high-quantity)  
**localStorage Scenarios**: 5 (valid, corrupted, empty, near-quota, with other data)  
**Setup Scripts**: 4 (set cart, clear cart, corrupt data, generate products)  

**Status**: ✅ Ready for test execution  
**Last Updated**: January 28, 2026
