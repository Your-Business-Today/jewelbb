import { testimonials as builtInTestimonials } from '$lib/data/testimonials';
import { getTestimonialsFor } from '$lib/server/testimonials';
import { getCalculator } from '$lib/server/calculator';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const testimonials = await getTestimonialsFor('contactPage', builtInTestimonials);
	const calculator = await getCalculator();
	return { testimonial: testimonials.at(0), isCalculatorLive: calculator !== null };
};
