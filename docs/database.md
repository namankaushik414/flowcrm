# FlowCRM V1 Database Architecture

## 1. Database Strategy

Primary database:

- PostgreSQL

ORM:

- Prisma

Database goals:

- Multi-tenant isolation
- Strong relationships
- Referential integrity
- Efficient lead queries
- Auditability
- AI-ready data model
- Telephony integration
- Real-estate inventory support
- Future SaaS scalability

The database should remain relational and normalized for V1.

Avoid storing important business relationships inside JSON when a proper relational model is more appropriate.

---

# 2. Core Entity Relationship

High-level relationship:

```text
Organization
│
├── Users / Memberships
│
├── Leads
│   ├── Activities
│   ├── Tasks
│   ├── Calls
│   ├── AI Insights
│   ├── Property Requirements
│   ├── Property Recommendations
│   ├── Site Visits
│   └── Deals
│
├── Projects
│   └── Properties / Units
│
├── Integrations
│
├── Notifications
│
└── Audit Logs