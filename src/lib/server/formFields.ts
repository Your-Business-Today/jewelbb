export interface DecimalField {
	name: string;
	label: string;
	minimum: number;
	maximum: number;
	decimalPlaces: number;
	isMinimumAllowed: boolean;
}

export type DecimalReading = { value: number; error?: undefined } | { error: string; value?: undefined };

export function readText(form: FormData, name: string): string {
	return String(form.get(name) ?? '').trim();
}

function decimalPattern(decimalPlaces: number): RegExp {
	return new RegExp(`^\\d+(\\.\\d{1,${decimalPlaces}})?$`);
}

function rangeProblem(field: DecimalField, value: number): string | null {
	const isTooLow = field.isMinimumAllowed ? value < field.minimum : value <= field.minimum;
	const isTooHigh = value > field.maximum;
	if (!isTooLow && !isTooHigh) return null;
	const allowedRange = field.isMinimumAllowed
		? `between ${field.minimum} and ${field.maximum}`
		: `more than ${field.minimum} and at most ${field.maximum}`;
	return `${field.label} must be ${allowedRange}.`;
}

export function readDecimal(form: FormData, field: DecimalField): DecimalReading {
	const typed = readText(form, field.name);
	if (!typed) return { error: `${field.label} is required.` };
	const isWellFormed = decimalPattern(field.decimalPlaces).test(typed);
	if (!isWellFormed) {
		return { error: `${field.label} must be a number with at most ${field.decimalPlaces} decimal places.` };
	}
	const value = Number(typed);
	const problem = rangeProblem(field, value);
	if (problem) return { error: problem };
	return { value };
}
