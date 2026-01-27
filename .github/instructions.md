# Development Instructions & Design Guardrails

## Project: OctoCAT Supply Chain Management System

This document provides guidelines and constraints for AI-assisted development to ensure consistency with established architectural patterns.

---

## 🏗️ **Architecture Patterns**

### Component Structure
- Use functional components with React Hooks
- Follow component composition pattern
- Keep components under 200 lines of code
- Separate business logic from presentation

### File Organization
```
frontend/src/
├── components/
│   ├── cart/              # Cart-specific components
│   │   ├── CartIcon.tsx
│   │   ├── CartBadge.tsx
│   │   └── ...
│   ├── common/            # Reusable components
│   └── layout/            # Layout components (Header, Footer)
├── context/               # React Context providers
│   └── CartContext.tsx
├── hooks/                 # Custom React hooks
├── api/                   # API client code
└── utils/                 # Utility functions
```

---

## 🎨 **Design System**

### Color Palette
```css
/* Primary Colors */
--primary: #76B852;
--primary-hover: #5a9640;
--primary-light: #a8d088;
--primary-dark: #4a7d33;

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--cart-badge: #ef4444; /* Red for cart badge */
```

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Base Size**: 16px
- **Scale**: 0.75rem, 0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem
- **Line Height**: 1.5 (body), 1.2 (headings)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px
- Use Tailwind spacing utilities: `p-4`, `m-6`, `gap-4`

### Border Radius
- **Small**: 4px (`rounded`)
- **Medium**: 8px (`rounded-lg`)
- **Large**: 12px (`rounded-xl`)
- **Full**: 9999px (`rounded-full`)

### Icon Sizing
- **Small**: 16px (w-4 h-4)
- **Medium**: 20px (w-5 h-5)
- **Large**: 24px (w-6 h-6)
- **Cart Icon**: 24px (w-6 h-6)

---

### Cart Icon Design
- **Position**: Top-right of header
- **Icon**: ShoppingCartIcon from Heroicons (outline style)
- **Size**: 24px (w-6 h-6)
- **Badge**: Circular, red background (#ef4444), white text
- **Badge Position**: Absolute, top-right of icon (-top-1 -right-1)
- **Badge Size**: min-w-5 h-5, text-xs
- **Hover**: Opacity 80%

### Toast Notifications
- **Library**: react-hot-toast
- **Position**: top-right
- **Duration**: 3 seconds
- **Success Style**: Green background, white text
- **Message Format**: "Added [Product Name] to cart"

---

## ♿ **Accessibility Requirements**

### WCAG 2.1 Level AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements must be keyboard accessible (Tab, Enter, Space)
- **Focus Indicators**: Visible focus states (2px solid ring)
- **ARIA Labels**: Use semantic HTML first, ARIA when necessary
- **Screen Reader**: Announce cart updates

### Cart Icon Accessibility
```typescript
<button
  onClick={onClick}
  aria-label={`Shopping cart with ${itemCount} items`}
  className="relative focus:outline-none focus:ring-2 focus:ring-primary"
>
  <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
  {itemCount > 0 && (
    <span 
      className="badge"
      aria-label={`${itemCount} items in cart`}
    >
      {itemCount}
    </span>
  )}
</button>
```

---

## 📱 **Responsive Design**

### Breakpoints (Tailwind)
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
```

### Cart Icon Responsiveness
- **Mobile**: Cart icon visible, same size
- **Tablet**: Cart icon with text label option
- **Desktop**: Cart icon in header navigation

---

## 🎭 **Dark Mode**

### Implementation
- Use Tailwind `dark:` prefix for all dark mode styles
- Cart icon must be visible in both modes
- Badge must maintain 4.5:1 contrast in both modes

---

## ✅ **Code Review Checklist**

Before submitting code, ensure:
- [ ] TypeScript types properly defined
- [ ] Component follows established structure
- [ ] Accessibility requirements met (ARIA, keyboard nav, focus states)
- [ ] Responsive design implemented
- [ ] Dark mode supported
- [ ] Unit tests written and passing (>80% coverage)
- [ ] No console errors or warnings
- [ ] Performance optimized (memo, useCallback)
- [ ] Error handling implemented
- [ ] JSDoc comments added
- [ ] Follows naming conventions
- [ ] Cart persists to localStorage
- [ ] Toast notifications work correctly

---

## 🚫 **Anti-Patterns to Avoid**

### ❌ Don't Use
- Inline styles (use Tailwind classes)
- `any` type without justification
- Direct DOM manipulation
- Mutating state directly
- Prop drilling (use Context)
- Magic numbers (use named constants)

### ✅ Do Use
- Tailwind CSS utility classes
- Proper TypeScript types
- React hooks (useState, useContext, useCallback)
- Context API for cart state
- Named constants for storage keys
- Immutable state updates

---

## 🔄 **Git Workflow**

### Branch Naming
- Feature: `feature/cart-icon-implementation`
- Bug fix: `fix/cart-icon-badge-position`
- Refactor: `refactor/cart-context-structure`

### Commit Messages
Follow Conventional Commits:
```
feat: add CartIcon component with item count badge
feat: implement cart state persistence in localStorage
feat: add toast notifications for cart actions
test: add unit tests for CartIcon component
docs: update cart component documentation
```

---

## 📚 **Additional Resources**

- [React Context API](https://react.dev/reference/react/createContext)
- [Heroicons](https://heroicons.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Maintainer**: Workshop Team
