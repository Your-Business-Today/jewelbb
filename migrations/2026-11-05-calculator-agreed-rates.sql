-- ============================================================
-- Migration: JBB's agreed rates for the house cost calculator (2026-11-05)
--
-- DATA ONLY, ADDITIVE: enters the rates Jeremy posted on the YBT
-- support task "Give the pricing basis for the website's house cost
-- calculator" (5 Nov 2026), agreed by Nigel. £ per m², ex VAT; VAT
-- is added by project type on the site. Range ±15%, no extras.
--
-- ON CONFLICT DO NOTHING: a rate or setting already saved in
-- /admin/calculator is kept, never overwritten. Safe to re-run.
-- Once saved, the calculator shows on the site; the figures stay
-- editable in /admin/calculator.
-- ============================================================

insert into public.estimate_rates (project_type, spec_level, rate_per_square_metre) values
	('new_build',  'standard', 2450),
	('new_build',  'mid',      2850),
	('new_build',  'premium',  3250),
	('extension',  'standard', 2050),
	('extension',  'mid',      2400),
	('extension',  'premium',  2650),
	('renovation', 'standard', 1100),
	('renovation', 'mid',      1500),
	('renovation', 'premium',  2100),
	('conversion', 'standard', 1500),
	('conversion', 'mid',      1900),
	('conversion', 'premium',  2500)
on conflict (project_type, spec_level) do nothing;

insert into public.estimate_settings (id, range_percent, disclaimer) values
	(1, 15, 'Guide only, not a quote. Based on recent Jewel Bespoke Build projects in London and Surrey. Your price depends on a site survey and full drawings.')
on conflict (id) do nothing;
