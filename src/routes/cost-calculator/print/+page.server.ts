import { printableEstimate } from '$lib/server/printableEstimate';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = ({ url }) => printableEstimate(url.searchParams);
