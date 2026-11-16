# Smart Maintenance Ecosystem — Prototype V1

Simulation-first local dashboard for a single FX5U-style conveyor machine. **No PLC connection, cloud deployment, or real production data.**

## Local run
Node.js 20+ required.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Simulation state is generated in your browser and is not persisted.

## Modules
- Machine RUN / STOP / FAULT and speed control
- Motor current and temperature simulation
- X0–X7/Y0–Y7 interactive I/O simulation
- Production count, good/reject, and OEE from simulated totals
- SQL schema for 7 Supabase tables and synthetic seed data (not yet applied)

## Architecture
See `docs/architecture.md`. Future gateway: FX5U → read-only local Node-RED (SLMP) → outbound HTTPS → Supabase → Next.js dashboard.

## Approved scope
Phase 1: files and simulator. Phase 2: Supabase only after confirmation of organization and any charges. **No Vercel deployment.** This is a public repository: do not commit credentials or factory-specific information.
