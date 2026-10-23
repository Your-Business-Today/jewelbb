import { EstimateLimits, ProjectTypes, SpecLevels } from '$lib/calculator/options';
import { estimateFor, rateFor, type Calculator, type Estimate } from '$lib/calculator/estimate';
import { readDecimal, readText, type DecimalField, type FieldSource } from '$lib/server/formFields';

export type EstimateReading = { estimate: Estimate; error?: undefined } | { error: string; estimate?: undefined };

const floorAreaField: DecimalField = {
	name: 'floor_area',
	label: 'The floor area',
	minimum: EstimateLimits.floorAreaMinimum,
	maximum: EstimateLimits.floorAreaMaximum,
	decimalPlaces: 1,
	isMinimumAllowed: true
};

const unpricedChoice =
	'We cannot price that project type and finish online yet. Request a free quote and we will price it for you.';

function choiceFrom<Value extends string>(options: readonly { value: Value }[], typed: string): Value | undefined {
	const chosen = options.find((option) => option.value === typed);
	return chosen?.value;
}

export function estimateFrom(form: FieldSource, calculator: Calculator): EstimateReading {
	const projectType = choiceFrom(ProjectTypes, readText(form, 'project_type'));
	if (!projectType) return { error: 'Choose the type of project.' };
	const specLevel = choiceFrom(SpecLevels, readText(form, 'spec_level'));
	if (!specLevel) return { error: 'Choose the finish.' };
	const floorArea = readDecimal(form, floorAreaField);
	if (floorArea.error !== undefined) return { error: floorArea.error };
	const rate = rateFor(calculator.rates, { projectType, specLevel });
	if (!rate) return { error: unpricedChoice };
	const details = { projectType, specLevel, floorArea: floorArea.value };
	return { estimate: estimateFor(details, rate, calculator.settings) };
}
