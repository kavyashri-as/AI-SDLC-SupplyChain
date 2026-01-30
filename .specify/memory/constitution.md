# OctoCAT Supply Chain Management System Constitution

## Core Principles

### I. Full-Stack Feature Development
Every feature must be implemented across frontend, backend, and database layers. No partial implementations allowed. Components must integrate seamlessly with existing architecture following the established file organization patterns.

### II. Accessibility-First Design
WCAG 2.1 Level AA compliance is mandatory for all user interfaces. All components must support keyboard navigation, screen readers, and dark mode. Color contrast minimum 4.5:1, focus indicators required, ARIA labels used appropriately.

### III. Test-First Development (NON-NEGOTIABLE)
TDD mandatory: Tests written first, ensure they fail, then implement. Red-Green-Refactor cycle strictly enforced. Unit tests >80% coverage required. Integration tests for API endpoints and component interactions.

### IV. Design System Consistency
All UI components must follow the established design system: Tailwind CSS utilities, defined color palette, typography scale, spacing system, and icon sizing. Cart-specific components must adhere to badge design, positioning, and hover states.

### V. State Management Standards
Frontend state managed through React Context API with localStorage persistence. Backend state through services and repositories with proper error handling. Session-based cart management for guest users.

## Technology Constraints

**Frontend Stack:**
- React 18+, TypeScript, Vite
- Tailwind CSS for styling (no custom CSS)
- Heroicons for UI icons
- react-hot-toast for notifications
- React Context API for state management

**Backend Stack:**
- Express.js, TypeScript
- SQLite database with migrations
- RESTful API design
- Session management for cart persistence

**Testing & Quality:**
- Vitest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests
- ESLint for code quality
- TypeScript strict mode

**Development Tools:**
- Docker for containerization
- Make for build commands
- GitHub Copilot for AI-assisted development

## Development Workflow

### Phase 1: Knowledge Ingestion & Requirement Enrichment
- Aggregate existing documentation (TDD, HLD, requirements)
- Use AI to identify missing requirements and enrich specifications
- Create comprehensive GitHub Issues with acceptance criteria

### Phase 2: Technical Planning & Scaffolding
- Use Spec Kit to analyze issues and create execution plans
- Define design guardrails in .github/instructions.md
- Scaffold components following architectural patterns
- Create implementation milestones with dependencies

### Phase 3: Agentic Implementation
- Implement features using TDD approach
- Full-stack development: backend API → frontend components → integration
- Continuous testing and validation
- Code review and accessibility audit

### Quality Gates
- All PRs must pass unit tests (>80% coverage)
- Accessibility audit required before merge
- Design system compliance verified
- Performance benchmarks met
- Security review for new features

## Governance

This constitution supersedes all other development practices and guidelines. All code changes must verify compliance with these core principles. Amendments require team consensus and updated implementation plans.

Use .github/instructions.md for detailed runtime development guidance and design guardrails. The constitution provides the "why" while instructions provide the "how".

**Version**: 1.0 | **Ratified**: January 30, 2026 | **Last Amended**: January 30, 2026
