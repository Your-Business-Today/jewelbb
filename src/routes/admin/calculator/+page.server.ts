import { fail } from '@sveltejs/kit';
import { dbDeleteWhere, dbUpsert } from '$lib/server/db';
import { readCalculator } from '$lib/server/calculator';
import { readRatesForm, type RatesForm } from '$lib/server/estimateRatesForm';
import { estimateRatesTable, estimateSettingsTable, settingsRowId } from '$lib/calculator/options';
import type { RateCell } from '$lib/calculator/rateGrid';
import type { Actions, PageServerLoad } from './$types';

const HttpStatus = { BadRequest: 400 } as const;

const rateKey = 'project_type,spec_level';

export const load: PageServerLoad = async () => {
	const reading = await readCalculator();
	return {
		rates: reading.rates,
		settings: reading.settings,
		isLive: reading.calculator !== null,
		isTableMissing: reading.isTableMissing
	};
};

function unofferedFilter(cell: RateCell): string {
	return `project_type=eq.${cell.projectType}&spec_level=eq.${cell.specLevel}`;
}

async function saveRatesForm(ratesForm: RatesForm): Promise<void> {
	const settingsRow = { id: settingsRowId, ...ratesForm.settings, updated_at: new Date().toISOString() };
	await dbUpsert(estimateSettingsTable, settingsRow, 'id');
	const upserts = ratesForm.rates.map((rate) => dbUpsert(estimateRatesTable, { ...rate }, rateKey));
	const deletes = ratesForm.unofferedCells.map((cell) => dbDeleteWhere(estimateRatesTable, unofferedFilter(cell)));
	await Promise.all([...upserts, ...deletes]);
}

export const actions: Actions = {
	save: async ({ request }) => {
		const reading = readRatesForm(await request.formData());
		if (!reading.ratesForm) return fail(HttpStatus.BadRequest, { error: reading.error });
		await saveRatesForm(reading.ratesForm);
		return { saved: true };
	}
};
