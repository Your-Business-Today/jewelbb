import { testimonials as builtInTestimonials } from '$lib/data/testimonials';
import { getBadges } from '$lib/server/badges';
import { getProjects } from '$lib/server/projects';
import { getSlides } from '$lib/server/slides';
import { getTestimonialsFor } from '$lib/server/testimonials';
import type { PageServerLoad } from './$types';

// Rendered per-request so project edits in /admin appear immediately.
export const prerender = false;

export const load: PageServerLoad = async () => {
	const [projects, badges, slides, testimonials] = await Promise.all([
		getProjects(),
		getBadges(),
		getSlides(),
		getTestimonialsFor('homepage', builtInTestimonials)
	]);
	return {
		featured: projects.filter((p) => p.gallery.length > 0).slice(0, 3),
		badges,
		slides,
		testimonials
	};
};
