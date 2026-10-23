import type { ProjectType, SpecLevel } from '$lib/calculator/options';

export interface RateRow {
	project_type: ProjectType;
	spec_level: SpecLevel;
	rate_per_square_metre: number;
}

export interface EstimateSettings {
	range_percent: number;
	disclaimer: string;
}

export interface Calculator {
	rates: RateRow[];
	settings: EstimateSettings;
}

export interface VisitorDetails {
	projectType: ProjectType;
	specLevel: SpecLevel;
	floorArea: number;
}

export interface Estimate {
	details: VisitorDetails;
	low: number;
	high: number;
}

const percent = 100;

const roundingStep = 1000;

function roundedToStep(amount: number): number {
	return Math.round(amount / roundingStep) * roundingStep;
}

export function rateFor(rates: RateRow[], details: Omit<VisitorDetails, 'floorArea'>): RateRow | undefined {
	return rates.find(
		(rate) => rate.project_type === details.projectType && rate.spec_level === details.specLevel
	);
}

export function estimateFor(details: VisitorDetails, rate: RateRow, settings: EstimateSettings): Estimate {
	const middle = details.floorArea * rate.rate_per_square_metre;
	const spread = middle * (settings.range_percent / percent);
	return { details, low: roundedToStep(middle - spread), high: roundedToStep(middle + spread) };
}
