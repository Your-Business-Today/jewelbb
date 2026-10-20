-- ============================================================
-- Migration: testimonials managed in /admin/testimonials (2026-10-20)
--
-- ADDITIVE ONLY: creates one new table and seeds it once. Reads the
-- active brochure's testimonials page to copy its quotes, and changes
-- nothing that already exists. Safe to re-run: the table is created
-- only if missing and the seed only runs while the table is empty.
--
-- The MVL Architects endorsement was withdrawn on 2026-10-20, so the
-- seed leaves out every quote attributed to MVL or Malcolm Le(l)liott.
-- ============================================================

create table if not exists public.testimonials (
	id uuid primary key default gen_random_uuid(),
	quote text not null,
	author text not null,
	context text not null default '',
	is_visible boolean not null default true,
	is_on_homepage boolean not null default false,
	is_on_contact_page boolean not null default false,
	is_in_brochure boolean not null default false,
	sort_order int not null default 999,
	created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;
revoke all on public.testimonials from anon, authenticated;

do $$
declare
	withdrawn constant text := '(mvl|lel+iott)';
begin
	if exists (select 1 from public.testimonials) then
		return;
	end if;

	insert into public.testimonials
		(quote, author, context, is_on_homepage, is_on_contact_page, sort_order)
	values (
		'All work was executed to a very high standard. I was most impressed by the speed with which any queries were answered, and a solution proposed, and also by the politeness and cleanliness of the workers who were doing difficult and dirty work in a working home. I was very happy with the results and have commissioned them to do further work.',
		'Mrs. Carson', 'Kensington project', true, true, 10
	);

	insert into public.testimonials (quote, author, is_in_brochure, sort_order)
	select quote_item ->> 'quote', quote_item ->> 'author', true, 100 + item_number::int * 10
	from public.brochure_pages page
	join public.brochures brochure on brochure.id = page.brochure_id and brochure.status = 'active'
	cross join lateral jsonb_array_elements(
		case when jsonb_typeof(page.content -> 'quotes') = 'array'
			then page.content -> 'quotes' else '[]'::jsonb end
	) with ordinality as quotes(quote_item, item_number)
	where page.template = 'testimonials'
		and coalesce(quote_item ->> 'quote', '') <> ''
		and coalesce(quote_item ->> 'author', '') <> ''
		and (quote_item ->> 'author') !~* withdrawn
		and (quote_item ->> 'quote') !~* withdrawn;

	if exists (select 1 from public.testimonials where is_in_brochure) then
		return;
	end if;

	insert into public.testimonials (quote, author, is_in_brochure, sort_order)
	select * from (values
		('Les and Nigel Reilly are the father and son driving force behind their Jewel construction companies. Their commitment to excellence and unwavering dedication to delivering top-notch results have earned them an impeccable reputation.', 'Lady Jacqueline Smith Maxwell', true, 110),
		('Nigel and his team recently undertook work on our new home, both internally and externally. They were a pleasure to deal with and meticulously thorough. A trustworthy, reliable, and professional company.', 'Mr. Sullivan', true, 120),
		('All work was executed to a very high standard. I was most impressed by the speed with which any queries were answered and a solution proposed. I was very happy with the results.', 'Mrs. Carson', true, 130),
		('I can thoroughly recommend Jewel and the experienced team on any project you may have in mind. I was very happy with the management of the project and the way unforeseen issues were overcome.', 'Mr. Prior', true, 140),
		('It is a pleasure to express how remarkable the work Jewel has completed on our property. We have nothing but accolades for Jewel, as they have proven to be extremely dependable.', 'Lord Ian McColl', true, 150),
		('Excellent standard of work, exceeded expectations. Job done thoroughly and well.', 'Suzie', true, 160),
		('We have worked in partnership with Jewel for the past 4 years as our main Club Partner and kit sponsor. Jewel have been wonderful supporters of the club.', 'Julian Clogg, Epsom & Ewell Colts', true, 170)
	) as seed(quote, author, is_in_brochure, sort_order);
end $$;
