import { dbConfigured, dbSelect } from '$lib/server/db';
import { estimateRatesTable, estimateSettingsTable } from '$lib/calculator/options';
import type { Calculator, EstimateSettings, RateRow } from '$lib/calculator/estimate';

interface StoredRate extends Omit<RateRow, 'rate_per_square_metre'> {
	rate_per_square_metre: number | string;
}

interface StoredSettings extends Omit<EstimateSettings, 'range_percent'> {
	range_percent: number | string;
}

export interface CalculatorReading {
	calculator: Calculator | null;
	rates: RateRow[];
	settings: EstimateSettings | null;
	isTableMissing: boolean;
}

const unread: CalculatorReading = { calculator: null, rates: [], settings: null, isTableMissing: false };

function toRate(stored: StoredRate): RateRow {
	return { ...stored, rate_per_square_metre: Number(stored.rate_per_square_metre) };
}

function toSettings(stored: StoredSettings): EstimateSettings {
	return { disclaimer: stored.disclaimer, range_percent: Number(stored.range_percent) };
}

function calculatorFrom(rates: RateRow[], settings: EstimateSettings | null): Calculator | null {
	const hasRates = rates.length > 0;
	if (!settings || !hasRates) return null;
	return { rates, settings };
}

async function readStored(): Promise<CalculatorReading> {
	const storedRates = await dbSelect<StoredRate>(
		estimateRatesTable,
		'select=project_type,spec_level,rate_per_square_metre'
	);
	const storedSettings = await dbSelect<StoredSettings>(
		estimateSettingsTable,
		'select=range_percent,disclaimer&limit=1'
	);
	const rates = storedRates.map(toRate);
	const firstSettings = storedSettings.at(0);
	const settings = firstSettings ? toSettings(firstSettings) : null;
	return { calculator: calculatorFrom(rates, settings), rates, settings, isTableMissing: false };
}

export async function readCalculator(): Promise<CalculatorReading> {
	if (!dbConfigured()) return unread;
	try {
		return await readStored();
	} catch {
		return { ...unread, isTableMissing: true };
	}
}

export async function getCalculator(): Promise<Calculator | null> {
	const reading = await readCalculator();
	return reading.calculator;
}
