import { error } from '@sveltejs/kit';
import { getCalculator } from '$lib/server/calculator';
import { estimateFrom } from '$lib/server/estimateRequest';
import type { Estimate, EstimateSettings } from '$lib/calculator/estimate';

const HttpStatus = { BadRequest: 400, NotFound: 404 } as const;

export interface PrintableEstimate {
	estimate: Estimate;
	settings: EstimateSettings;
}

export async function printableEstimate(query: URLSearchParams): Promise<PrintableEstimate> {
	const calculator = await getCalculator();
	if (!calculator) error(HttpStatus.NotFound, 'Not found');
	const reading = estimateFrom(query, calculator);
	if (!reading.estimate) error(HttpStatus.BadRequest, reading.error);
	return { estimate: reading.estimate, settings: calculator.settings };
}
