/**
 * Right to Work check tool — originally Jeremy Ferendinos' standalone RTW
 * Portal, integrated into the site as a normal page (v1.2). The check wording,
 * the 1 Oct 2026 / 28-day follow-up date logic, the GOV.UK links and the
 * register row column order are Jeremy's and must not change without his
 * sign-off (see the handover note).
 *
 * Each company serves its own copy of this tool on its own site, so the
 * engaging company is fixed per deployment instead of selected.
 */
export const engagingCompany = 'JBB';

export const engagementTypes = [
	'Employee',
	'Sole-trader subcontractor',
	'Casual / temporary worker',
	'Platform engagement',
	'Ltd co subcontractor (no check - own staff)'
];

export const employeeEngagement = 'Employee';
export const limitedCompanyPrefix = 'Ltd co';
export const checksRequiredFrom = '2026-10-01';
export const passingOutcome = 'Pass';

export const CheckRoutes = { online: 'online', manual: 'manual' };
export const TimeLimitAnswers = { yes: 'yes', no: 'no' };
