# FlowCRM V1 API Architecture

## 1. API Principles

FlowCRM APIs must be:

- Secure
- Tenant-aware
- Consistent
- Validated
- Predictable
- Versionable
- Easy for AI-assisted development

Every protected API request must follow:

Authentication
→ Authorization
→ Tenant Isolation
→ Input Validation
→ Business Logic
→ Database
→ Response

---

# 2. API Technology

V1 uses the Next.js server layer.

Possible mechanisms:

- Route Handlers
- Server Actions for internal UI operations where appropriate
- Server-side service functions

REST-style Route Handlers should be preferred for external integrations.

Example:

```text
/api/v1/leads
/api/v1/projects
/api/v1/properties
/api/v1/calls
/api/v1/site-visits