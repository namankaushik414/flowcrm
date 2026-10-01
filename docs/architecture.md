# FlowCRM V1 Architecture

## 1. Architecture Goal

FlowCRM will use a modular monolith architecture for V1.

The system should be:

- Simple to develop
- Easy to maintain
- Secure
- Multi-tenant
- AI-ready
- Integration-ready
- Scalable without premature microservices

V1 should NOT use a microservices architecture.

The application should be structured into clear domain modules so individual modules can later be extracted if scale requires it.

---

# 2. High-Level Architecture

```text
                         FLOWCRM
                            |
                     Web Application
                            |
                         Next.js
                            |
             +--------------+--------------+
             |                             |
        Presentation                 Server Layer
             |                             |
        React / UI                  Business Logic
             |                             |
             +--------------+--------------+
                            |
                       Data Access
                            |
                         Prisma
                            |
                       PostgreSQL

External Systems:

Next.js
   |
   +---- AI Provider
   |
   +---- VICIdial
   |
   +---- VoIP / Telephony
   |
   +---- WhatsApp
   |
   +---- Email
   |
   +---- File / Recording Storage