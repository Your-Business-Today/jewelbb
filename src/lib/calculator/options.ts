export const ProjectTypes = [
	{ value: 'new_build', label: 'New build' },
	{ value: 'extension', label: 'Extension' },
	{ value: 'renovation', label: 'Renovation or conversion' }
] as const;

export const SpecLevels = [
	{ value: 'standard', label: 'Standard' },
	{ value: 'mid', label: 'Mid-range' },
	{ value: 'premium', label: 'Premium' }
] as const;

export type ProjectType = (typeof ProjectTypes)[number]['value'];

export type SpecLevel = (typeof SpecLevels)[number]['value'];

export const storeyChoices = [1, 2, 3];

export const EstimateLimits = {
	floorAreaMinimum: 5,
	floorAreaMaximum: 2000,
	floorAreaStep: 0.1,
	storeysMinimum: Math.min(...storeyChoices),
	storeysMaximum: Math.max(...storeyChoices),
	rateMaximum: 100000,
	rateStep: 0.01,
	rangePercentMaximum: 50,
	rangePercentStep: 0.1,
	disclaimerLength: 1000
} as const;

export const estimateRatesTable = 'estimate_rates';

export const estimateSettingsTable = 'estimate_settings';

export const settingsRowId = 1;
