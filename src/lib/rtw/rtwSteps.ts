import { elementById, inputById } from './rtwPage';
import { radio } from './rtwRadio';
import { followupDate, ukDate } from './rtwDates';
import type { RtwState } from './rtwState';
import { CheckRoutes, TimeLimitAnswers, checksRequiredFrom, employeeEngagement, engagementTypes, limitedCompanyPrefix, passingOutcome } from './rtwTerms';

function checkPreOct(state: RtwState) {
	const sd = inputById('startDate').value;
	const show =
		!!sd &&
		sd < checksRequiredFrom &&
		!!state.engType &&
		state.engType !== employeeEngagement &&
		state.engType.indexOf(limitedCompanyPrefix) !== 0;
	elementById('preOctBanner').classList.toggle('hidden', !show);
}

function followupNote(expiry: string) {
	const f = followupDate(expiry);
	return (
		'Follow-up check due by ' +
		ukDate(f) +
		' (four weeks before expiry). Diarise it now as well as recording it in the register. Work must not continue past ' +
		ukDate(expiry) +
		' without a new check.'
	);
}

function wireEngagementAndRoute(state: RtwState, refresh: () => void) {
	radio('engType', engagementTypes, 'data-val', (v) => {
		state.engType = v;
		elementById('ltdBanner').classList.toggle('hidden', v.indexOf(limitedCompanyPrefix) !== 0);
		checkPreOct(state);
	}, refresh);
	inputById('startDate').addEventListener('change', () => {
		checkPreOct(state);
		refresh();
	});
	radio('routeGroup', [], 'data-route', (v) => {
		state.route = v;
		elementById('onlineRoute').classList.toggle('hidden', v !== CheckRoutes.online);
		elementById('manualRoute').classList.toggle('hidden', v !== CheckRoutes.manual);
	}, refresh);
}

function wireExpiryAndOutcome(state: RtwState, refresh: () => void) {
	radio('limitedGroup', [], 'data-lim', (v) => {
		state.limited = v;
		elementById('expiryWrap').classList.toggle('hidden', v !== TimeLimitAnswers.yes);
	}, refresh);
	inputById('expiry').addEventListener('change', function () {
		const d = this.value;
		if (!d) return;
		elementById('followupNote').textContent = followupNote(d);
		refresh();
	});
	radio('outcomeGroup', [], 'data-out', (v) => {
		state.outcome = v;
		elementById('failBanner').classList.toggle('hidden', v === passingOutcome);
	}, refresh);
}

const typedFields = ['fullName', 'trade', 'checkedBy', 'shareCode', 'dob', 'docDetail', 'evidenceRef'];
const confirmations = ['c1', 'c2', 'c3'];

export function wireSteps(state: RtwState, refresh: () => void) {
	wireEngagementAndRoute(state, refresh);
	wireExpiryAndOutcome(state, refresh);
	typedFields.forEach((id) => inputById(id).addEventListener('input', refresh));
	confirmations.forEach((id) => inputById(id).addEventListener('change', refresh));
}
