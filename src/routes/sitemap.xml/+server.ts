import { site } from '$lib/data/site';
import { getProjects } from '$lib/server/projects';
import { posts } from '$lib/blog';
import { getCalculator } from '$lib/server/calculator';
import type { RequestHandler } from './$types';

// Rendered per-request so projects added in /admin appear automatically.
export const prerender = false;

const staticPaths = [
	'',
	'/about',
	'/services',
	'/portfolio',
	'/ourcommunity',
	'/blog',
	'/brochure',
	'/contact',
	'/privacy-policy',
	'/subcontractor-terms'
];

const calculatorPath = '/cost-calculator';

export const GET: RequestHandler = async () => {
	const projects = await getProjects();
	const calculator = await getCalculator();
	const calculatorPaths = calculator ? [calculatorPath] : [];
	const urls = [
		...staticPaths,
		...calculatorPaths,
		...projects.map((p) => `/${p.slug}`),
		...posts.map((p) => `/post/${p.slug}`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `\t<url><loc>${site.url}${u}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
