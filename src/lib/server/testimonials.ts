import type { Testimonial } from '$lib/data/testimonials';
import { dbConfigured, dbSelect, type BrochurePageRow } from '$lib/server/db';
import type { BrochureDoc } from '$lib/server/brochures';
import {
	Placements,
	testimonialsTable,
	type Placement,
	type TestimonialRow
} from '$lib/testimonials/testimonial';

const brochureTemplate = 'testimonials';

interface BrochureQuote {
	quote: string;
	author: string;
}

function toTestimonial(row: TestimonialRow): Testimonial {
	return { quote: row.quote, author: row.author, context: row.context };
}

async function getManagedTestimonials(placement: Placement): Promise<Testimonial[] | null> {
	if (!dbConfigured()) return null;
	const column = Placements[placement].column;
	try {
		const rows = await dbSelect<TestimonialRow>(
			testimonialsTable,
			`select=*&is_visible=eq.true&${column}=eq.true&order=sort_order.asc,created_at.asc`
		);
		return rows.map(toTestimonial);
	} catch {
		return null;
	}
}

export async function getTestimonialsFor(
	placement: Placement,
	builtIn: Testimonial[]
): Promise<Testimonial[]> {
	const managed = await getManagedTestimonials(placement);
	return managed ?? builtIn;
}

function brochureAttribution(testimonial: Testimonial): string {
	if (!testimonial.context) return testimonial.author;
	return `${testimonial.author}, ${testimonial.context}`;
}

function toBrochureQuote(testimonial: Testimonial): BrochureQuote {
	return { quote: testimonial.quote, author: brochureAttribution(testimonial) };
}

function withQuotes(page: BrochurePageRow, quotes: BrochureQuote[]): BrochurePageRow {
	if (page.template !== brochureTemplate) return page;
	return { ...page, content: { ...page.content, quotes } };
}

export async function withBrochureTestimonials(doc: BrochureDoc): Promise<BrochureDoc> {
	const managed = await getManagedTestimonials('brochure');
	if (!managed) return doc;
	const quotes = managed.map(toBrochureQuote);
	return { ...doc, pages: doc.pages.map((page) => withQuotes(page, quotes)) };
}
