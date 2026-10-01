# FlowCRM V1 Product Requirements

## 1. Product Overview

FlowCRM is an AI-powered sales operating system for real-estate organizations.

It combines:

- Lead management
- Sales pipeline
- Follow-ups
- Real-estate inventory
- Calling
- VICIdial / VoIP integration
- AI conversation intelligence
- AI sales recommendations
- Lead recovery
- Property matching
- Site visits
- Sales analytics

The central objective is:

> Help sales teams take the right next action for every customer while reducing manual CRM work.

---

# 2. Core Sales Workflow

The primary FlowCRM workflow is:

Lead
→ Understand
→ Contact
→ Qualify
→ Recommend
→ Follow Up
→ Site Visit / Virtual Tour
→ Negotiation
→ Booking

Every major feature should support this workflow.

---

# 3. Target Customers

Initial target customers:

- Real-estate developers
- Real-estate brokers
- Real-estate sales agencies
- Inside-sales teams
- Call-heavy real-estate organizations
- Organizations selling Indian properties to NRI / international customers

The initial ideal customer has:

- Multiple sales agents
- Large lead volume
- Significant phone activity
- Multiple property projects
- Frequent follow-ups
- Need for manager visibility

---

# 4. User Roles

V1 should support:

## Organization Admin

Can:

- Manage organization
- Manage users
- Manage roles
- Configure integrations
- View all organization data
- Configure settings

## Sales Manager

Can:

- View team leads
- Assign leads
- View team activities
- Monitor pipeline
- View dashboards
- Review calls
- Monitor follow-ups
- View AI insights

## Sales Agent

Can:

- View assigned leads
- Update leads
- Make calls
- Add activities
- Create follow-ups
- View properties
- Recommend properties
- Schedule site visits
- Update deal progress

---

# 5. Authentication

V1 requirements:

- Login
- Logout
- Session management
- Protected routes
- User profile
- Organization membership
- Role-based access

All protected server operations must verify authentication and authorization.

---

# 6. Organization / Multi-Tenancy

FlowCRM is a multi-tenant SaaS application.

Every organization owns its own:

- Users
- Leads
- Activities
- Calls
- Properties
- Projects
- Site visits
- Deals
- Reports

Organization data must be isolated.

A user must never access another organization's data.

Tenant isolation must be enforced server-side.

---

# 7. Lead Management

A lead represents a potential customer.

V1 lead fields should include:

### Identity

- Name
- Phone
- Email
- Country
- City
- Preferred language

### Requirement

- Budget
- Property type
- BHK
- Preferred location
- Purpose
- Timeline

### Sales information

- Lead source
- Campaign
- Assigned agent
- Lead status
- Lead stage
- Priority
- Lead score
- Created date
- Last contacted date
- Next follow-up date

### Customer context

- Notes
- Tags
- Previous interactions
- AI-generated insights

---

# 8. Lead Sources

Support configurable sources such as:

- Website
- Property portals
- Google Ads
- Meta Ads
- Referral
- WhatsApp
- Manual entry
- Import
- API

The organization should be able to add additional sources later.

---

# 9. Lead Assignment

Leads can be assigned to:

- Individual sales agents
- Sales teams

V1 should support manual assignment.

Future versions can support automatic assignment rules.

Managers should be able to:

- Assign
- Reassign
- View ownership
- View unassigned leads

---

# 10. Lead Pipeline

Default pipeline:

New
→ Contacted
→ Qualified
→ Property Interested
→ Site Visit
→ Negotiation
→ Booking
→ Lost

Organizations should eventually be able to customize stages.

Each stage change should be recorded in the activity history.

---

# 11. Lead Detail Page

The lead detail page should become the salesperson's primary workspace.

It should show:

- Customer information
- Requirement
- Lead source
- Pipeline stage
- Assigned agent
- Lead score
- AI insights
- Property recommendations
- Call history
- Activity timeline
- Notes
- Follow-ups
- Site visits
- Deals
- Next action

The salesperson should not need to search multiple systems for customer context.

---

# 12. Activity Timeline

Every important customer interaction should be represented in the timeline.

Examples:

- Lead created
- Lead assigned
- Call made
- Call received
- WhatsApp interaction
- Email
- Note added
- Follow-up created
- Follow-up completed
- Property recommended
- Site visit scheduled
- Site visit completed
- Stage changed
- Deal updated

The timeline should provide a chronological customer history.

---

# 13. Follow-Up Management

Salespeople should be able to create:

- Call follow-up
- WhatsApp follow-up
- Email follow-up
- Meeting
- Site visit
- Custom task

Each follow-up should have:

- Due date
- Time
- Owner
- Status
- Priority
- Related lead

The system should notify users about upcoming and overdue follow-ups.

---

# 14. AI Sales Action Queue

This is one of FlowCRM's core differentiating capabilities.

The system should recommend what the salesperson should do next.

Examples:

- Call lead
- Follow up
- Send property
- Schedule site visit
- Recover inactive lead
- Wait until customer's preferred time
- Escalate to manager

Each recommendation should include a reason.

Example:

> Call Raj now because he showed high intent for a 3BHK property yesterday and has not been contacted since.

AI recommendations should be explainable.

---

# 15. Property & Project Management

V1 should support:

## Projects

- Project name
- Developer
- Location
- Description
- Status
- Amenities
- Project type

## Properties / Units

- Project
- Unit number
- Property type
- BHK
- Area
- Price
- Floor
- Availability
- Status
- Features

The system should support future expansion into detailed inventory management.

---

# 16. Property Matching

FlowCRM should match customer requirements against available inventory.

Initial matching should use deterministic rules.

Matching factors:

- Budget
- Location
- BHK
- Property type
- Area
- Availability
- Customer preferences

Later versions can add AI-based matching.

Recommendations should explain why a property matches.

---

# 17. Site Visits

Salespeople should be able to:

- Schedule site visit
- Select property/project
- Set date and time
- Assign salesperson
- Add customer notes
- Track attendance
- Record feedback
- Create post-visit follow-up

Site visits should be connected to the lead timeline.

---

# 18. Calling & VICIdial Integration

FlowCRM should integrate with VICIdial as a telephony layer.

Initial capabilities:

- Click-to-call
- Lead-to-call association
- Call status
- Call duration
- Call direction
- Agent
- Campaign
- Disposition
- Recording reference
- Call timestamp

The CRM should remain independent from the telephony provider.

The architecture should allow future telephony providers.

---

# 19. International / NRI Sales

V1 should support international customer information.

Store:

- Country
- Timezone
- Local customer time
- Preferred contact time
- Preferred communication channel

The system should help salespeople schedule calls and follow-ups according to the customer's local time.

Example:

> UAE customer → recommend follow-up during the customer's preferred UAE time.

International calling must respect applicable carrier, consent, privacy and jurisdiction requirements.

---

# 20. AI Conversation Intelligence

After an eligible call, AI should be able to generate:

### Summary

Short summary of the conversation.

### Requirement extraction

Examples:

- Budget
- BHK
- Location
- Timeline
- Purpose

### Intent

Examples:

- High intent
- Medium intent
- Low intent
- Unclear

### Objections

Examples:

- Price
- Location
- Possession
- Financing
- Trust

### Next action

AI recommends the next sales action.

AI-generated information should remain distinguishable from user-entered information.

---

# 21. AI Lead Recovery

FlowCRM should identify potentially recoverable inactive leads.

Signals may include:

- Previous high intent
- Multiple conversations
- Property interest
- Recent activity
- Matching inventory
- Recent inactivity

The system should generate a recovery recommendation.

Example:

> This lead previously showed high intent, has matching inventory available, and has been inactive for 14 days.

The system can create a recovery task for the salesperson.

---

# 22. Sales Dashboard

Sales agents should see:

- My leads
- Today's tasks
- Follow-ups due
- Overdue follow-ups
- High-intent leads
- Recent calls
- Upcoming site visits
- AI action queue

---

# 23. Manager Dashboard

Managers should see:

- Total leads
- New leads
- Qualified leads
- Site visits
- Negotiations
- Bookings
- Lost leads
- Lead source performance
- Agent activity
- Follow-up performance
- Call activity
- AI recovery candidates

Future versions can add deeper conversion analytics.

---

# 24. Notifications

V1 notifications should support:

- New lead assignment
- Follow-up due
- Follow-up overdue
- Site visit reminder
- High-intent lead alert
- AI recovery recommendation
- Manager assignment

Notification architecture should remain extensible.

---

# 25. Audit Logs

Important actions should be auditable.

Examples:

- User created
- User updated
- Lead created
- Lead assigned
- Lead stage changed
- Property changed
- Deal changed
- Permission changed
- Integration configuration changed

Audit logs should record:

- User
- Organization
- Action
- Resource
- Timestamp
- Relevant metadata

---

# 26. Search & Filtering

Users should be able to search and filter leads by:

- Name
- Phone
- Email
- Lead source
- Agent
- Stage
- Priority
- Budget
- Location
- Created date
- Last activity
- Next follow-up

Performance should remain acceptable as lead volume grows.

---

# 27. Data Import

V1 should support importing leads through CSV.

Import should include:

- Field mapping
- Validation
- Duplicate detection
- Import summary
- Error reporting

---

# 28. V1 Success Criteria

FlowCRM V1 should allow a real sales team to perform this complete workflow:

1. Receive/import a lead.
2. Assign the lead.
3. View the complete customer profile.
4. Qualify the customer.
5. View relevant properties.
6. Call the customer.
7. Store the call result.
8. Generate AI conversation summary.
9. Extract customer requirements.
10. Generate next-best action.
11. Schedule follow-up.
12. Schedule site visit.
13. Track the opportunity.
14. Progress the deal toward booking.
15. Allow managers to monitor the process.

---

# 29. Explicitly Out of Scope for V1

Do NOT build these initially:

- Complex workflow builder
- Full accounting system
- Payment gateway
- Advanced billing/subscriptions
- AI sales coaching
- Advanced ML prediction models
- Full ERP
- Complete marketing automation suite
- Every WhatsApp automation
- Every property portal integration
- Custom mobile applications
- Advanced AI chatbot
- Complex commission management

These may be added after product validation.

---

# 30. Product Principle

FlowCRM should not become a collection of disconnected CRM features.

Every feature should answer:

> Does this help the sales team understand the customer, take the next action, or move the customer closer to a booking?

If not, it should not be prioritized for V1.