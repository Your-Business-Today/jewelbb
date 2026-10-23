-- ============================================================
-- Migration: rates for the house cost calculator (2026-10-23)
--
-- ADDITIVE ONLY: creates two new tables and changes nothing that
-- already exists. Safe to re-run. Both start empty: the calculator
-- stays hidden on the site until rates are saved in /admin/calculator.
-- ============================================================

create table if not exists public.estimate_rates (
	id uuid primary key default gen_random_uuid(),
	project_type text not null check (project_type in ('new_build', 'extension', 'renovation')),
	spec_level text not null check (spec_level in ('standard', 'mid', 'premium')),
	rate_per_square_metre numeric(8, 2) not null check (rate_per_square_metre > 0 and rate_per_square_metre <= 100000),
	unique (project_type, spec_level)
);

create table if not exists public.estimate_settings (
	id smallint primary key default 1 check (id = 1),
	range_percent numeric(4, 1) not null check (range_percent >= 0 and range_percent <= 50),
	disclaimer text not null check (char_length(disclaimer) between 1 and 1000),
	updated_at timestamptz not null default now()
);

alter table public.estimate_rates enable row level security;
alter table public.estimate_settings enable row level security;
revoke all on public.estimate_rates from anon, authenticated;
revoke all on public.estimate_settings from anon, authenticated;
