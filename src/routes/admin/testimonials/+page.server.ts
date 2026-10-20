import { fail } from '@sveltejs/kit';
import { dbConfigured, dbDelete, dbInsert, dbSelect, dbUpdate } from '$lib/server/db';
import * as testimonialForm from '$lib/server/testimonialForm';
import { testimonialsTable, type TestimonialRow } from '$lib/testimonials/testimonial';
import type { Actions, PageServerLoad } from './$types';

const HttpStatus = { BadRequest: 400 } as const;

const missingId = 'That testimonial could not be found. Reload the page and try again.';

export const load: PageServerLoad = async () => {
	const testimonials: TestimonialRow[] = [];
	if (!dbConfigured()) return { testimonials, isConfigured: false, isTableMissing: false };
	try {
		const rows = await dbSelect<TestimonialRow>(
			testimonialsTable,
			'select=*&order=sort_order.asc,created_at.asc'
		);
		return { testimonials: rows, isConfigured: true, isTableMissing: false };
	} catch {
		return { testimonials, isConfigured: true, isTableMissing: true };
	}
};

async function changeTestimonial(
	request: Request,
	change: (id: string, form: FormData) => Promise<string | null>
) {
	const form = await request.formData();
	const testimonialId = testimonialForm.id(form);
	if (!testimonialId) return fail(HttpStatus.BadRequest, { error: missingId });
	const problem = await change(testimonialId, form);
	if (problem) return fail(HttpStatus.BadRequest, { error: problem });
	return { saved: true };
}

async function saveDetails(id: string, form: FormData): Promise<string | null> {
	const reading = testimonialForm.details(form);
	if (!reading.details) return reading.error;
	await dbUpdate(testimonialsTable, id, reading.details);
	return null;
}

async function hide(id: string): Promise<null> {
	await dbUpdate(testimonialsTable, id, { is_visible: false });
	return null;
}

async function show(id: string): Promise<null> {
	await dbUpdate(testimonialsTable, id, { is_visible: true });
	return null;
}

async function remove(id: string): Promise<null> {
	await dbDelete(testimonialsTable, id);
	return null;
}

export const actions: Actions = {
	create: async ({ request }) => {
		const reading = testimonialForm.details(await request.formData());
		if (!reading.details) return fail(HttpStatus.BadRequest, { error: reading.error });
		await dbInsert(testimonialsTable, { ...reading.details, is_visible: true });
		return { saved: true };
	},
	save: ({ request }) => changeTestimonial(request, saveDetails),
	hide: ({ request }) => changeTestimonial(request, hide),
	show: ({ request }) => changeTestimonial(request, show),
	delete: ({ request }) => changeTestimonial(request, remove)
};
