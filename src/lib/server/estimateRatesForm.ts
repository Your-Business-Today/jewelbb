import { EstimateLimits } from '$lib/calculator/options';
import type { EstimateSettings, RateRow } from '$lib/calculator/estimate';
import { rateCells, type RateCell } from '$lib/calculator/rateGrid';
import { readDecimal, readText, type DecimalField } from '$lib/server/formFields';

export interface RatesForm {
	rates: RateRow[];
	unofferedCells: RateCell[];
	settings: EstimateSettings;
}

export type RatesFormReading = { ratesForm: RatesForm; error?: undefined } | { error: string; ratesForm?: undefined };

type CellReading = { rate: RateRow | null; error?: undefined } | { error: string; rate?: undefined };

const rangeField: DecimalField = {
	name: 'range_percent',
	label: 'The range either side',
	minimum: 0,
	maximum: EstimateLimits.rangePercentMaximum,
	decimalPlaces: 1,
	isMinimumAllowed: true
};

function rateFieldFor(cell: RateCell): DecimalField {
	return {
		name: cell.fieldName,
		label: `The rate for ${cell.label}`,
		minimum: 0,
		maximum: EstimateLimits.rateMaximum,
		decimalPlaces: 2,
		isMinimumAllowed: false
	};
}

function readCell(form: FormData, cell: RateCell): CellReading {
	const isUnoffered = !readText(form, cell.fieldName);
	if (isUnoffered) return { rate: null };
	const reading = readDecimal(form, rateFieldFor(cell));
	if (reading.error !== undefined) return { error: reading.error };
	const rate = { project_type: cell.projectType, spec_level: cell.specLevel, rate_per_square_metre: reading.value };
	return { rate };
}

function disclaimerProblem(disclaimer: string): string | null {
	if (!disclaimer) return 'The disclaimer is required.';
	if (disclaimer.length <= EstimateLimits.disclaimerLength) return null;
	return `The disclaimer must be ${EstimateLimits.disclaimerLength} characters or fewer; it is ${disclaimer.length}.`;
}

export function readRatesForm(form: FormData): RatesFormReading {
	const cellReadings = rateCells.map((cell) => readCell(form, cell));
	const failedCell = cellReadings.find((reading) => reading.error !== undefined);
	if (failedCell?.error) return { error: failedCell.error };
	const range = readDecimal(form, rangeField);
	if (range.error !== undefined) return { error: range.error };
	const disclaimer = readText(form, 'disclaimer');
	const problem = disclaimerProblem(disclaimer);
	if (problem) return { error: problem };
	const rates = cellReadings.flatMap((reading) => (reading.rate ? [reading.rate] : []));
	const unofferedCells = rateCells.filter((cell, index) => !cellReadings[index].rate);
	const settings = { range_percent: range.value, disclaimer };
	return { ratesForm: { rates, unofferedCells, settings } };
}
