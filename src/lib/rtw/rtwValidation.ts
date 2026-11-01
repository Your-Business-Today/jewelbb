import { inputById, isChecked, trimmedValue } from './rtwPage';
import { isLimitedCompany, type RtwState } from './rtwState';
import { TimeLimitAnswers } from './rtwTerms';

function checkStepsMissing(state: RtwState): string[] {
	const errs: string[] = [];
	const isConfirmed = isChecked('c1') && isChecked('c2') && isChecked('c3');
	const expiry = inputById('expiry').value;
	if (!state.route) errs.push('select the check route');
	if (!isConfirmed) errs.push('tick all three confirmations');
	if (!state.limited) errs.push('answer the time-limited question');
	if (state.limited === TimeLimitAnswers.yes && !expiry) errs.push('enter the expiry date');
	if (!state.outcome) errs.push('select the outcome');
	return errs;
}

export function missingAnswers(state: RtwState): string[] {
	const errs: string[] = [];
	const name = trimmedValue('fullName');
	const startDate = inputById('startDate').value;
	const checker = trimmedValue('checkedBy');
	if (!name) errs.push("enter the individual's full name");
	if (!startDate) errs.push('enter the start date');
	if (!checker) errs.push('enter your name as checker');
	if (!state.engType) errs.push('select the engagement type');
	if (isLimitedCompany(state)) return errs;
	return errs.concat(checkStepsMissing(state));
}
