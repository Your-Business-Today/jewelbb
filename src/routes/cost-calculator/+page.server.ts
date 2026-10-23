import { error, fail } from '@sveltejs/kit';
import { getCalculator } from '$lib/server/calculator';
import { estimateFrom } from '$lib/server/estimateRequest';
import type { Calculator } from '$lib/calculator/estimate';
import type { Actions, PageServerLoad } from './$types';

const HttpStatus = { BadRequest: 400, NotFound: 404 } as const;

async function liveCalculator(): Promise<Calculator> {
	const calculator = await getCalculator();
	if (!calculator) error(HttpStatus.NotFound, 'Not found');
	return calculator;
}

export const load: PageServerLoad = async () => {
	const calculator = await liveCalculator();
	return { rates: calculator.rates, settings: calculator.settings };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const calculator = await liveCalculator();
		const reading = estimateFrom(await request.formData(), calculator);
		if (!reading.estimate) return fail(HttpStatus.BadRequest, { error: reading.error });
		return { estimate: reading.estimate };
	}
};
