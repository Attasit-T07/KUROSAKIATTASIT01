# Architecture / Phase gates

1. Physical: Mitsubishi FX5U, GS2107, sensors — **future read-only connection**, not deployed.
2. Local gateway: Node-RED poll SLMP on separated OT network, validate + buffer telemetry; outbound HTTPS only.
3. Supabase: PostgreSQL with RLS; no anon/public access by default; configure per-user membership and least-privilege ingestion after review.
4. Dashboard: Next.js; Phase 1 demo uses client-side simulation only.
5. Future integration: SAP PM/MES (separate approvals).

Security rules: No PLC public IP/SLMP port forwarding; no writeback to PLC; no real sensor/tag/company data in public repo; protect service role and API credentials in server-side secrets only; no production deployment without approval.

## Handover
Phase 1: local source only. Phase 2: create Supabase project, apply/review SQL and synthetic seed, test RLS. Phase 3: Vercel preview only after explicit authorization.
