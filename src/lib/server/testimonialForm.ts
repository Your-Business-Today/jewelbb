import { TestimonialLimits } from '$lib/testimonials/limits';
import {
	placementList,
	type PlacementColumn,
	type TestimonialInput
} from '$lib/testimonials/testimonial';

export type TestimonialDetails = Omit<TestimonialInput, 'is_visible'>;

export type TestimonialFormReading =
	| { details: TestimonialDetails; error?: undefined }
	| { error: string; details?: undefined };

interface TextField {
	name: 'quote' | 'author' | 'context';
	label: string;
	maximum: number;
	isRequired: boolean;
}

const textFields: TextField[] = [
	{ name: 'quote', label: 'The quote', maximum: TestimonialLimits.quoteLength, isRequired: true },
	{ name: 'author', label: 'The name', maximum: TestimonialLimits.authorLength, isRequired: true },
	{
		name: 'context',
		label: 'The company or project',
		maximum: TestimonialLimits.contextLength,
		isRequired: false
	}
];

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function readText(form: FormData, name: string): string {
	return String(form.get(name) ?? '').trim();
}

function textProblem(form: FormData, field: TextField): string | null {
	const value = readText(form, field.name);
	if (field.isRequired && !value) return `${field.label} is required.`;
	if (value.length <= field.maximum) return null;
	return `${field.label} must be ${field.maximum} characters or fewer; it is ${value.length}.`;
}

function readSortOrder(form: FormData): number {
	const typed = readText(form, 'sort_order');
	if (!typed) return TestimonialLimits.newSortOrder;
	return Number(typed);
}

function sortOrderProblem(sortOrder: number): string | null {
	const isWholeNumber = Number.isInteger(sortOrder);
	const isTooLow = sortOrder < TestimonialLimits.sortOrderMinimum;
	const isTooHigh = sortOrder > TestimonialLimits.sortOrderMaximum;
	if (isWholeNumber && !isTooLow && !isTooHigh) return null;
	const range = `${TestimonialLimits.sortOrderMinimum} to ${TestimonialLimits.sortOrderMaximum}`;
	return `The sort order must be a whole number from ${range}.`;
}

function readPlacements(form: FormData): Record<PlacementColumn, boolean> {
	const ticks = placementList.map((placement) => [placement.column, form.has(placement.column)]);
	return Object.fromEntries(ticks);
}

export function details(form: FormData): TestimonialFormReading {
	const sortOrder = readSortOrder(form);
	const problems = [...textFields.map((field) => textProblem(form, field)), sortOrderProblem(sortOrder)];
	const firstProblem = problems.find((problem) => problem !== null);
	if (firstProblem) return { error: firstProblem };
	const details = {
		quote: readText(form, 'quote'),
		author: readText(form, 'author'),
		context: readText(form, 'context'),
		sort_order: sortOrder,
		...readPlacements(form)
	};
	return { details };
}

export function id(form: FormData): string | null {
	const typed = readText(form, 'id');
	if (!uuidPattern.test(typed)) return null;
	return typed;
}
