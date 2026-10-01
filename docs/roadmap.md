# FlowCRM V1 Development Roadmap

## 1. Roadmap Objective

This roadmap defines the implementation order for FlowCRM V1.

Development must proceed in controlled vertical slices.

Do not build all features simultaneously.

Every milestone should produce a working, testable increment.

Core workflow:

Lead
→ Understand
→ Contact
→ Qualify
→ Match
→ Follow Up
→ Site Visit
→ Deal
→ Booking

---

# 2. Development Principles

1. Build the foundation before advanced features.
2. Database design must precede feature implementation.
3. Security must be implemented with the feature, not afterward.
4. Every feature must respect tenant isolation.
5. Every major feature must have validation and error handling.
6. AI should be introduced after reliable CRM data exists.
7. Telephony should be implemented through an adapter.
8. Do not build unnecessary infrastructure.
9. Do not introduce microservices in V1.
10. Keep commits small and meaningful.
11. Test each milestone before starting the next.
12. Do not allow AI coding agents to make uncontrolled architectural changes.

---

# 3. Development Environment

Required:

- Node.js
- npm
- Git
- VS Code / Antigravity
- PostgreSQL
- Docker where useful
- GitHub

Repository:

```text
FlowCRM