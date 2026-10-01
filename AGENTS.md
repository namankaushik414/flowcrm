# FlowCRM Engineering Rules

## 1. Product

FlowCRM is an AI-powered sales operating system for real-estate organizations.

Core workflow:

Lead
→ AI understanding
→ Sales action
→ Calling
→ Conversation intelligence
→ CRM update
→ Next-best action
→ Follow-up
→ Property matching
→ Site visit / virtual tour
→ Booking

The product is designed for sales teams that handle large numbers of leads,
phone calls, WhatsApp conversations, follow-ups and property inventory.

---

## 2. Technology

Primary stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL
- Zod
- Docker
- GitHub Actions

Future integrations may include:

- VICIdial
- VoIP carriers
- WhatsApp
- Email
- AI services
- Property portals
- External APIs

---

## 3. Engineering Principles

1. Read this file before modifying the project.
2. Read relevant `/docs` files before implementing a feature.
3. Do not modify unrelated modules.
4. Do not delete existing functionality without explicit approval.
5. Do not introduce dependencies without explaining why they are required.
6. Use strict TypeScript.
7. Validate external input with Zod.
8. Keep business logic out of UI components.
9. Keep database access in appropriate server-side modules.
10. Never expose secrets to the client.
11. Prefer small, maintainable modules.
12. Avoid unnecessary abstraction.
13. Do not duplicate business logic.
14. Follow existing project conventions once established.

---

## 4. Multi-Tenancy

FlowCRM is a multi-tenant SaaS platform.

Organizations must be logically isolated.

A user belonging to Organization A must never be able to access
Organization B data.

Tenant isolation must be enforced server-side.

Never rely only on frontend filtering.

Organization membership must be verified for protected operations.

Never trust organization IDs supplied directly by the client.

---

## 5. Authentication & Authorization

Every protected server operation must verify:

1. Authentication
2. Organization membership
3. Required permission

Roles may include:

- Organization Admin
- Manager
- Sales Agent
- Other custom roles

Permissions should be granular enough to control access to:

- Leads
- Properties
- Calls
- Activities
- Site visits
- Deals
- Reports
- Users
- Organization settings

---

## 6. Database

PostgreSQL is the primary database.

Prisma is the ORM.

Database changes must use migrations.

Never manually modify production database structure.

Avoid destructive migrations unless explicitly approved.

Preserve:

- Foreign-key relationships
- Referential integrity
- Tenant isolation
- Auditability

Important domain entities should have clear ownership and organization relationships.

---

## 7. API

API operations must:

- Validate input
- Authenticate requests
- Authorize access
- Enforce tenant isolation
- Handle errors safely
- Return predictable responses

Use Zod for request validation.

Never trust client-provided:

- user IDs
- organization IDs
- permissions
- ownership information

---

## 8. AI

AI-generated information is derived data.

AI must not silently overwrite critical customer information.

AI features should clearly distinguish:

- User-provided data
- System-generated data
- AI-generated data

Important AI recommendations should retain traceability where practical.

AI failure must not break core CRM functionality.

The CRM must remain usable if an AI provider is unavailable.

---

## 9. Calling & VICIdial

Calling must remain modular.

FlowCRM may integrate with:

- VICIdial
- VoIP carriers
- Other telephony providers

Do not tightly couple the CRM domain to one telephony provider.

Call records should exist independently from the telephony implementation.

The system should be able to store:

- Call ID
- Lead
- Agent
- Direction
- Start/end time
- Duration
- Status
- Disposition
- Recording reference
- Campaign
- Provider metadata

---

## 10. Real Estate Domain

Core real-estate concepts include:

- Projects
- Properties
- Units
- Property requirements
- Property matching
- Site visits
- Virtual tours
- Deals
- Bookings

Property matching should initially use deterministic rules.

AI-based matching can be layered on top later.

---

## 11. Security

Never commit:

- API keys
- Passwords
- Database credentials
- Tokens
- Private keys
- Production secrets

Use environment variables.

Never expose server secrets to browser code.

Sensitive operations must be authorized server-side.

---

## 12. Git Workflow

`main` = stable / production

`develop` = active development

Feature branches:

```text
feature/<feature-name>