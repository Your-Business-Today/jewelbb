-- ============================================================
-- Migration: a separate Conversion type in the house cost calculator (2026-11-03)
--
-- WIDENS ONE CHECK ONLY: estimate_rates.project_type now also allows
-- 'conversion' (garage, loft), priced apart from 'renovation'. Every row
-- already stored still passes. Safe to re-run.
-- ============================================================

alter table public.estimate_rates drop constraint if exists estimate_rates_project_type_check;

alter table public.estimate_rates
	add constraint estimate_rates_project_type_check
	check (project_type in ('new_build', 'extension', 'renovation', 'conversion'));
