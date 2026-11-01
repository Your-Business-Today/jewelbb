import { elementById } from './rtwPage';
import { ukDate } from './rtwDates';
import type { RtwRecord } from './rtwRecord';
import type { RtwState } from './rtwState';
import { engagingCompany, passingOutcome } from './rtwTerms';

export function showResultBanner({ isLtd, outcome, name }: RtwRecord) {
	const banner = elementById('resultBanner');
	if (isLtd) {
		banner.className = 'banner info';
		banner.innerHTML =
			'No check required by us. Confirm the RTW warranty is in the subcontract before they start.';
		return;
	}
	if (outcome === passingOutcome) {
		banner.className = 'banner ok';
		banner.innerHTML = '<span class="pill pass">PASS</span> &nbsp;' + name + ' is cleared to start.';
		return;
	}
	banner.className = 'banner stop';
	banner.innerHTML =
		'<span class="pill fail">FAIL</span> &nbsp;' + name + ' must not start. Refer to the procedure owner today.';
}

function summaryPairs(state: RtwState, record: RtwRecord): [string, string][] {
	const { name, trade, start, method, docSeen, checkDate, checker, outcome, expiry, follow, evidence } = record;
	return [
		['Individual', name + (trade ? ' (' + trade + ')' : '')],
		['Engaging company', engagingCompany],
		['Engagement type', state.engType ?? ''],
		['Start date', ukDate(start)],
		['Check method', method],
		['Document / code', docSeen],
		['Check date', checkDate ? ukDate(checkDate) : 'n/a'],
		['Checked by', checker],
		['Outcome', outcome],
		['Permission expiry', expiry ? ukDate(expiry) : 'None'],
		['Follow-up due', follow ? ukDate(follow) : 'None'],
		['Evidence ref', evidence || '[not entered]']
	];
}

export function showSummary(state: RtwState, record: RtwRecord) {
	const grid = elementById('summaryGrid');
	grid.innerHTML = '';
	summaryPairs(state, record).forEach(([term, description]) => {
		const dt = document.createElement('dt');
		dt.textContent = term;
		const dd = document.createElement('dd');
		dd.textContent = description;
		grid.appendChild(dt);
		grid.appendChild(dd);
	});
}
