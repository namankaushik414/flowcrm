# FlowCRM AI Outbound Dialer V1

Phase 1 foundation only.

## Stack
- Node.js 22 + TypeScript
- PostgreSQL 17
- Redis 8 + BullMQ
- FreeSWITCH 1.10
- Docker Compose

## Start

1. Copy `.env.example` to `.env`.
2. Run:

```bash
docker compose up --build
```

3. Verify the service:

```bash
curl http://localhost:8080/health
curl http://localhost:8080/freeswitch/status
```

4. Run the local-only FreeSWITCH test call:

```bash
curl -X POST http://localhost:8080/freeswitch/test-call
```

The test call uses FreeSWITCH extension `9999` and does not contact a SIP carrier or an external phone number.

## Database verification

```bash
docker compose exec postgres psql -U flowcrm -d flowcrm_dialer -c "\dt"
docker compose exec postgres psql -U flowcrm -d flowcrm_dialer -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;"
```

Expected application tables:
`campaigns`, `leads`, `campaign_leads`, `consents`, `dnc_entries`, `calls`, `cdr_events`, `ai_sessions`.

## Phase gate

Do not add carrier origination, bulk import, campaign scheduling, AI voice, or dashboard work until:
- all containers are healthy;
- `GET /health` returns `{"ok":true}`;
- FreeSWITCH status responds;
- the `9999` test call completes successfully;
- PostgreSQL tables exist.
