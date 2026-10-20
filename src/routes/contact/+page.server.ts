import { testimonials as builtInTestimonials } from '$lib/data/testimonials';
import { getTestimonialsFor } from '$lib/server/testimonials';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const testimonials = await getTestimonialsFor('contactPage', builtInTestimonials);
	return { testimonial: testimonials.at(0) };
};
