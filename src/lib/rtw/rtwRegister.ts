import { ukDate } from './rtwDates';
import type { RtwRecord } from './rtwRecord';
import type { RtwState } from './rtwState';
import { engagingCompany } from './rtwTerms';

export function registerRow(state: RtwState, record: RtwRecord) {
	return [
		'',
		engagingCompany,
		record.name,
		record.trade,
		state.engType,
		ukDate(record.start),
		record.method,
		record.docSeen,
		ukDate(record.checkDate),
		record.checker,
		record.outcome,
		ukDate(record.expiry),
		ukDate(record.follow),
		record.evidence,
		record.notes.join('. ')
	].join('\t');
}

export function registerLogEntry(state: RtwState, record: RtwRecord) {
	return {
		entity: engagingCompany,
		full_name: record.name,
		trade: record.trade,
		engagement_type: state.engType,
		start_date: record.start,
		check_method: record.method,
		document_seen: record.docSeen,
		check_date: record.checkDate,
		checked_by: record.checker,
		outcome: record.outcome,
		permission_expiry: record.expiry,
		followup_due: record.follow,
		evidence_ref: record.evidence,
		notes: record.notes.join('. ')
	};
}
