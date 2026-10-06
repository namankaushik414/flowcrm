CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TYPE campaign_status AS ENUM ('DRAFT','RUNNING','PAUSED','COMPLETED','ARCHIVED');
CREATE TYPE lead_status AS ENUM ('NEW','QUEUED','DIALING','ANSWERED','NO_ANSWER','BUSY','FAILED','DNC','COMPLETED');
CREATE TYPE call_status AS ENUM ('QUEUED','RINGING','ANSWERED','COMPLETED','FAILED','NO_ANSWER','BUSY','CANCELLED');
CREATE TYPE consent_type AS ENUM ('OPT_IN','OPT_OUT','DNC');
CREATE TYPE ai_session_status AS ENUM ('PENDING','ACTIVE','COMPLETED','FAILED');

CREATE TABLE campaigns (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL,
 status campaign_status NOT NULL DEFAULT 'DRAFT',
 max_concurrency integer NOT NULL DEFAULT 10 CHECK (max_concurrency BETWEEN 1 AND 100),
 retry_limit integer NOT NULL DEFAULT 2 CHECK (retry_limit BETWEEN 0 AND 10),
 retry_delay_seconds integer NOT NULL DEFAULT 300 CHECK (retry_delay_seconds >= 0),
 calling_hours_start time NOT NULL DEFAULT '09:00', calling_hours_end time NOT NULL DEFAULT '18:00',
 timezone text NOT NULL DEFAULT 'Asia/Kolkata', ai_agent_id text,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE leads (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), external_id text, phone_e164 text NOT NULL,
 first_name text, last_name text, metadata jsonb NOT NULL DEFAULT '{}',
 status lead_status NOT NULL DEFAULT 'NEW', created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(phone_e164)
);
CREATE TABLE campaign_leads (
 campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
 lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
 attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
 next_attempt_at timestamptz, last_attempt_at timestamptz,
 PRIMARY KEY (campaign_id, lead_id)
);
CREATE TABLE consents (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
 type consent_type NOT NULL, source text, captured_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz
);
CREATE TABLE dnc_entries (phone_e164 text PRIMARY KEY, reason text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE calls (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), campaign_id uuid NOT NULL REFERENCES campaigns(id),
 lead_id uuid NOT NULL REFERENCES leads(id), provider text NOT NULL DEFAULT 'freeswitch',
 provider_call_id text, status call_status NOT NULL DEFAULT 'QUEUED', hangup_cause text,
 sip_code integer, started_at timestamptz, answered_at timestamptz, ended_at timestamptz,
 duration_seconds integer, recording_url text, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE cdr_events (
 id bigserial PRIMARY KEY, call_id uuid NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
 event_type text NOT NULL, payload jsonb NOT NULL DEFAULT '{}', occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE ai_sessions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), call_id uuid NOT NULL UNIQUE REFERENCES calls(id) ON DELETE CASCADE,
 status ai_session_status NOT NULL DEFAULT 'PENDING', agent_id text, transcript jsonb NOT NULL DEFAULT '[]',
 outcome text, started_at timestamptz, ended_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_campaign_leads_next_attempt ON campaign_leads(campaign_id, next_attempt_at);
CREATE INDEX idx_calls_campaign_created ON calls(campaign_id, created_at DESC);
CREATE INDEX idx_calls_status ON calls(status);
CREATE INDEX idx_dnc_phone ON dnc_entries(phone_e164);
CREATE INDEX idx_consents_lead_captured ON consents(lead_id, captured_at DESC);
