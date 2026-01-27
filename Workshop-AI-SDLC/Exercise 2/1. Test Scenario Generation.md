# Workshop 2: Testing Persona – Phase 1
## Test Scenario Generation & Planning

---

## 📋 **OVERVIEW**

**Workshop**: Testing Persona – Requirement to Test  
**Phase**: 1 of 3 (Test Scenario Generation)  

### **Scenario**
You are a **QA Engineer/Tester** working on the **OctoCAT Supply Chain Management** system. The development team has recently implemented a new **Cart Icon with Item Count Badge** feature (Workshop 1). 

Your task is to:
1. Analyze the implemented cart icon feature from requirement documents
2. Use **Foundry Agent** to read requirement documents and generate comprehensive test scenarios
3. Create detailed test plans covering functional, non-functional, and edge case scenarios
4. Push generated testing stories into GitHub Issues for test asset management
5. Prepare test data and environment setup requirements

### **Learning Objectives**
By completing Phase 1, you will learn to:
- ✅ Use Foundry Agent to analyze requirement documents and extract testable requirements
- ✅ Generate comprehensive test scenarios using AI agents
- ✅ Create structured test plans with test cases, preconditions, and expected results
- ✅ Use GitHub MCP to create test-related GitHub Issues
- ✅ Document test data requirements and environment setup
- ✅ Map requirements to test coverage matrix

---

## 🎯 **PREREQUISITES**

### **Required Tools**
- ✅ Visual Studio Code with GitHub Copilot extension
- ✅ GitHub Copilot Chat enabled
- ✅ GitHub MCP (Model Context Protocol) configured
- ✅ Foundry Agent or M365 Copilot Agent access
- ✅ Git installed and configured
- ✅ Node.js 18+ and npm installed

### **Completion Requirements**
- ✅ **Workshop 1 Completed**: Cart Icon feature implemented
- ✅ **Access to Requirement Documents**:
  - `exercisephase1updated.md` (Phase 1 requirements)
  - `exercisephase2updated.md` (Technical design)
  - `exercisephase3updated.md` (Implementation details)
  - `docs/specifications/cart-icon-feature-requirements.md` (if created in Workshop 1)

---

## ⏱️ **Estimated Time**: 2.5 - 3 hours

---

## 🔗 **Context from Workshop 1**

### **Implemented Feature: Cart Icon with Item Count Badge**

The development team (Workshop 1) has implemented the following cart icon feature:

**Functional Requirements:**
- Cart icon displayed in the header/navigation
- Badge showing the count of items in the cart
- Cart icon updates dynamically when items are added/removed
- Clicking cart icon navigates to the cart page
- Cart state persists across page refreshes using localStorage
- Toast notifications when items are added/removed
- Dark mode support for cart icon and badge

**Technical Implementation:**
- **CartContext**: React Context managing cart state (add, remove, update, clear)
- **CartIcon Component**: Icon with badge showing item count
- **Header Integration**: Cart icon integrated into main navigation
- **localStorage Persistence**: Cart data stored as `octocat-cart`
- **Toast Notifications**: Using react-hot-toast library
- **Accessibility**: ARIA labels, keyboard navigation support

---

## 🚀 **PHASE 1: TEST SCENARIO GENERATION**

---

### **STEP 1: ANALYZE IMPLEMENTED FEATURE** (15 minutes)

#### 1.1 Review Workshop 1 Documentation

Open and review the following requirement documents from Workshop 1:

```bash
# Navigate to the workshop repository
cd ai-sdlc-brownfield-workshop
```

**Read Phase 1 Requirements:**
```bash
# Open in VS Code
code exercisephase1updated.md
```

**Key Requirements to Extract:**
- User stories and acceptance criteria
- Functional requirements (FR-1 to FR-10)
- Non-functional requirements (NFR-1 to NFR-5)
- Edge cases and error scenarios

**Read Phase 2 Technical Design:**
```bash
code exercisephase2updated.md
```

**Technical Details to Extract:**
- Component structure (CartContext, CartIcon)
- State management approach
- localStorage implementation
- Design system constraints

**Read Phase 3 Implementation Details:**
```bash
code exercisephase3updated.md
```

**Implementation Details to Extract:**
- Cart operations (addItem, removeItem, updateItemQuantity, clearCart)
- Toast notification integration
- Accessibility features
- Performance optimizations

#### 1.2 Create Test Analysis Document

Create a new directory for test documentation:
```bash
mkdir -p docs/testing
mkdir -p docs/testing/phase1-scenarios
```

Create initial analysis file:
```bash
touch docs/testing/cart-feature-test-analysis.md
```

Add initial analysis:
```markdown
# Cart Icon Feature - Test Analysis

## Feature Under Test
**Feature**: Cart Icon with Item Count Badge  
**Workshop**: Workshop 1 (Development Persona)  
**Implementation Date**: [Current Date]  
**Version**: 1.0  

## Requirements Summary

### Functional Requirements (from Workshop 1)
1. **FR-1**: Display cart icon in header on all pages
2. **FR-2**: Show badge with item count on cart icon
3. **FR-3**: Update cart icon when items are added/removed
4. **FR-4**: Navigate to cart page when icon is clicked
5. **FR-5**: Persist cart state across page refreshes
6. **FR-6**: Show toast notifications for cart operations
7. **FR-7**: Support dark mode for cart UI
8. **FR-8**: Handle empty cart state (no badge when count = 0)
9. **FR-9**: Update cart from multiple product pages
10. **FR-10**: Accessible cart icon with proper ARIA labels

### Non-Functional Requirements
1. **NFR-1**: Cart icon updates instantly (<100ms)
2. **NFR-2**: localStorage persistence works reliably
3. **NFR-3**: WCAG 2.1 Level AA compliance
4. **NFR-4**: Responsive design (mobile, tablet, desktop)
5. **NFR-5**: Browser compatibility (Chrome, Firefox, Safari, Edge)

## Technical Components to Test
1. **CartContext** (State Management)
   - addItem()
   - removeItem()
   - updateItemQuantity()
   - clearCart()
   - loadCartFromStorage()
   - saveCartToStorage()

2. **CartIcon Component** (UI)
   - Badge rendering
   - Item count display
   - Click navigation
   - Accessibility attributes

3. **Header Component** (Integration)
   - Cart icon placement
   - Navigation behavior
   - Dark mode support

4. **localStorage Integration** (Persistence)
   - Save cart data
   - Load cart data on page refresh
   - Handle storage errors

5. **Toast Notifications** (User Feedback)
   - Success messages
   - Error messages
   - Notification timing

## Test Scope

### In Scope
- ✅ Functional testing of cart icon and badge
- ✅ UI/UX testing of cart interactions
- ✅ Integration testing (cart + products + header)
- ✅ Persistence testing (localStorage)
- ✅ Accessibility testing (WCAG 2.1)
- ✅ Responsive design testing
- ✅ Cross-browser testing
- ✅ Performance testing (state updates)

### Out of Scope
- ❌ Backend API testing (cart stored in frontend only)
- ❌ Payment processing
- ❌ User authentication
- ❌ Load testing (cart is client-side)

## Test Environment Requirements
- **Frontend URL**: http://localhost:5173
- **API URL**: http://localhost:3000
- **Browsers**: Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
- **Devices**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
- **Test Data**: Product catalog seeded from database
```

---

### **STEP 2: USE FOUNDRY AGENT TO GENERATE TEST SCENARIOS** (45 minutes)

#### 2.1 Configure Foundry Agent

**Option A: Using GitHub Copilot Chat as Foundry Agent**

Open GitHub Copilot Chat in VS Code and configure it to act as a Foundry Agent:

**Prompt 1: Configure Agent Mode**
```
You are a Foundry Test Generation Agent specializing in creating comprehensive test scenarios for web applications.

Your task is to analyze requirement documents and generate:
1. Test scenarios covering all functional requirements
2. Test cases with preconditions, steps, and expected results
3. Edge case scenarios
4. Negative test cases
5. Accessibility test scenarios
6. Performance test scenarios

Context:
- Application: OctoCAT Supply Chain Management System
- Feature: Cart Icon with Item Count Badge
- Technology: React, TypeScript, localStorage, react-hot-toast

I will provide requirement documents for you to analyze.
```

#### 2.2 Generate Functional Test Scenarios

**Prompt 2: Generate Functional Test Scenarios**
```
@workspace Analyze the cart icon feature from the following documents:
- exercisephase1updated.md
- exercisephase2updated.md
- exercisephase3updated.md

Generate comprehensive functional test scenarios for the Cart Icon feature.

For each test scenario, provide:
1. **Test Scenario ID** (TS-CART-XXX)
2. **Test Scenario Name**
3. **Description**
4. **Priority** (Critical, High, Medium, Low)
5. **Test Type** (Functional, Integration, UI, etc.)
6. **Preconditions**
7. **Test Steps** (numbered)
8. **Expected Results**
9. **Actual Results** (blank for execution)
10. **Status** (blank for execution)
11. **Related Requirements** (FR-X, NFR-X)

Generate test scenarios for:
1. **Cart Icon Visibility**
   - Cart icon appears in header on all pages
   - Cart icon visible on home page
   - Cart icon visible on products page
   - Cart icon visible on cart page
   - Cart icon visible on all navigation pages

2. **Badge Display**
   - Badge shows correct item count (0, 1, 10, 99, 100+)
   - Badge hidden when cart is empty
   - Badge appears when first item added
   - Badge updates when items added
   - Badge updates when items removed

3. **Cart Operations**
   - Add single item to cart
   - Add multiple items to cart
   - Add same item multiple times
   - Remove item from cart
   - Clear entire cart
   - Update item quantity

4. **Navigation**
   - Click cart icon navigates to cart page
   - Cart page displays all cart items
   - Back navigation preserves cart state

5. **Toast Notifications**
   - Toast shown when item added
   - Toast shown when item removed
   - Toast shown when cart cleared
   - Multiple toasts handled correctly

6. **Dark Mode**
   - Cart icon visible in dark mode
   - Badge visible in dark mode
   - Toast notifications visible in dark mode

Generate at least 25-30 functional test scenarios. Use markdown table format for easy reading.
```

**Save Output:**
- Create: `docs/testing/phase1-scenarios/functional-test-scenarios.md`
- Paste Foundry Agent's response

#### 2.3 Generate Integration Test Scenarios

**Prompt 3: Generate Integration Test Scenarios**
```
@workspace Generate integration test scenarios for the Cart Icon feature.

Focus on testing interactions between:
1. **CartContext + CartIcon Component**
   - State updates reflected in UI
   - Badge updates when context changes

2. **CartContext + Products Page**
   - Add to cart button updates cart state
   - Multiple products added to cart
   - Same product added multiple times

3. **CartContext + localStorage**
   - Cart saved to localStorage on changes
   - Cart loaded from localStorage on page load
   - localStorage errors handled gracefully

4. **CartIcon + Header Component**
   - Cart icon integrated in header
   - Header responsive with cart icon
   - Cart icon positioned correctly

5. **CartIcon + Navigation**
   - Click cart icon routes to cart page
   - Cart page shows items from context
   - Navigation preserves cart state

Generate 15-20 integration test scenarios. Include:
- Multi-component interactions
- Data flow between components
- State persistence scenarios
- Error handling scenarios

Use markdown table format.
```

**Save Output:**
- Create: `docs/testing/phase1-scenarios/integration-test-scenarios.md`
- Paste Foundry Agent's response

#### 2.4 Generate Edge Case and Negative Test Scenarios

**Prompt 4: Generate Edge Cases and Negative Tests**
```
@workspace Generate edge case and negative test scenarios for the Cart Icon feature.

Edge Cases:
1. **Boundary Values**
   - Cart with 0 items (empty)
   - Cart with 1 item
   - Cart with 99 items
   - Cart with 100+ items (badge display limit)
   - Cart with maximum localStorage capacity

2. **localStorage Edge Cases**
   - localStorage disabled in browser
   - localStorage quota exceeded
   - localStorage cleared by user
   - localStorage corrupted data
   - Concurrent tab modifications

3. **Browser Edge Cases**
   - Browser back/forward navigation
   - Page refresh with cart items
   - Multiple tabs with same cart
   - Browser private/incognito mode
   - Browser dev tools clearing storage

4. **Component Edge Cases**
   - Rapid cart updates (spam clicking)
   - Adding item while toast showing
   - Navigating while cart updating
   - Multiple products added simultaneously

Negative Tests:
1. **Invalid Operations**
   - Add invalid product to cart
   - Remove non-existent item from cart
   - Update quantity to negative value
   - Update quantity to zero
   - Add product with missing data

2. **Error Scenarios**
   - Network failure during cart operation
   - localStorage write failure
   - Component render errors
   - Toast notification failures

Generate 20-25 edge case and negative test scenarios. Include:
- Unexpected user behavior
- System limitations
- Error conditions
- Recovery scenarios

Use markdown table format.
```

**Save Output:**
- Create: `docs/testing/phase1-scenarios/edge-case-negative-scenarios.md`
- Paste Foundry Agent's response

#### 2.5 Generate Accessibility Test Scenarios

**Prompt 5: Generate Accessibility Test Scenarios**
```
@workspace Generate accessibility test scenarios for the Cart Icon feature.

Focus on WCAG 2.1 Level AA compliance:

1. **Keyboard Navigation**
   - Tab to cart icon
   - Enter key to activate cart icon
   - Focus visible on cart icon
   - Tab order correct in header

2. **Screen Reader Support**
   - Cart icon has proper ARIA label
   - Badge count announced by screen reader
   - Cart state changes announced
   - Toast notifications announced

3. **Visual Accessibility**
   - Sufficient color contrast (cart icon)
   - Sufficient color contrast (badge)
   - Badge readable at 200% zoom
   - Icon distinguishable in dark mode

4. **Motion and Animation**
   - Toast animations respect prefers-reduced-motion
   - Badge animations respect prefers-reduced-motion
   - No motion-triggered content

5. **Text Alternatives**
   - Icon has text alternative
   - Badge has accessible label
   - Visual-only information has text equivalent

Generate 15-20 accessibility test scenarios. Include:
- WCAG success criteria mapping
- Assistive technology testing steps
- Expected screen reader announcements
- Keyboard shortcuts

Use markdown table format.
```

**Save Output:**
- Create: `docs/testing/phase1-scenarios/accessibility-test-scenarios.md`
- Paste Foundry Agent's response

#### 2.6 Generate Performance Test Scenarios

**Prompt 6: Generate Performance Test Scenarios**
```
@workspace Generate performance test scenarios for the Cart Icon feature.

Focus on:

1. **State Update Performance**
   - Time to update badge after adding item (<100ms)
   - Time to save to localStorage (<50ms)
   - Time to load from localStorage on page load (<100ms)
   - Rendering performance with large cart (100+ items)

2. **UI Responsiveness**
   - Cart icon interactive within 100ms
   - Toast notification appears within 200ms
   - Badge animation smooth (60fps)
   - No UI blocking during cart operations

3. **Memory Usage**
   - localStorage usage within limits
   - No memory leaks on repeated operations
   - Cart context cleanup on unmount

4. **Concurrent Operations**
   - Multiple cart updates in quick succession
   - Cart updates while navigating
   - Multiple toasts without performance degradation

Generate 10-15 performance test scenarios. Include:
- Performance benchmarks
- Measurement methods
- Acceptable thresholds
- Performance degradation scenarios

Use markdown table format.
```

**Save Output:**
- Create: `docs/testing/phase1-scenarios/performance-test-scenarios.md`
- Paste Foundry Agent's response

#### 2.7 Generate Cross-Browser and Responsive Test Scenarios

**Prompt 7: Generate Cross-Browser and Responsive Test Scenarios**
```
@workspace Generate cross-browser and responsive design test scenarios for the Cart Icon feature.

Cross-Browser Tests:
1. **Chrome** (latest version)
2. **Firefox** (latest version)
3. **Safari** (latest version)
4. **Edge** (latest version)

Test in each browser:
- Cart icon visibility
- Badge rendering
- Toast notifications
- localStorage persistence
- Dark mode support
- Click navigation

Responsive Design Tests:
1. **Desktop** (1920x1080, 1366x768)
2. **Tablet** (768x1024, 1024x768)
3. **Mobile** (375x667, 414x896, 360x640)

Test on each device:
- Cart icon size and position
- Badge readability
- Touch targets (44x44px minimum)
- Toast notification placement
- Navigation usability

Generate 15-20 cross-browser and responsive test scenarios.

Use markdown table format.
```

**Save Output:**
- Create: `docs/testing/phase1-scenarios/cross-browser-responsive-scenarios.md`
- Paste Foundry Agent's response

---

### **STEP 3: CREATE COMPREHENSIVE TEST PLAN** (30 minutes)

#### 3.1 Consolidate Test Scenarios

Review all generated test scenario files:
- `functional-test-scenarios.md` (25-30 scenarios)
- `integration-test-scenarios.md` (15-20 scenarios)
- `edge-case-negative-scenarios.md` (20-25 scenarios)
- `accessibility-test-scenarios.md` (15-20 scenarios)
- `performance-test-scenarios.md` (10-15 scenarios)
- `cross-browser-responsive-scenarios.md` (15-20 scenarios)

**Total: ~100-130 test scenarios**

#### 3.2 Create Master Test Plan

Create: `docs/testing/cart-icon-master-test-plan.md`

**Prompt 8: Generate Master Test Plan**
```
Create a comprehensive Master Test Plan for the Cart Icon feature.

Include:

1. **Test Plan Overview**
   - Objective
   - Scope (in-scope and out-of-scope)
   - Test approach
   - Test environment
   - Test schedule

2. **Test Strategy**
   - Test types (functional, integration, accessibility, performance)
   - Test levels (unit, integration, system, acceptance)
   - Test execution approach (manual, automated)
   - Entry and exit criteria

3. **Test Coverage Matrix**
   Table mapping requirements to test scenarios:
   | Requirement ID | Requirement Description | Test Scenario IDs | Coverage % |
   |----------------|-------------------------|-------------------|------------|
   | FR-1 | Display cart icon in header | TS-CART-001, TS-CART-002 | 100% |

4. **Test Scenarios Summary**
   - Total functional scenarios: X
   - Total integration scenarios: X
   - Total accessibility scenarios: X
   - Total performance scenarios: X
   - Total cross-browser scenarios: X
   - **Grand Total: ~100+ scenarios**

5. **Test Data Requirements**
   - Product test data (IDs, names, prices)
   - Cart state test data
   - localStorage test data
   - Edge case data (large carts, empty carts)

6. **Test Environment Setup**
   - Frontend setup (localhost:5173)
   - API setup (localhost:3000)
   - Database seeding
   - Browser configurations
   - Device emulators

7. **Test Execution Schedule**
   - Phase 1: Functional testing (Week 1)
   - Phase 2: Integration testing (Week 1)
   - Phase 3: Accessibility testing (Week 2)
   - Phase 4: Performance testing (Week 2)
   - Phase 5: Cross-browser testing (Week 2)
   - Phase 6: Regression testing (Week 3)

8. **Test Deliverables**
   - Test scenarios (completed ✅)
   - Test scripts (Phase 2)
   - Test execution reports (Phase 3)
   - Defect reports (Phase 3)
   - Test summary report (Phase 3)

9. **Risk Assessment**
   - High risk areas
   - Mitigation strategies
   - Contingency plans

10. **Approval Sign-off**
    - Test Manager: _______________
    - QA Lead: _______________
    - Project Manager: _______________

Create a professional test plan document.
```

**Save Output:**
- Paste response into `docs/testing/cart-icon-master-test-plan.md`

#### 3.3 Create Test Coverage Matrix

Create: `docs/testing/test-coverage-matrix.xlsx` (or .csv)

Use GitHub Copilot to generate a CSV:

**Prompt 9: Generate Test Coverage Matrix CSV**
```
Generate a test coverage matrix CSV file mapping all requirements to test scenarios.

Format:
Requirement ID, Requirement Description, Priority, Test Scenario IDs, Total Scenarios, Coverage Status

Include all:
- Functional requirements (FR-1 to FR-10)
- Non-functional requirements (NFR-1 to NFR-5)

Map each requirement to relevant test scenario IDs from:
- functional-test-scenarios.md
- integration-test-scenarios.md
- accessibility-test-scenarios.md
- etc.

Ensure 100% coverage for all critical requirements.
```

**Save Output:**
- Create: `docs/testing/test-coverage-matrix.csv`
- Paste CSV data

---

### **STEP 4: CREATE TEST DATA AND ENVIRONMENT SETUP** (20 minutes)

#### 4.1 Define Test Data Requirements

Create: `docs/testing/test-data-requirements.md`

**Prompt 10: Generate Test Data Requirements**
```
@workspace Generate test data requirements for Cart Icon feature testing.

Based on:
- frontend/src/context/CartContext.tsx
- frontend/src/components/entity/product/Products.tsx
- api/src/models/product.ts

Create test data specifications for:

1. **Product Test Data**
   - Minimum 10 test products
   - Product fields: id, name, price, description, imageUrl, stock
   - Edge cases: very long names, special characters, price = 0, out of stock

2. **Cart State Test Data**
   - Empty cart (0 items)
   - Single item cart (1 item, quantity 1)
   - Multiple items cart (5 items, varying quantities)
   - Large cart (50 items)
   - Maximum cart (100 items)

3. **localStorage Test Data**
   - Valid cart JSON structure
   - Corrupted JSON data
   - Empty localStorage
   - localStorage with other app data

4. **User Session Test Data**
   - New user (no cart)
   - Returning user (existing cart)
   - User with expired cart

5. **Test Data Templates**
   Provide JSON templates for:
   - Sample product object
   - Sample cart item object
   - Sample localStorage cart data

Include data setup scripts if possible.
```

**Save Output:**
- Paste into `docs/testing/test-data-requirements.md`

#### 4.2 Create Environment Setup Guide

Create: `docs/testing/test-environment-setup.md`

**Prompt 11: Generate Test Environment Setup Guide**
```
Create a comprehensive test environment setup guide for the Cart Icon feature testing.

Include:

1. **Prerequisites**
   - Node.js version
   - npm version
   - Git
   - VS Code
   - Browsers to install

2. **Repository Setup**
   ```bash
   # Clone repository
   git clone [repo-url]
   cd ai-sdlc-brownfield-workshop/supply-chain-system
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   - Expected output
   - URL: http://localhost:5173

4. **API Setup**
   ```bash
   cd api
   npm install
   npm run dev
   ```
   - Expected output
   - URL: http://localhost:3000

5. **Database Setup**
   - Seed test data
   - Verify product data loaded
   ```bash
   npm run seed
   ```

6. **Browser Configuration**
   - Chrome: Install and enable dev tools
   - Firefox: Install and enable dev tools
   - Safari: Enable dev menu
   - Edge: Install and enable dev tools

7. **Test Tools Installation**
   - Playwright (for Phase 2 automation)
   - Accessibility tools (axe DevTools)
   - Performance monitoring tools

8. **Environment Verification**
   - Checklist to verify setup complete
   - Smoke tests to run

9. **Troubleshooting**
   - Common setup issues
   - Solutions

Include step-by-step instructions with expected outputs.
```

**Save Output:**
- Paste into `docs/testing/test-environment-setup.md`

---

### **STEP 5: PUSH TEST STORIES TO GITHUB ISSUES** (30 minutes)

#### 5.1 Configure GitHub MCP for Test Stories

Verify GitHub MCP is configured (from Workshop 1 Phase 1).

**Check MCP Configuration:**
```bash
# In VS Code terminal
code ~/.vscode/settings.json
```

Ensure GitHub MCP is configured:
```json
{
  "github.copilot.mcp.enabled": true,
  "github.copilot.mcp.servers": {
    "github": {
      "enabled": true
    }
  }
}
```

#### 5.2 Create GitHub Issue Template for Test Scenarios

Create: `.github/ISSUE_TEMPLATE/test-scenario.md`

```markdown
---
name: Test Scenario
about: Template for test scenario tracking
title: '[TEST] '
labels: 'testing, test-scenario'
assignees: ''
---

## Test Scenario Information

**Test Scenario ID**: TS-CART-XXX  
**Test Scenario Name**: [Name]  
**Priority**: [Critical/High/Medium/Low]  
**Test Type**: [Functional/Integration/Accessibility/Performance]  

## Description
[Brief description of what is being tested]

## Related Requirements
- [FR-X] Requirement description
- [NFR-X] Requirement description

## Preconditions
1. [List preconditions]

## Test Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Results
- [Expected result 1]
- [Expected result 2]

## Test Data
- [Test data required]

## Environment
- **Browser**: [Chrome/Firefox/Safari/Edge]
- **Device**: [Desktop/Tablet/Mobile]
- **Resolution**: [1920x1080/etc]

## Execution Status
- [ ] Not Started
- [ ] In Progress
- [ ] Passed
- [ ] Failed
- [ ] Blocked

## Actual Results
[To be filled during execution]

## Defects Found
[Link to defect issues if any]

## Notes
[Additional notes]
```

#### 5.3 Use GitHub MCP to Create Test Story Issues

Open GitHub Copilot Chat and use MCP to create issues:

**Prompt 12: Create Test Scenario Issues (Functional - High Priority)**
```
Use GitHub MCP to create GitHub Issues for high-priority functional test scenarios.

Repository: CanarysPlayground/ai-sdlc-brownfield-workshop

Create issues for the following test scenarios from docs/testing/phase1-scenarios/functional-test-scenarios.md:

1. **TS-CART-001: Cart Icon Visible in Header**
   - Title: [TEST] Cart Icon Visible in Header on All Pages
   - Priority: Critical
   - Labels: testing, test-scenario, functional, cart-icon
   - Body: [Use test scenario template with details]

2. **TS-CART-002: Badge Shows Correct Item Count**
   - Title: [TEST] Badge Shows Correct Item Count
   - Priority: Critical
   - Labels: testing, test-scenario, functional, cart-badge

3. **TS-CART-003: Badge Hidden When Cart Empty**
   - Title: [TEST] Badge Hidden When Cart is Empty
   - Priority: High
   - Labels: testing, test-scenario, functional, cart-badge

4. **TS-CART-004: Add Single Item to Cart**
   - Title: [TEST] Add Single Item to Cart Updates Badge
   - Priority: Critical
   - Labels: testing, test-scenario, functional, cart-operations

5. **TS-CART-005: Remove Item from Cart**
   - Title: [TEST] Remove Item from Cart Updates Badge
   - Priority: Critical
   - Labels: testing, test-scenario, functional, cart-operations

6. **TS-CART-006: Cart Icon Click Navigates to Cart Page**
   - Title: [TEST] Cart Icon Click Navigates to Cart Page
   - Priority: High
   - Labels: testing, test-scenario, functional, navigation

7. **TS-CART-007: Cart Persists After Page Refresh**
   - Title: [TEST] Cart Persists After Page Refresh
   - Priority: Critical
   - Labels: testing, test-scenario, functional, persistence

8. **TS-CART-008: Toast Notification on Add Item**
   - Title: [TEST] Toast Notification Shown When Item Added
   - Priority: High
   - Labels: testing, test-scenario, functional, notifications

9. **TS-CART-009: Cart Icon Visible in Dark Mode**
   - Title: [TEST] Cart Icon and Badge Visible in Dark Mode
   - Priority: High
   - Labels: testing, test-scenario, functional, dark-mode

10. **TS-CART-010: Multiple Items Added to Cart**
    - Title: [TEST] Multiple Items Can Be Added to Cart
    - Priority: High
    - Labels: testing, test-scenario, functional, cart-operations

Create these 10 GitHub Issues using MCP.

For each issue, include:
- Full test scenario description
- Preconditions
- Test steps (numbered)
- Expected results
- Test data requirements
- Environment requirements
- Related requirements (FR-X)

Use the issue template format.
```

**Expected Output:**
- 10 GitHub Issues created
- Each with unique test scenario ID
- Properly labeled and categorized

#### 5.4 Create Additional Test Story Issues

**Prompt 13: Create Integration Test Issues**
```
Use GitHub MCP to create GitHub Issues for integration test scenarios.

From docs/testing/phase1-scenarios/integration-test-scenarios.md, create issues for:

1. TS-CART-INT-001: CartContext and CartIcon Integration
2. TS-CART-INT-002: Products Page Add to Cart Integration
3. TS-CART-INT-003: localStorage Persistence Integration
4. TS-CART-INT-004: Header and CartIcon Integration
5. TS-CART-INT-005: Navigation with Cart State Preservation

Create 5 integration test issues with:
- Title: [TEST-INTEGRATION] [Scenario Name]
- Labels: testing, test-scenario, integration, cart-icon
- Detailed test steps
- Expected results
```

**Prompt 14: Create Accessibility Test Issues**
```
Use GitHub MCP to create GitHub Issues for accessibility test scenarios.

From docs/testing/phase1-scenarios/accessibility-test-scenarios.md, create issues for:

1. TS-CART-A11Y-001: Keyboard Navigation to Cart Icon
2. TS-CART-A11Y-002: Screen Reader Announces Cart Badge
3. TS-CART-A11Y-003: Color Contrast for Cart Icon and Badge
4. TS-CART-A11Y-004: Focus Visible on Cart Icon
5. TS-CART-A11Y-005: ARIA Labels for Cart Icon

Create 5 accessibility test issues with:
- Title: [TEST-A11Y] [Scenario Name]
- Labels: testing, test-scenario, accessibility, wcag, cart-icon
- WCAG success criteria mapping
- Assistive technology test steps
```

**Prompt 15: Create Edge Case Test Issues**
```
Use GitHub MCP to create GitHub Issues for edge case and negative test scenarios.

From docs/testing/phase1-scenarios/edge-case-negative-scenarios.md, create issues for:

1. TS-CART-EDGE-001: Cart with 0 Items (Empty)
2. TS-CART-EDGE-002: Cart with 100+ Items (Badge Display Limit)
3. TS-CART-EDGE-003: localStorage Disabled in Browser
4. TS-CART-EDGE-004: Rapid Cart Updates (Spam Clicking)
5. TS-CART-EDGE-005: Multiple Tabs with Same Cart

Create 5 edge case test issues with:
- Title: [TEST-EDGE] [Scenario Name]
- Labels: testing, test-scenario, edge-case, cart-icon
- Boundary conditions
- Error handling verification
```

**Prompt 16: Create Performance Test Issues**
```
Use GitHub MCP to create GitHub Issues for performance test scenarios.

From docs/testing/phase1-scenarios/performance-test-scenarios.md, create issues for:

1. TS-CART-PERF-001: Badge Update Performance (<100ms)
2. TS-CART-PERF-002: localStorage Save Performance (<50ms)
3. TS-CART-PERF-003: Cart Load from localStorage (<100ms)
4. TS-CART-PERF-004: Rendering Performance with Large Cart
5. TS-CART-PERF-005: No UI Blocking During Cart Operations

Create 5 performance test issues with:
- Title: [TEST-PERF] [Scenario Name]
- Labels: testing, test-scenario, performance, cart-icon
- Performance benchmarks
- Measurement methods
- Acceptable thresholds
```

#### 5.5 Organize Test Issues with GitHub Project Board

**Prompt 17: Create GitHub Project Board for Test Tracking**
```
Use GitHub to create a Project Board for tracking test execution.

Project Name: "Cart Icon Feature - Test Execution"

Columns:
1. **Test Scenarios** (All created test issues)
2. **Ready for Execution** (Preconditions met)
3. **In Progress** (Currently executing)
4. **Passed** (Test passed)
5. **Failed** (Test failed - needs defect)
6. **Blocked** (Blocked by dependencies)

Add all created test issues to the "Test Scenarios" column.

Organize by:
- Priority (Critical → High → Medium → Low)
- Test Type (Functional → Integration → Accessibility → Performance → Edge Cases)
```

**Manual Steps** (if MCP doesn't support project creation):
1. Go to GitHub repository
2. Click **Projects** tab
3. Click **New Project**
4. Select **Board** view
5. Name: "Cart Icon Feature - Test Execution"
6. Add columns as listed above
7. Add all test issues to the board

---

### **STEP 6: CREATE TEST EXECUTION TRACKING** (15 minutes)

#### 6.1 Create Test Execution Log Template

Create: `docs/testing/test-execution-log-template.md`

```markdown
# Test Execution Log - Cart Icon Feature

## Execution Cycle Information

**Cycle ID**: TC-001  
**Start Date**: [Date]  
**End Date**: [Date]  
**Tester**: [Name]  
**Environment**: [Frontend: localhost:5173, API: localhost:3000]  
**Browser**: [Chrome/Firefox/Safari/Edge]  
**Device**: [Desktop/Tablet/Mobile]  

---

## Test Execution Summary

| Test Type | Total | Passed | Failed | Blocked | Not Run | Pass % |
|-----------|-------|--------|--------|---------|---------|--------|
| Functional | 30 | - | - | - | - | - |
| Integration | 20 | - | - | - | - | - |
| Accessibility | 20 | - | - | - | - | - |
| Performance | 15 | - | - | - | - | - |
| Edge Cases | 25 | - | - | - | - | - |
| **Total** | **110** | **-** | **-** | **-** | **-** | **-** |

---

## Test Execution Details

### Test Scenario: [ID] - [Name]

**Execution Date**: [Date]  
**Tester**: [Name]  
**Status**: [Passed/Failed/Blocked]  

**Preconditions Met**: [Yes/No]

**Test Steps Executed**:
1. [Step 1] - [Result]
2. [Step 2] - [Result]
3. [Step 3] - [Result]

**Expected Results**: [List]

**Actual Results**: [List]

**Screenshots**: [Attach if applicable]

**Defects Found**: [Link to defect issue]

**Notes**: [Additional observations]

---

[Repeat for each test scenario]

---

## Defects Summary

| Defect ID | Title | Severity | Status | Related Test |
|-----------|-------|----------|--------|--------------|
| BUG-001 | [Title] | [Critical/High/Medium/Low] | [Open/Fixed] | TS-CART-XXX |

---

## Overall Test Cycle Results

**Pass Percentage**: X%  
**Critical Defects**: X  
**High Priority Defects**: X  
**Total Defects**: X  

**Recommendation**: [Go/No-Go for release]

**Sign-off**:
- Tester: _______________
- QA Lead: _______________
```

**Save Output:**
- Paste into `docs/testing/test-execution-log-template.md`

#### 6.2 Create Defect Report Template

Create: `.github/ISSUE_TEMPLATE/defect-report.md`

```markdown
---
name: Defect Report
about: Template for reporting defects found during testing
title: '[BUG] '
labels: 'bug, defect'
assignees: ''
---

## Defect Information

**Defect ID**: BUG-XXX  
**Severity**: [Critical/High/Medium/Low]  
**Priority**: [Critical/High/Medium/Low]  
**Status**: [New/Open/In Progress/Fixed/Closed/Reopened]  

## Related Test Scenario
**Test ID**: TS-CART-XXX  
**Test Name**: [Test scenario name]  

## Environment
- **Frontend Version**: [Version/Commit]
- **API Version**: [Version/Commit]
- **Browser**: [Chrome/Firefox/Safari/Edge] [Version]
- **Device**: [Desktop/Tablet/Mobile]
- **OS**: [Windows/Mac/Linux]
- **Screen Resolution**: [Resolution]

## Description
[Clear and concise description of the defect]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Screenshots/Videos
[Attach screenshots or screen recordings]

## Browser Console Errors
```
[Paste any console errors]
```

## Network Errors
[Any network request failures]

## Impact
[Impact on functionality and users]

## Suggested Fix
[If applicable, suggest a potential fix]

## Related Requirements
- [FR-X] or [NFR-X]

## Reproducibility
- [ ] Always reproducible
- [ ] Sometimes reproducible (X%)
- [ ] Rarely reproducible

## Notes
[Additional information]
```

---

### **STEP 7: VALIDATE TEST DOCUMENTATION** (15 minutes)

#### 7.1 Review Test Documentation Completeness

Create a validation checklist:

**Prompt 18: Create Validation Checklist**
```
Create a validation checklist to ensure all test documentation is complete.

Checklist items:
1. Test Analysis Document
   - [ ] Feature requirements documented
   - [ ] Technical components identified
   - [ ] Test scope defined
   - [ ] Environment requirements listed

2. Test Scenarios Generated
   - [ ] Functional scenarios (25-30)
   - [ ] Integration scenarios (15-20)
   - [ ] Edge case scenarios (20-25)
   - [ ] Accessibility scenarios (15-20)
   - [ ] Performance scenarios (10-15)
   - [ ] Cross-browser scenarios (15-20)
   - [ ] Total: 100+ scenarios

3. Master Test Plan
   - [ ] Test plan overview complete
   - [ ] Test strategy defined
   - [ ] Test coverage matrix created
   - [ ] Test schedule defined
   - [ ] Risk assessment included

4. Test Data Requirements
   - [ ] Product test data defined
   - [ ] Cart state test data defined
   - [ ] localStorage test data defined
   - [ ] Test data templates provided

5. Environment Setup Guide
   - [ ] Prerequisites listed
   - [ ] Setup steps documented
   - [ ] Verification checklist included
   - [ ] Troubleshooting guide included

6. GitHub Issues Created
   - [ ] Functional test issues (10+)
   - [ ] Integration test issues (5+)
   - [ ] Accessibility test issues (5+)
   - [ ] Edge case test issues (5+)
   - [ ] Performance test issues (5+)
   - [ ] Total: 30+ test issues

7. Templates Created
   - [ ] Test execution log template
   - [ ] Defect report template
   - [ ] Test scenario issue template

8. Project Board Setup
   - [ ] Project board created
   - [ ] Columns defined
   - [ ] Test issues added to board

Generate a comprehensive validation checklist.
```

**Save Output:**
- Create: `docs/testing/phase1-validation-checklist.md`
- Paste checklist

#### 7.2 Use GitHub Copilot to Verify Coverage

**Prompt 19: Verify Test Coverage**
```
@workspace Analyze the generated test scenarios and verify coverage.

Check:
1. All functional requirements (FR-1 to FR-10) have test scenarios
2. All non-functional requirements (NFR-1 to NFR-5) have test scenarios
3. All CartContext functions have test scenarios
4. All CartIcon component features have test scenarios
5. All integration points have test scenarios

Generate a coverage report:
| Requirement | Description | Test Scenarios | Coverage |
|-------------|-------------|----------------|----------|
| FR-1 | Display cart icon | TS-CART-001, TS-CART-002 | 100% |

Identify any gaps in coverage.
```

**Save Output:**
- Create: `docs/testing/test-coverage-report.md`
- Paste coverage report

#### 7.3 Review and Refine

Go through each generated document and:
1. Check for consistency across documents
2. Verify test scenario IDs are unique
3. Ensure all requirements are mapped
4. Validate test steps are clear and actionable
5. Check that expected results are specific and measurable

---

## 📊 **DELIVERABLES**

At the end of Phase 1, you should have:

### **Documentation**
- ✅ `docs/testing/cart-feature-test-analysis.md` - Feature analysis
- ✅ `docs/testing/cart-icon-master-test-plan.md` - Comprehensive test plan
- ✅ `docs/testing/test-coverage-matrix.csv` - Requirements to test mapping
- ✅ `docs/testing/test-coverage-report.md` - Coverage analysis
- ✅ `docs/testing/test-data-requirements.md` - Test data specifications
- ✅ `docs/testing/test-environment-setup.md` - Environment setup guide
- ✅ `docs/testing/phase1-validation-checklist.md` - Validation checklist

### **Test Scenarios** (100+ scenarios)
- ✅ `docs/testing/phase1-scenarios/functional-test-scenarios.md` (25-30)
- ✅ `docs/testing/phase1-scenarios/integration-test-scenarios.md` (15-20)
- ✅ `docs/testing/phase1-scenarios/edge-case-negative-scenarios.md` (20-25)
- ✅ `docs/testing/phase1-scenarios/accessibility-test-scenarios.md` (15-20)
- ✅ `docs/testing/phase1-scenarios/performance-test-scenarios.md` (10-15)
- ✅ `docs/testing/phase1-scenarios/cross-browser-responsive-scenarios.md` (15-20)

### **GitHub Assets**
- ✅ **30+ GitHub Issues** for test scenarios
  - 10+ Functional test issues
  - 5+ Integration test issues
  - 5+ Accessibility test issues
  - 5+ Edge case test issues
  - 5+ Performance test issues
- ✅ **GitHub Project Board**: "Cart Icon Feature - Test Execution"
- ✅ **Issue Templates**:
  - `.github/ISSUE_TEMPLATE/test-scenario.md`
  - `.github/ISSUE_TEMPLATE/defect-report.md`

### **Templates**
- ✅ `docs/testing/test-execution-log-template.md`
- ✅ Test scenario issue template
- ✅ Defect report issue template

---

## ✅ **SUCCESS CRITERIA**

**Phase 1 is complete when:**
- [ ] Foundry Agent successfully analyzed requirement documents
- [ ] 100+ comprehensive test scenarios generated
- [ ] Master test plan created with coverage matrix
- [ ] Test data requirements documented
- [ ] Environment setup guide created
- [ ] 30+ test story GitHub Issues created
- [ ] GitHub Project Board set up for test tracking
- [ ] Test execution and defect templates created
- [ ] All documentation reviewed and validated
- [ ] Test coverage verified at 100% for all requirements

---

## 🎓 **KEY TAKEAWAYS**

By completing Phase 1, you have learned:
1. ✅ How to use **Foundry Agent** to analyze requirements and generate test scenarios
2. ✅ How to create comprehensive test plans from functional specifications
3. ✅ How to use **GitHub MCP** to create test story issues programmatically
4. ✅ How to organize test scenarios by type (functional, integration, accessibility, performance)
5. ✅ How to create test coverage matrices mapping requirements to test cases
6. ✅ How to document test data and environment requirements
7. ✅ How to set up project boards for test execution tracking
8. ✅ How to prepare templates for test execution and defect reporting

---

## 🔜 **NEXT STEPS: PHASE 2**

In **Phase 2 (Automation Scripting)**, you will:
- Use GitHub Copilot Custom Agent to generate Playwright test scripts
- Convert test scenarios into automated test code (Python or TypeScript)
- Implement BDD/TDD approach using appropriate frameworks
- Create reusable test utilities and page objects
- Organize automated tests in a structured test suite

**Preview of Phase 2:**
- Generate Playwright scripts from test scenarios
- Implement Page Object Model (POM) pattern
- Create test fixtures and helpers
- Add test configuration for multiple browsers
- Prepare tests for CI/CD integration

---

## 📚 **ADDITIONAL RESOURCES**

- **Foundry Agent Documentation**: [Link to Foundry docs]
- **GitHub MCP Documentation**: [Link to MCP docs]
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Test Planning Best Practices**: [Link to resources]
- **GitHub Issues Best Practices**: [Link to resources]
- **Playwright Documentation**: https://playwright.dev/ (for Phase 2)

---

## 📞 **SUPPORT**

If you encounter issues during Phase 1:
1. Review the validation checklist
2. Verify Foundry Agent configuration
3. Check GitHub MCP authentication
4. Review generated test scenarios for completeness
5. Consult Phase 1 documentation

---

**END OF PHASE 1**

Proceed to **Phase 2: Automation Scripting** once all deliverables are complete and validated.

---

*Workshop 2: Testing Persona – Phase 1*  
*Last Updated: [Current Date]*  
*Version: 1.0*