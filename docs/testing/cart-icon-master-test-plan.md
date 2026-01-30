# Cart Icon Feature - Master Test Plan

**Feature**: Cart Icon with Item Count Badge  
**Version**: 1.0  
**Date**: January 28, 2026  
**Status**: Draft  

---

## 1. Test Plan Overview

### 1.1 Objective
Validate that the Cart Icon with Item Count Badge feature meets all functional and non-functional requirements, including:
- Functional behavior (icon visibility, badge display, cart operations)
- Performance benchmarks (NFR-1: <100ms badge updates, NFR-2: <50ms localStorage saves)
- Accessibility compliance (WCAG 2.1 Level AA)
- Cross-browser and responsive design compatibility
- Edge case and error handling

### 1.2 Scope

#### In Scope
- ✅ Cart icon visibility and positioning in header
- ✅ Badge display with correct item count (0, 1-99, 99+)
- ✅ Cart operations (add, remove, update, clear)
- ✅ localStorage persistence across page refreshes
- ✅ Toast notifications for user feedback
- ✅ Dark mode support
- ✅ Accessibility features (WCAG 2.1 Level AA)
- ✅ Performance testing (badge updates, localStorage, memory)
- ✅ Cross-browser testing (Chrome, Firefox, Safari, Edge)
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Edge cases and negative testing

#### Out of Scope
- ❌ Backend API testing (cart is client-side only)
- ❌ Payment processing
- ❌ User authentication
- ❌ Load testing (cart is local storage based)
- ❌ Security penetration testing

### 1.3 Test Environment

| Component | Specification |
|-----------|--------------|
| **Frontend** | React 18, Vite, running on http://localhost:5173 |
| **Backend API** | Node.js 22 LTS, Express, running on http://localhost:3001 |
| **Browsers** | Chrome (latest), Firefox (latest), Safari (latest), Edge (latest) |
| **Devices** | Desktop (1920x1080, 1366x768), Tablet (768x1024), Mobile (375x667, 414x896) |
| **Tools** | Chrome DevTools (Performance, Memory, Application tabs), React DevTools, Lighthouse, axe DevTools |

### 1.4 Test Approach
- **Manual Testing**: Functional, integration, accessibility scenarios (Weeks 1-2)
- **Performance Testing**: Using Chrome DevTools and React Profiler (Week 2)
- **Automated Testing**: Playwright scripts (Phase 2 - Future)
- **Cross-browser Testing**: Manual testing on all major browsers (Week 2)

### 1.5 Test Schedule

| Phase | Focus Area | Duration | Timeline |
|-------|------------|----------|----------|
| Phase 1 | Functional Testing | 3 days | Week 1, Days 1-3 |
| Phase 2 | Integration Testing | 2 days | Week 1, Days 4-5 |
| Phase 3 | Accessibility Testing | 2 days | Week 2, Days 1-2 |
| Phase 4 | **Performance Testing** | **2 days** | **Week 2, Days 3-4** |
| Phase 5 | Cross-browser/Responsive | 1 day | Week 2, Day 5 |
| Phase 6 | Edge Case Testing | 2 days | Week 3, Days 1-2 |
| Phase 7 | Regression Testing | 3 days | Week 3, Days 3-5 |

---

## 2. Test Strategy

### 2.1 Test Types
- **Functional Testing**: 30 scenarios covering cart icon, badge, operations, navigation, toasts
- **Integration Testing**: 20 scenarios testing component interactions
- **Accessibility Testing**: 20 scenarios ensuring WCAG 2.1 Level AA compliance
- **Performance Testing**: **15 scenarios with specific benchmarks** (detailed below)
- **Edge Case Testing**: 25 scenarios covering boundary conditions and negative tests
- **Cross-browser Testing**: 20 scenarios across 4 browsers and multiple devices

### 2.2 Test Levels
- **Component Level**: Individual component testing (CartIcon, CartContext)
- **Integration Level**: Component interaction testing (CartContext + CartIcon + Header)
- **System Level**: End-to-end user workflows
- **Acceptance Level**: Validation against acceptance criteria

### 2.3 Entry Criteria
- ✅ Workshop 1 implementation complete (Cart Icon feature deployed)
- ✅ All test scenarios documented
- ✅ Test environment set up and accessible
- ✅ Test data prepared (product catalog, cart states, localStorage scenarios)
- ✅ Testing tools installed (Chrome DevTools, React DevTools, axe DevTools)

### 2.4 Exit Criteria
- ✅ 100% of Critical priority tests passed
- ✅ 95%+ overall test pass rate
- ✅ No Critical or High severity defects open
- ✅ All performance benchmarks met (NFR-1, NFR-2)
- ✅ Accessibility compliance verified (WCAG 2.1 Level AA)
- ✅ Cross-browser compatibility confirmed
- ✅ Test summary report completed

---

## 3. Performance Testing Plan (Phase 4)

### 3.1 Performance Test Overview

**Focus**: Validate Cart Icon feature meets non-functional requirements for performance:
- **NFR-1**: Badge updates within 100ms
- **NFR-2**: localStorage save <50ms, load <100ms
- **NFR-3**: UI remains responsive (no blocking, 60fps animations)
- **NFR-4**: No memory leaks after extended usage

**Reference Documents**:
- Test Scenarios: [docs/testing/phase1-scenarios/performance-test-scenarios.md](docs/testing/phase1-scenarios/performance-test-scenarios.md)
- Test Data: [docs/testing/PerformanceTestData.md](docs/testing/PerformanceTestData.md)

### 3.2 Performance Test Categories

#### 3.2.1 State Update Performance (5 tests)

| Test ID | Test Name | Benchmark | Priority | Test Data Required |
|---------|-----------|-----------|----------|-------------------|
| TS-CART-P-001 | Badge Update After addItem() | <100ms | Critical | Empty cart (0 items) |
| TS-CART-P-002 | Badge Update After removeItem() | <100ms | Critical | Cart with 5 items |
| TS-CART-P-003 | Badge Update With Large Cart | <100ms | High | Cart with 50 items |
| TS-CART-P-004 | Rendering Performance 100+ Items | FPS >30, no blocking | High | Cart with 120 items |
| TS-CART-P-005 | No UI Blocking During Updates | No tasks >50ms | Critical | 10 products to add rapidly |

**Testing Approach**:
1. Use Chrome DevTools Performance tab to record rendering timeline
2. Use React Profiler to measure component render times
3. Use Performance API (performance.now()) for precise timing
4. Enable CPU throttling (4x slowdown) to simulate slower devices
5. Verify no frame drops or UI freezing

**Setup Commands**:
```javascript
// Load test data from browser console
loadPerformanceTestData('p002');  // For P-002 (5 items)
loadPerformanceTestData('p003');  // For P-003 (50 items)
loadPerformanceTestData('p004');  // For P-004 (120 items)
location.reload();
```

#### 3.2.2 localStorage Performance (4 tests)

| Test ID | Test Name | Benchmark | Priority | Test Data Required |
|---------|-----------|-----------|----------|-------------------|
| TS-CART-P-006 | localStorage Save Time | <50ms average | Critical | 1 item (repeat 10x) |
| TS-CART-P-007 | localStorage Load Time | <100ms | Critical | Cart with 20 items |
| TS-CART-P-008 | Large Data Operations | Save <50ms, Load <100ms | High | Cart with 150 items (~100KB) |
| TS-CART-P-009 | localStorage Quota Management | <5MB total usage | Medium | Cart with 1000 items (~1MB) |

**Testing Approach**:
1. Use Performance API to measure save/load times
2. Use Chrome DevTools Application tab to inspect localStorage size
3. Test with production build for accurate measurements
4. Clear cache between tests for consistent results
5. Verify no quota exceeded errors

**Setup Commands**:
```javascript
// P-006: Single item (repeat 10 times)
const testData = {items: [{productId: "test-001", name: "Test", price: 24.99, quantity: 1}]};
for (let i = 0; i < 10; i++) {
  const start = performance.now();
  localStorage.setItem('octocat-cart', JSON.stringify(testData));
  const end = performance.now();
  console.log(`Save ${i+1}: ${(end-start).toFixed(2)}ms`);
}

// P-007: 20 items
loadPerformanceTestData('p007');
location.reload();  // Measure load time

// P-008: 150 items
const largeCart = generateP008LargeDataCart();  // From PerformanceTestData.md
localStorage.setItem('octocat-cart', JSON.stringify(largeCart));
```

#### 3.2.3 UI Responsiveness (3 tests)

| Test ID | Test Name | Benchmark | Priority | Test Data Required |
|---------|-----------|-----------|----------|-------------------|
| TS-CART-P-010 | Time to Interactive | <100ms TTI | Critical | Empty cart |
| TS-CART-P-011 | Toast Notification Timing | <200ms | High | 1 product (repeat 5x) |
| TS-CART-P-012 | Badge Animation (60fps) | 55-60 FPS | Medium | Cart with 3 items |

**Testing Approach**:
1. Run Lighthouse Performance audit for TTI metric
2. Use FPS meter in Chrome DevTools
3. Use Performance API to measure toast display time
4. Verify smooth animations with no frame drops
5. Test on production build

**Setup Commands**:
```javascript
// P-010: Clear cache, hard reload
localStorage.clear();
// Then run Lighthouse audit

// P-012: Animation test
loadPerformanceTestData('p012');
location.reload();
// Enable FPS meter: DevTools > More Tools > Rendering > Frame Rendering Stats
```

#### 3.2.4 Memory Management (3 tests)

| Test ID | Test Name | Benchmark | Priority | Test Data Required |
|---------|-----------|-----------|----------|-------------------|
| TS-CART-P-013 | Memory Leaks After 100+ Ops | <5MB growth | High | 20 products for 100 operations |
| TS-CART-P-014 | CartContext Cleanup | No leaks on unmount | Medium | Cart with 1 item |
| TS-CART-P-015 | Toast Cleanup | 0 stale DOM elements | Medium | 10 products for rapid toasts |

**Testing Approach**:
1. Use Chrome DevTools Memory tab for heap snapshots
2. Take snapshot before and after operations
3. Force garbage collection between snapshots
4. Check for detached DOM nodes and event listeners
5. Verify clean unmount of components

**Setup Commands**:
```javascript
// P-013: Memory leak test
async function runMemoryLeakTest() {
  console.log('Take initial heap snapshot now (DevTools > Memory > Take snapshot)');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Perform 100 operations
  for (let i = 0; i < 100; i++) {
    // Alternate add/remove operations
    // ... (see PerformanceTestData.md for full script)
  }
  
  console.log('Force garbage collection (DevTools > Memory > Collect garbage)');
  console.log('Take second heap snapshot and compare');
}

// P-014: Context cleanup
loadPerformanceTestData('p014');
// Navigate to Products page, take snapshot, navigate away, force GC, take snapshot

// P-015: Toast cleanup
// Add 10 items rapidly, wait 5 seconds, inspect DOM
document.querySelectorAll('.toast').length;  // Should be 0
```

### 3.3 Performance Test Data Setup

All performance test data is available in [docs/testing/PerformanceTestData.md](docs/testing/PerformanceTestData.md).

**Quick Setup Script** (copy to browser console):
```javascript
const performanceTestData = {
  p001: { items: [] },
  p002: { items: Array.from({ length: 5 }, (_, i) => ({productId: `perf-00${i+1}`, name: `Test ${i+1}`, price: 19.99, quantity: 1})) },
  p003: { items: Array.from({ length: 50 }, (_, i) => ({productId: `perf-${String(i+1).padStart(3,'0')}`, name: `Large ${i+1}`, price: 29.99, quantity: 1})) },
  p004: { items: Array.from({ length: 120 }, (_, i) => ({productId: `max-${String(i+1).padStart(3,'0')}`, name: `Max ${i+1}`, price: 19.99, quantity: 1})) },
  p007: { items: Array.from({ length: 20 }, (_, i) => ({productId: `load-${String(i+1).padStart(3,'0')}`, name: `Load ${i+1}`, price: 29.99, quantity: 1})) },
  p012: { items: Array.from({ length: 3 }, (_, i) => ({productId: `anim-00${i+1}`, name: `Anim ${i+1}`, price: 19.99, quantity: 1})) },
  p014: { items: [{productId: "cleanup-001", name: "Cleanup Test", price: 29.99, quantity: 1}] }
};

function loadPerformanceTestData(testId) {
  const data = performanceTestData[testId];
  if (data) {
    localStorage.setItem('octocat-cart', JSON.stringify(data));
    console.log(`✅ Loaded test data for ${testId.toUpperCase()}: ${data.items.length} items`);
  }
}
```

### 3.4 Performance Test Execution Checklist

**Day 1: State Update & localStorage Performance**

- [ ] **P-001**: Badge update after addItem() - ✅ Pass: <100ms
- [ ] **P-002**: Badge update after removeItem() - ✅ Pass: <100ms
- [ ] **P-003**: Large cart badge update (50 items) - ✅ Pass: <100ms
- [ ] **P-004**: Rendering 100+ items - ✅ Pass: FPS >30, no blocking
- [ ] **P-005**: No UI blocking during rapid operations - ✅ Pass: No tasks >50ms
- [ ] **P-006**: localStorage save time - ✅ Pass: <50ms average
- [ ] **P-007**: localStorage load time - ✅ Pass: <100ms
- [ ] **P-008**: Large data operations (150 items) - ✅ Pass: Within benchmarks

**Day 2: UI Responsiveness & Memory Management**

- [ ] **P-009**: localStorage quota management - ✅ Pass: <5MB, no errors
- [ ] **P-010**: Time to Interactive - ✅ Pass: <100ms TTI
- [ ] **P-011**: Toast notification timing - ✅ Pass: <200ms average
- [ ] **P-012**: Badge animation FPS - ✅ Pass: 55-60 FPS
- [ ] **P-013**: Memory leaks after 100+ operations - ✅ Pass: <5MB growth
- [ ] **P-014**: Context cleanup on unmount - ✅ Pass: No leaks
- [ ] **P-015**: Toast cleanup (no stale DOM) - ✅ Pass: 0 stale elements

### 3.5 Performance Test Tools Required

| Tool | Purpose | Usage |
|------|---------|-------|
| **Chrome DevTools - Performance** | Timing analysis, FPS monitoring | Record timeline during operations |
| **Chrome DevTools - Memory** | Heap snapshots, leak detection | Take snapshots before/after operations |
| **Chrome DevTools - Application** | localStorage inspection | Check storage size and data |
| **React DevTools Profiler** | Component render timing | Measure React component performance |
| **Lighthouse** | Overall performance audit | TTI, FCP, LCP metrics |
| **Performance API** | Programmatic timing | `performance.now()` for precise timing |

### 3.6 Performance Test Success Criteria

| Metric | Target | Pass Threshold | Warning Threshold | Fail Threshold |
|--------|--------|----------------|-------------------|----------------|
| Badge Update Time | <100ms | <100ms | 100-150ms | >150ms |
| localStorage Save | <50ms | <50ms avg | 50-100ms avg | >100ms avg |
| localStorage Load | <100ms | <100ms | 100-200ms | >200ms |
| FPS (animations) | 60fps | 55-60fps | 45-55fps | <45fps |
| UI Blocking Tasks | 0 tasks >50ms | No tasks >50ms | 1-2 tasks 50-100ms | Tasks >100ms |
| Memory Growth | <5MB per 100 ops | <5MB | 5-10MB | >10MB |
| Time to Interactive | <100ms | <100ms | 100-200ms | >200ms |
| Toast Display | <200ms | <200ms avg | 200-300ms avg | >300ms avg |

---

## 4. Test Scenarios Summary

### 4.1 Test Coverage by Type

| Test Type | Total Scenarios | Priority Breakdown | Status |
|-----------|----------------|-------------------|--------|
| Functional | 30 | Critical: 12, High: 10, Medium: 6, Low: 2 | Documented ✅ |
| Integration | 20 | Critical: 8, High: 8, Medium: 4 | Documented ✅ |
| Accessibility | 20 | Critical: 10, High: 7, Medium: 3 | Documented ✅ |
| **Performance** | **15** | **Critical: 7, High: 5, Medium: 3** | **Documented ✅** |
| Edge Cases | 25 | Critical: 5, High: 10, Medium: 8, Low: 2 | Documented ✅ |
| Cross-browser | 20 | Critical: 8, High: 8, Medium: 4 | Documented ✅ |
| **Grand Total** | **130** | **Critical: 50, High: 48, Medium: 28, Low: 4** | **Ready for Execution** |

### 4.2 Performance Test Scenarios Breakdown

| Category | Scenarios | Focus Area |
|----------|-----------|------------|
| State Update Performance | P-001 to P-005 | Badge rendering speed, UI responsiveness |
| localStorage Performance | P-006 to P-009 | Storage operations, quota management |
| UI Responsiveness | P-010 to P-012 | TTI, toast timing, animation smoothness |
| Memory Management | P-013 to P-015 | Memory leaks, cleanup verification |

---

## 5. Test Data Requirements

### 5.1 Product Test Data
- **Standard Products**: 10 products with complete data (names, prices, images, SKUs)
- **Edge Case Products**: 5 products (long names, special characters, min/max prices, Unicode)
- **Total**: 15 unique products

### 5.2 Cart State Variations
- Empty cart (0 items)
- Single item cart (1 item)
- Multiple items cart (5 items, 10 items, 20 items)
- Large cart (50 items) - for performance testing
- Maximum cart (100+ items, 120 items) - for "99+" badge and performance testing
- High quantity single item (150 quantity) - for "99+" badge testing

### 5.3 localStorage Scenarios
- Valid JSON cart data
- Corrupted JSON (syntax errors, wrong data types)
- Empty localStorage (no cart key)
- localStorage near quota (~1MB cart data)
- localStorage with other app data

### 5.4 Performance Test Data
**Detailed in**: [docs/testing/PerformanceTestData.md](docs/testing/PerformanceTestData.md)

- P-001 to P-005: Carts with 0, 5, 50, 120 items
- P-006 to P-009: Carts with 1, 20, 150, 1000 items
- P-010 to P-015: Various cart states for UI and memory tests

---

## 6. Test Coverage Matrix

### 6.1 Requirements to Performance Test Mapping

| Requirement ID | Description | Performance Test IDs | Coverage |
|----------------|-------------|---------------------|----------|
| **NFR-1** | Badge updates <100ms | TS-CART-P-001, P-002, P-003 | 100% ✅ |
| **NFR-2** | localStorage reliable | TS-CART-P-006, P-007, P-008, P-009 | 100% ✅ |
| **NFR-3** | WCAG 2.1 Level AA | (Accessibility tests) | 100% ✅ |
| **NFR-4** | Responsive design | (Responsive tests) | 100% ✅ |
| **NFR-5** | Browser compatibility | (Cross-browser tests) | 100% ✅ |
| FR-1 | Display cart icon | TS-CART-P-010 (TTI) | 100% ✅ |
| FR-2 | Show badge count | TS-CART-P-001, P-002, P-003, P-012 | 100% ✅ |
| FR-3 | Update on add/remove | TS-CART-P-001, P-002, P-003, P-004, P-005 | 100% ✅ |
| FR-5 | Persist cart state | TS-CART-P-006, P-007, P-008, P-009 | 100% ✅ |
| FR-6 | Toast notifications | TS-CART-P-011, P-015 | 100% ✅ |

### 6.2 Overall Test Coverage

| Category | Scenarios | Requirements Covered | Coverage % |
|----------|-----------|---------------------|------------|
| Functional Requirements (FR-1 to FR-10) | 30 | 10/10 | 100% ✅ |
| Non-Functional Requirements (NFR-1 to NFR-5) | 60 | 5/5 | 100% ✅ |
| Edge Cases & Error Handling | 25 | All edge cases | 100% ✅ |
| Cross-cutting Concerns | 15 | Accessibility, Performance, Compatibility | 100% ✅ |
| **Total** | **130** | **All Requirements** | **100% ✅** |

---

## 7. Test Execution Strategy

### 7.1 Phase 4: Performance Testing Execution Plan

**Timeline**: Week 2, Days 3-4 (2 days)

**Day 1 - Morning (3 hours)**:
1. Environment setup and verification
2. Load performance test data scripts
3. Execute P-001 to P-005 (State Update Performance)
4. Document results in test log

**Day 1 - Afternoon (4 hours)**:
5. Execute P-006 to P-009 (localStorage Performance)
6. Measure and record timing metrics
7. Verify localStorage quota handling
8. Document results

**Day 2 - Morning (3 hours)**:
9. Execute P-010 to P-012 (UI Responsiveness)
10. Run Lighthouse audits
11. Measure FPS and animation performance
12. Document results

**Day 2 - Afternoon (4 hours)**:
13. Execute P-013 to P-015 (Memory Management)
14. Take heap snapshots and analyze
15. Verify cleanup and no memory leaks
16. Compile performance test summary report

### 7.2 Test Execution Best Practices

1. **Use Production Build**: Run tests on optimized production build
   ```bash
   npm run build
   npm run preview
   ```

2. **Clear Cache**: Hard reload between tests (Ctrl+Shift+R)

3. **CPU Throttling**: Test with 4x CPU slowdown for realistic results

4. **Multiple Runs**: Run each test 3-5 times, use average

5. **Consistent Environment**: Close unnecessary browser tabs/apps

6. **Document Everything**: Screenshot DevTools metrics, record exact values

### 7.3 Defect Reporting

**Performance Defect Severity**:
- **Critical**: Performance metric fails by >100% (e.g., >200ms when target is <100ms)
- **High**: Performance metric in warning zone consistently (e.g., 100-150ms when target is <100ms)
- **Medium**: Performance metric occasionally exceeds target but averages within threshold
- **Low**: Minor performance inconsistencies with no user impact

---

## 8. Test Deliverables

### 8.1 Documentation Deliverables
- ✅ Test scenarios documentation (6 files, 130 scenarios) - **Completed**
- ✅ Performance test data specifications - **Completed**
- ✅ Master test plan (this document) - **In Progress**
- ⏳ Test execution logs - **Pending**
- ⏳ Test summary report - **Pending**
- ⏳ Performance benchmark report - **Pending**
- ⏳ Defect reports (if any) - **Pending**
- ⏳ Test coverage report - **Pending**

### 8.2 Performance Test Deliverables
- ⏳ Performance test execution log with timing metrics
- ⏳ Chrome DevTools Performance screenshots (for each test)
- ⏳ Heap snapshot comparisons (for memory tests)
- ⏳ Lighthouse audit reports
- ⏳ Performance benchmark summary table
- ⏳ Performance issues log (if any failures)

---

## 9. Risk Assessment

### 9.1 Performance Testing Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Inconsistent timing results across devices | High | Medium | Test on multiple devices, use averages, document environment |
| localStorage quota varies by browser | Medium | High | Test on all target browsers, handle quota errors gracefully |
| Memory profiling overhead affects results | Low | Medium | Use production build, close other apps, take multiple measurements |
| Performance degrades with 100+ items | Medium | High | Prioritize P-003, P-004, P-008 tests, optimize if needed |
| Toast animations not smooth | Low | Medium | Test with FPS meter, verify CSS transitions optimized |

### 9.2 General Testing Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Browser compatibility issues | Medium | High | Early cross-browser testing, prioritize latest stable versions |
| Accessibility non-compliance | Low | High | Use axe DevTools, screen reader testing, WCAG checklist |
| localStorage browser differences | Medium | High | Test localStorage thoroughly on all browsers, handle errors |
| Test data setup errors | Low | Medium | Validate test data scripts, provide clear setup instructions |

---

## 10. Approval and Sign-off

### 10.1 Test Plan Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Test Manager | _______________ | _______________ | _______ |
| QA Lead | _______________ | _______________ | _______ |
| Development Lead | _______________ | _______________ | _______ |
| Project Manager | _______________ | _______________ | _______ |

### 10.2 Test Execution Sign-off

**To be completed after Phase 4 execution**

- [ ] All 15 performance tests executed
- [ ] Performance benchmarks met (NFR-1, NFR-2)
- [ ] Test results documented
- [ ] Defects logged (if any)
- [ ] Performance report generated

**Performance Test Sign-off**:
- QA Engineer: _______________ Date: _______
- Performance Lead: _______________ Date: _______

---

## 11. References

### 11.1 Test Documentation
- [Cart Feature Test Analysis](docs/testing/cart-feature-test-analysis.md)
- [Functional Test Scenarios](docs/testing/phase1-scenarios/functional-test-scenarios.md)
- [Integration Test Scenarios](docs/testing/phase1-scenarios/integration-test-scenarios.md)
- [Accessibility Test Scenarios](docs/testing/phase1-scenarios/accessibility-test-scenarios.md)
- **[Performance Test Scenarios](docs/testing/phase1-scenarios/performance-test-scenarios.md)**
- [Edge Case Test Scenarios](docs/testing/phase1-scenarios/edge-case-negative-scenarios.md)
- [Cross-browser Test Scenarios](docs/testing/phase1-scenarios/cross-browser-responsive-scenarios.md)
- [Test Data Requirements](docs/testing/test-data-requirements.md)
- **[Performance Test Data](docs/testing/PerformanceTestData.md)**

### 11.2 Requirement Documents
- [Cart Icon Feature Requirements](docs/specifications/cart-icon-feature-requirements.md)
- [High-Level Design](docs/knowledge-repository/high-level-design.md)
- [Technical Design Document](docs/knowledge-repository/technical-design-document.md)
- [GitHub Issue Draft](docs/github-issue-draft.md)

### 11.3 Implementation Reference
- [Workshop 1 - Phase 3: Agentic Implementation](Workshop-AI-SDLC/Exercise 1/3. Agentic Implementation.md)

---

## Appendix A: Performance Test Quick Reference

### Quick Command Cheat Sheet

```javascript
// Load test data
loadPerformanceTestData('p001');  // Empty cart
loadPerformanceTestData('p002');  // 5 items
loadPerformanceTestData('p003');  // 50 items
loadPerformanceTestData('p004');  // 120 items
location.reload();

// Verify loaded data
const cart = JSON.parse(localStorage.getItem('octocat-cart'));
console.log(`Cart items: ${cart.items.length}`);

// Clear test data
localStorage.removeItem('octocat-cart');
location.reload();

// Measure timing
const start = performance.now();
// ... operation ...
const end = performance.now();
console.log(`Time: ${(end - start).toFixed(2)}ms`);

// Check localStorage size
const data = localStorage.getItem('octocat-cart');
const size = new Blob([data]).size;
console.log(`Size: ${(size / 1024).toFixed(2)} KB`);
```

### Performance Benchmarks Quick Reference

| Metric | Target | Test IDs |
|--------|--------|----------|
| Badge Update | <100ms | P-001, P-002, P-003 |
| localStorage Save | <50ms | P-006 |
| localStorage Load | <100ms | P-007 |
| FPS | 55-60 | P-012 |
| Memory Growth | <5MB/100ops | P-013 |
| TTI | <100ms | P-010 |
| Toast Display | <200ms | P-011 |

---

**Version History**:
- v1.0 - January 28, 2026 - Initial test plan with performance testing focus
- Document Status: Draft
- Next Review: After Phase 4 execution (Week 2, Day 4)
