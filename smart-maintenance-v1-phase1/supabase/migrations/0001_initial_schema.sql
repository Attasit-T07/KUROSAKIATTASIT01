-- Draft only; not applied to any Supabase project.
create table if not exists public.machines (id uuid primary key default gen_random_uuid(), code text not null unique, name text not null, model text not null default 'FX5U Simulator', is_demo boolean not null default true, created_at timestamptz not null default now());
create table if not exists public.machine_status (id bigint generated always as identity primary key, machine_id uuid not null references public.machines(id), mode text not null check (mode in ('RUN','STOP','FAULT')), speed_ppm numeric(8,2) not null default 0, recorded_at timestamptz not null default now());
create table if not exists public.sensor_readings (id bigint generated always as identity primary key, machine_id uuid not null references public.machines(id), current_a numeric(8,2) not null, temperature_c numeric(8,2) not null, recorded_at timestamptz not null default now());
create table if not exists public.io_states (id bigint generated always as identity primary key, machine_id uuid not null references public.machines(id), address text not null check (address ~ '^[XY][0-7]$'), value boolean not null, recorded_at timestamptz not null default now());
create table if not exists public.production_records (id bigint generated always as identity primary key, machine_id uuid not null references public.machines(id), planned_seconds integer not null check(planned_seconds >= 0), run_seconds integer not null check(run_seconds >= 0), ideal_cycle_seconds numeric(10,4) not null check(ideal_cycle_seconds > 0), total_count integer not null check(total_count >= 0), good_count integer not null check(good_count >= 0 and good_count <= total_count), recorded_at timestamptz not null default now());
create table if not exists public.alarms (id bigint generated always as identity primary key, machine_id uuid not null references public.machines(id), code text not null, description text not null, activated_at timestamptz not null default now(), cleared_at timestamptz);
create table if not exists public.maintenance_jobs (id bigint generated always as identity primary key, machine_id uuid not null references public.machines(id), title text not null, status text not null default 'OPEN' check(status in ('OPEN','IN_PROGRESS','CLOSED')), created_at timestamptz not null default now());
-- Default deny for anon/authenticated roles; separate approved access policies required before frontend database reads.
alter table public.machines enable row level security;
alter table public.machine_status enable row level security;
alter table public.sensor_readings enable row level security;
alter table public.io_states enable row level security;
alter table public.production_records enable row level security;
alter table public.alarms enable row level security;
alter table public.maintenance_jobs enable row level security;
create index if not exists idx_status_machine_time on public.machine_status(machine_id,recorded_at desc);
create index if not exists idx_sensor_machine_time on public.sensor_readings(machine_id,recorded_at desc);
create index if not exists idx_alarm_machine_time on public.alarms(machine_id,activated_at desc);
-- No public RLS policies are defined. All read/writes from browser blocked by default.
