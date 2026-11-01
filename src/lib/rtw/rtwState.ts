import { limitedCompanyPrefix } from './rtwTerms';

export type RtwState = {
	engType: string | null;
	route: string | null;
	limited: string | null;
	outcome: string | null;
};

export const newRtwState = (): RtwState => ({ engType: null, route: null, limited: null, outcome: null });

export const isLimitedCompany = (state: RtwState) => !!state.engType && state.engType.indexOf(limitedCompanyPrefix) === 0;
