---

description: "Implementation tasks for Cart Icon with Item Count Badge feature"

---

# Tasks: Cart Icon with Item Count Badge

**Input**: Design documents from `/specs/001-cart-icon-implementation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: TDD approach required per constitution - tests written first, fail before implementation

**Organization**: Tasks grouped by milestones to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `supply-chain-system/api/src/`
- **Frontend**: `supply-chain-system/frontend/src/`
- **Database**: `supply-chain-system/api/database/migrations/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency setup

- [ ] T001 Install react-hot-toast dependency in frontend/package.json
- [ ] T002 Verify existing CartContext and CartIcon implementations
- [ ] T003 [P] Create api/ directory structure for cart functionality

---


## Phase 2: Backend Cart API (Milestone 1 - Priority: P3)

**Purpose**: Database schema and API foundation for cart persistence

**⚠️ CRITICAL**: Backend must be complete before frontend integration

### Database & Models

- [ ] T004 Create cart_sessions table migration in api/database/migrations/003_add_cart_tables.sql
- [ ] T005 Create cart_items table migration in api/database/migrations/003_add_cart_tables.sql
- [ ] T006 [P] Implement CartSession model in api/src/models/cartSession.ts
- [ ] T007 [P] Implement CartItem model in api/src/models/cartItem.ts

### Repository Layer

- [ ] T008 Implement CartRepository class in api/src/repositories/cartRepository.ts
- [ ] T009 Add session CRUD methods to CartRepository
- [ ] T010 Add item CRUD methods to CartRepository

### API Routes

- [ ] T011 Create cart routes in api/src/routes/cart.ts
- [ ] T012 Implement POST /api/cart/items endpoint
- [ ] T013 Implement GET /api/cart endpoint
- [ ] T014 Implement DELETE /api/cart endpoint
- [ ] T015 Register cart routes in api/src/index.ts

### Backend Tests

- [ ] T016 [P] Unit tests for CartRepository in api/src/repositories/cartRepository.test.ts
- [ ] T017 [P] Integration tests for cart API endpoints
- [ ] T018 Run backend tests and verify >80% coverage

**Checkpoint**: Backend API ready - can handle cart CRUD operations independently

---

## Phase 3: Frontend-Backend Integration (Milestone 2 - Priority: P2)

**Purpose**: Connect frontend cart functionality with backend persistence

### API Client

- [ ] T019 Create cart API client in frontend/src/api/cartApi.ts
- [ ] T020 Implement addCartItem API function
- [ ] T021 Implement getCart API function
- [ ] T022 Implement clearCart API function

### Context Updates

- [ ] T023 Update CartContext localStorage key to 'octocat-supply-chain-cart' in frontend/src/context/CartContext.tsx
- [ ] T024 Add API sync logic to CartContext addItem method
- [ ] T025 Add API sync logic to CartContext removeItem method
- [ ] T026 Add API sync logic to CartContext clearCart method
- [ ] T027 Add error handling for API failures in CartContext

### Toast Notifications

- [ ] T028 Import Toaster component in frontend/src/main.tsx
- [ ] T029 Update CartIcon to show success toast on add in frontend/src/components/cart/CartIcon.tsx
- [ ] T030 Add toast notifications to CartContext methods

### Type Updates

- [ ] T031 Add API response types to frontend/src/types/cart.ts
- [ ] T032 Add error handling types to frontend/src/types/cart.ts

**Checkpoint**: Frontend-backend sync working - cart persists across sessions

---

## Phase 4: Component Enhancement & Testing (Milestone 3 - Priority: P1)

**Purpose**: Polish components, add tests, ensure accessibility compliance

### Component Tests

- [ ] T033 Create CartIcon test file in frontend/tests/components/cart/CartIcon.test.tsx
- [ ] T034 Write badge display tests for CartIcon
- [ ] T035 Write accessibility tests for CartIcon
- [ ] T036 Write click handler tests for CartIcon

### Context Tests

- [ ] T037 Write localStorage persistence tests for CartContext
- [ ] T038 Write API sync tests for CartContext
- [ ] T039 Write error handling tests for CartContext

### Accessibility Audit

- [ ] T040 Verify WCAG 2.1 AA compliance for CartIcon
- [ ] T041 Test keyboard navigation for cart icon
- [ ] T042 Test screen reader announcements for badge updates

### Performance Optimization

- [ ] T043 Optimize CartIcon re-renders with React.memo
- [ ] T044 Add debouncing to API calls in CartContext
- [ ] T045 Verify <2s cart interaction performance

**Checkpoint**: Components fully tested and accessible - ready for integration testing

---

## Phase 5: Integration Testing & Polish (Milestone 4 - Priority: P2)

**Purpose**: End-to-end validation and production readiness

### E2E Tests

- [ ] T046 Create E2E test for add to cart workflow
- [ ] T047 Create E2E test for cart persistence across refresh
- [ ] T048 Create E2E test for cart badge updates
- [ ] T049 Create E2E test for error scenarios

### Cross-Browser Testing

- [ ] T050 Test cart functionality in Chrome
- [ ] T051 Test cart functionality in Firefox
- [ ] T052 Test cart functionality in Safari
- [ ] T053 Test cart functionality in Edge

### Performance Benchmarking

- [ ] T054 Benchmark cart icon render time (<100ms)
- [ ] T055 Benchmark add to cart operation (<500ms)
- [ ] T056 Benchmark API response times (<200ms)

### Documentation & Cleanup

- [ ] T057 Update API documentation in contracts/cart-api.yaml
- [ ] T058 Update quickstart guide with new functionality
- [ ] T059 Code cleanup and remove console.logs
- [ ] T060 Final accessibility audit and compliance check

**Checkpoint**: All acceptance scenarios pass - production ready

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Backend API (Phase 2)**: Depends on Setup - provides foundation for all cart operations
- **Frontend Integration (Phase 3)**: Depends on Backend API completion
- **Component Testing (Phase 4)**: Depends on Frontend Integration
- **Integration Testing (Phase 5)**: Depends on all previous phases

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- Database migration and model creation can run in parallel
- API client functions can be implemented in parallel
- Component tests can run in parallel
- E2E tests can run in parallel across different browsers

### Within Each Phase

- Tests should be written first (TDD approach)
- Database schema before models
- Models before repository
- Repository before routes
- API client before context updates
- Context updates before component integration

---

## Parallel Example: Backend API Development

```bash
# Database & Models (can run in parallel):
Task: "Create cart_sessions table migration"
Task: "Create cart_items table migration"
Task: "Implement CartSession model"
Task: "Implement CartItem model"

# Repository & Routes (sequential dependencies):
Task: "Implement CartRepository class" → "Add session CRUD methods" → "Add item CRUD methods"
Task: "Create cart routes" → "Implement POST endpoint" → "Implement GET endpoint" → "Implement DELETE endpoint"
```

---

## Implementation Strategy

### MVP First (Backend + Basic Frontend)

1. Complete Phase 1: Setup
2. Complete Phase 2: Backend API
3. Complete Phase 3: Frontend-Backend Integration
4. **STOP and VALIDATE**: Test cart persistence and API sync
5. Deploy/demo if ready

### Full Feature Delivery

1. Complete all phases sequentially
2. Each milestone adds testable functionality
3. End with comprehensive E2E validation

### Team Strategy

With multiple developers:
1. One developer: Backend API (Phase 2)
2. One developer: Frontend Integration (Phase 3)
3. One developer: Testing & Polish (Phases 4-5)

---

## Definition of Done

### Code Quality
- ✅ All TypeScript strict mode checks pass
- ✅ ESLint passes with zero errors
- ✅ Code follows existing project patterns
- ✅ No console.logs in production code

### Testing
- ✅ Unit test coverage >80% for new code
- ✅ All acceptance scenarios from spec.md pass
- ✅ E2E tests pass on all supported browsers
- ✅ API contract tests pass

### Functionality
- ✅ Cart icon displays on all pages
- ✅ Badge shows correct item count (99+ overflow)
- ✅ Add to cart shows success toast
- ✅ Cart persists in localStorage with correct key
- ✅ Backend API handles cart operations
- ✅ Graceful degradation when API unavailable

### Performance
- ✅ Cart icon interaction <2 seconds
- ✅ API responses <500ms
- ✅ No memory leaks or performance regressions

### Accessibility
- ✅ WCAG 2.1 AA compliance verified
- ✅ Keyboard navigation works
- ✅ Screen reader support confirmed
- ✅ Color contrast meets requirements

### Documentation
- ✅ API documentation updated
- ✅ Quickstart guide validated
- ✅ Code comments added for complex logic

### Integration
- ✅ Works with existing authentication
- ✅ Compatible with existing UI theme
- ✅ No breaking changes to existing features

**Final Verification**: Run through all acceptance scenarios from spec.md manually to confirm feature works end-to-end.
