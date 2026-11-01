import { hasValue, isChecked, elementById } from './rtwPage';
import { isLimitedCompany, type RtwState } from './rtwState';
import { CheckRoutes, TimeLimitAnswers } from './rtwTerms';

const stepCount = 6;

const sectionChecks: Record<number, (state: RtwState, isLtd: boolean) => boolean> = {
	1: () => hasValue('fullName') && hasValue('startDate') && hasValue('checkedBy'),
	2: (state) => !!state.engType,
	3: (state, isLtd) => {
		if (isLtd) return true;
		if (state.route === CheckRoutes.online) return hasValue('shareCode') && hasValue('dob');
		if (state.route === CheckRoutes.manual) return hasValue('docDetail');
		return false;
	},
	4: (_state, isLtd) => isLtd || (isChecked('c1') && isChecked('c2') && isChecked('c3')),
	5: (state, isLtd) => isLtd || state.limited === TimeLimitAnswers.no || (state.limited === TimeLimitAnswers.yes && hasValue('expiry')),
	6: (state, isLtd) => isLtd || !!state.outcome
};

export function sectionComplete(state: RtwState, n: number): boolean {
	const check = sectionChecks[n];
	if (!check) return false;
	return check(state, isLimitedCompany(state));
}

export function refreshProgress(state: RtwState) {
	for (let n = 1; n <= stepCount; n++) {
		const done = sectionComplete(state, n);
		elementById('step' + n).classList.toggle('complete', done);
		const rs = document.querySelector('.rail-step[data-for="step' + n + '"]') as HTMLElement;
		rs.classList.toggle('done', done);
		const dot = rs.querySelector('.dot') as HTMLElement;
		dot.innerHTML = done ? '&#10003;' : String(n);
	}
}
