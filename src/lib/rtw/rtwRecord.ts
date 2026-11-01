import { inputById, trimmedValue } from './rtwPage';
import { followupDate, todayISO, ukDate } from './rtwDates';
import { isLimitedCompany, type RtwState } from './rtwState';
import { CheckRoutes, TimeLimitAnswers, checksRequiredFrom, employeeEngagement } from './rtwTerms';

export type RtwRecord = ReturnType<typeof readRecord>;

function checkMethod(state: RtwState, isLtd: boolean) {
	if (isLtd) return 'Not required';
	return state.route === CheckRoutes.online ? 'Home Office online (share code)' : 'Manual document check';
}

function documentSeen(state: RtwState, isLtd: boolean) {
	if (isLtd) return 'n/a - checks own staff';
	if (state.route !== CheckRoutes.online) return trimmedValue('docDetail');
	const shareCode = trimmedValue('shareCode');
	const dateOfBirth = ukDate(inputById('dob').value);
	return 'Share code ' + shareCode + ', DOB ' + dateOfBirth;
}

function recordNotes(state: RtwState, start: string, isLtd: boolean) {
	const notes: string[] = [];
	if (isLtd) notes.push('Ltd co with own staff - confirm RTW warranty in subcontract');
	if (start < checksRequiredFrom && !isLtd && state.engType !== employeeEngagement)
		notes.push('Voluntary check - engagement pre-dates 1 Oct 2026');
	return notes;
}

export function readRecord(state: RtwState) {
	const isLtd = isLimitedCompany(state);
	const start = inputById('startDate').value;
	const expiry = state.limited === TimeLimitAnswers.yes ? inputById('expiry').value : '';
	return {
		isLtd,
		name: trimmedValue('fullName'),
		trade: trimmedValue('trade'),
		start,
		checker: trimmedValue('checkedBy'),
		method: checkMethod(state, isLtd),
		docSeen: documentSeen(state, isLtd),
		outcome: isLtd ? 'n/a' : (state.outcome ?? ''),
		expiry,
		follow: expiry ? followupDate(expiry) : '',
		evidence: trimmedValue('evidenceRef'),
		checkDate: isLtd ? '' : todayISO(),
		notes: recordNotes(state, start, isLtd)
	};
}
