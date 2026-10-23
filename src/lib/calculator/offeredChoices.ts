import { ProjectTypes, SpecLevels } from '$lib/calculator/options';
import type { RateRow } from '$lib/calculator/estimate';

export function offeredProjectTypes(rates: RateRow[]) {
	const priced = new Set(rates.map((rate) => rate.project_type));
	return ProjectTypes.filter((projectType) => priced.has(projectType.value));
}

export function offeredSpecLevels(rates: RateRow[], projectType: string) {
	const ratesForType = rates.filter((rate) => rate.project_type === projectType);
	const priced = new Set(ratesForType.map((rate) => rate.spec_level));
	return SpecLevels.filter((specLevel) => priced.has(specLevel.value));
}
