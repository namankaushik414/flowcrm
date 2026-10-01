# FlowCRM V1 Permissions & RBAC

## 1. Authorization Principle

FlowCRM uses Role-Based Access Control (RBAC).

Authorization must always be enforced server-side.

Frontend visibility is not security.

Every protected operation must verify:

Authentication
→ Organization Membership
→ Role
→ Permission
→ Resource Access
→ Tenant Isolation

---

## 2. Core Roles

V1 supports three primary roles:

### Organization Admin

Responsible for organization-level administration.

Can:

- Manage organization settings
- Manage users
- Manage roles and permissions
- View all leads
- Create/update/delete leads
- Assign/reassign leads
- Manage properties
- Manage projects
- View calls
- View reports
- Configure integrations
- View audit logs

### Sales Manager

Responsible for team sales operations.

Can:

- View team leads
- Create/update leads
- Assign/reassign team leads
- View team activities
- Manage follow-ups
- View calls
- View AI insights
- View property inventory
- Manage site visits
- View deals
- View team dashboards
- View sales reports

Cannot:

- Manage organization settings
- Manage roles
- Manage billing
- Modify security configuration
- Access unrelated organizations

### Sales Agent

Responsible for assigned sales activity.

Can:

- View assigned leads
- Update assigned leads
- Create activities
- Create follow-ups
- Make calls
- View call history for accessible leads
- View properties
- Create property recommendations
- Schedule site visits
- Update assigned opportunities
- View personal dashboard
- View AI recommendations for accessible leads

Cannot:

- Manage users
- Manage roles
- Access organization settings
- View unrestricted team data
- View unrelated organizations
- Change security settings

---

# 3. Permission Naming Convention

Permissions use:

```text
resource.action