# FlowCRM V1 AI Architecture

## 1. AI Philosophy

AI is an intelligence layer on top of the CRM.

The CRM remains the system of record.

AI should:

- Understand customer interactions
- Extract useful information
- Identify sales signals
- Recommend actions
- Reduce manual CRM work
- Help salespeople prioritize leads
- Help managers understand sales activity

AI must not blindly control critical business decisions.

Core principle:

CRM stores the truth.
AI provides intelligence.

---

# 2. AI Architecture

High-level flow:

Call / Activity / Lead Data
        ↓
AI Processing
        ↓
Structured AI Output
        ↓
Validation
        ↓
AI Insight / Recommendation
        ↓
Human or deterministic CRM action

Example:

Call Recording
        ↓
Transcription
        ↓
Conversation Analysis
        ↓
Requirement Extraction
        ↓
Intent / Objection Detection
        ↓
Next Best Action
        ↓
Salesperson

---

# 3. AI Provider Abstraction

The application should not tightly couple business logic to one AI provider.

Conceptually:

AIService
   |
   +-- Provider A
   +-- Provider B
   +-- Future Provider

The provider layer should handle:

- Authentication
- Model selection
- Request formatting
- Response parsing
- Retry handling
- Usage tracking
- Error handling

Business modules should interact with an internal AI service rather than directly calling a provider.

---

# 4. AI Jobs

Long-running AI operations should run asynchronously.

Examples:

- Audio transcription
- Call analysis
- Lead analysis
- Lead recovery analysis
- Bulk AI processing

Flow:

Request
 ↓
Create AI Job
 ↓
Queue
 ↓
Worker
 ↓
AI Provider
 ↓
Validate Result
 ↓
Store Result
 ↓
Notify User

Possible job states:

QUEUED
PROCESSING
COMPLETED
FAILED
RETRYING

---

# 5. AI Conversation Intelligence

One of the primary AI capabilities is understanding sales calls.

Flow:

Call Recording
 ↓
Transcription
 ↓
Conversation Analysis
 ↓
Structured Extraction
 ↓
CRM Insight

The system should extract information such as:

- Customer requirements
- Budget
- BHK
- Preferred location
- Property type
- Purchase timeline
- Customer intent
- Objections
- Questions
- Competitor/property mentions
- Next action

---

# 6. AI Call Summary

After a completed call, AI can generate:

### Summary

A concise description of the conversation.

### Customer Requirements

Structured information extracted from the conversation.

### Intent

Possible values:

HIGH
MEDIUM
LOW
UNKNOWN

### Objections

Examples:

- Price
- Location
- Possession
- Financing
- Trust
- Family decision
- Timing

### Next Action

Example:

Call customer tomorrow evening.

---

# 7. AI Extraction Example

Conversation:

Customer says:

"I am looking for a 3 BHK around Gurgaon. My budget is around 1.5 crore and I want possession within the next year."

AI output:

```json
{
  "bhk": 3,
  "location": "Gurgaon",
  "budgetMax": 15000000,
  "timeline": "within_1_year"
}